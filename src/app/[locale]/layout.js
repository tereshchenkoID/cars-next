import "./globals.scss"

import React from "react"
import { Poppins } from 'next/font/google'
import { getMessages } from 'next-intl/server'
import { NextIntlClientProvider } from 'next-intl'
import NextTopLoader from "nextjs-toploader"

import StoreProvider from '@/store/provider'
import AppProviders from '@/context/AppProviders'
import { fetchData } from "@/utils/fetchData"

import Header from '@/modules/Header'
import Footer from '@/modules/Footer'
import Fetch from './fetch'

const poppins = Poppins({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

async function fetchInitialData() {
  try {
    const [settings, filters, brands] = await Promise.all([
      fetchData('settings/'),
      fetchData('filters/'),
      fetchData('filters/brands/')
    ])

    return { settings, filters, brands }
  } catch (error) {
    console.error('Error fetching initial data:', error)
    return { settings: null, filters: null, brands: null }
  }
}

export default async function RootLayout({ children, params }) {
  const { locale } = params
  const initialData = await fetchInitialData()
  const messages = await getMessages(locale)

  return (
    <html lang={locale} className={poppins.className}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider preloadedState={initialData}>
            <AppProviders preloadedState={initialData}>
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
              <svg style={{ display: 'none' }}>
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