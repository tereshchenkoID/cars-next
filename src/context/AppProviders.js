"use client"

import React from 'react'

import { SessionProvider } from 'next-auth/react'
import { ModalProvider } from './ModalContext'

const AppProviders = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ModalProvider>
        {children}
      </ModalProvider>
    </SessionProvider>
  )
}

export default AppProviders
