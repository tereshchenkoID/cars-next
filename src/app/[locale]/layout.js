import "./globals.scss"

import React from "react"
import { Poppins } from 'next/font/google'
import { getMessages } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import { NextIntlClientProvider } from 'next-intl'
import NextTopLoader from "nextjs-toploader"

import StoreProvider from '@/store/provider'
import AppProviders from '@/context/AppProviders'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { fetchData } from "@/utils/fetchData"

import '@fancyapps/ui/dist/fancybox/fancybox.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Header from '@/modules/Header'
import Footer from '@/modules/Footer'

const poppins = Poppins({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

async function fetchInitialData() {
  try {
    const [settings, filters, brands] = await Promise.all([
      fetchData('settings/', { cache: 'no-cache' }),
      fetchData('filters/', { cache: 'no-cache' }),
      fetchData('filters/brands/', { cache: 'no-cache' })
      // fetchData('settings/', { cache: 'force-cache' }),
      // fetchData('filters/', { cache: 'force-cache' }),
      // fetchData('filters/brands/', { cache: 'force-cache' })
    ])

    return { settings, filters, brands }
  } catch (error) {
    console.error('Error fetching initial data:', error)
    return { settings: null, filters: null, brands: null }
  }
}

export default async function RootLayout({ children, params, session }) {
  const { locale } = await params
  const initialData = await fetchInitialData()
  const messages = await getMessages(locale)
  const cookies = await getServerSession(authOptions)

  return (
    <html lang={locale} className={poppins.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider preloadedState={{...initialData, auth: cookies || session}}>
            <AppProviders session={session}>
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
              <svg style={{ display: 'none' }}>
                <use href="/images/icons.svg" />
              </svg>
              <Header />
              <main>
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