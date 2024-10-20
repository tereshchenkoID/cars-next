"use client"

import React from 'react'
import { AuthProvider } from './AuthContext'
import { ModalProvider } from './ModalContext'
// import { WindowWidthProvider } from './WindowWidthContext'

const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </AuthProvider>
  )
}

export default AppProviders