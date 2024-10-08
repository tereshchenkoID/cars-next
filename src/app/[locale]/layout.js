import { Poppins } from 'next/font/google'
import { getMessages } from 'next-intl/server'

import { NextIntlClientProvider } from 'next-intl'
import NextTopLoader from "nextjs-toploader"

import StoreProvider from '@/store/provider'
import AppProviders from '@/context/AppProviders'

import Header from '@/modules/Header'
import Footer from '@/modules/Footer'

import Fetch from './fetch'

import "./globals.scss"

const poppins = Poppins({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'Cars',
  description: 'Description',
  icons: {
    icon: '/images/favicon.ico',
  },
}

const API_BASE_URL = 'https://api.oddsbit.io/auto'

// export function generateSearchFromFilters(filters) {
//   const search = {}

//   for (const [key] of Object.entries(filters)) {
//     search[key] = {
//       value: ['0']
//     }
//   }

//   return search
// }

async function fetchData(endpoint) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include',
    })

    if (!res.ok) {
      throw new Error(`Failed to fetch data from ${endpoint}: ${res.statusText}`);
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

async function fetchInitialData() {
  try {
    const [settings, filters, brands ] = await Promise.all([
      fetchData('/settings/'),
      fetchData('/filters/'),
      fetchData('/filters/brands/')
      // fetchData('/filters/search/')
    ])

    // const search = generateSearchFromFilters(filters)

    return { settings, filters, brands }
  } catch (error) {
    console.error('Error fetching initial data:', error)
    return { settings: null, filters: null, brands: null }
    // return { settings: null,  filters: null, search: null }
  }
}

export default async function RootLayout({ children, params }) {
  const { locale } = params
  const messages = await getMessages(locale)
  const { settings, filters, brands } = await fetchInitialData()
  // const { settings, filters, search } = await fetchInitialData()

  return (
    <html lang={locale} className={poppins.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider preloadedState={{ settings, filters, brands }}>
            <AppProviders>
              <NextTopLoader
                color="#3e47dd"
                crawlSpeed={400}
                height={4}
                crawl={true}
                showSpinner={false}
                speed={400}
                shadow="none"
                zIndex={14}
              />
              <Fetch />
              <svg style={{display: 'none'}}>
                <use href="/images/icons.svg" />
              </svg>
              <Header />
              <main className="main">
                {children}
              </main>
              <Footer />
            </AppProviders>
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}