import './globals.scss'

import React from 'react'
import { Poppins } from 'next/font/google'
import { getMessages } from 'next-intl/server'
import { getServerSession } from 'next-auth'
import { NextIntlClientProvider } from 'next-intl'
import NextTopLoader from 'nextjs-toploader'

import { authOptions } from 'app/api/auth/[...nextauth]/route'
import { apiRequest } from 'utils/apiRequest'
import StoreProvider from 'store/provider'
import AppProviders from 'context/AppProviders'

import '@fancyapps/ui/dist/fancybox/fancybox.css'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import Header from 'modules/Header'
import Footer from 'modules/Footer'

const poppins = Poppins({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

async function fetchInitialData() {
  try {
    const [settings, filters, brands] = await Promise.all([
      apiRequest('settings/'),
      apiRequest('filters/'),
      apiRequest('filters/brands/')
    ])

    return { settings, filters, brands }
  } catch (_) {
    return { settings: null, filters: null, brands: null }
  }
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params
  const [initialData, session, messages] = await Promise.all([
    fetchInitialData(),
    getServerSession(authOptions),
    getMessages(locale)
  ])

  return (
    <html lang={locale} className={poppins.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider preloadedState={{...initialData, auth: session}}>
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
