"use client"

import { AuthProvider } from './AuthContext'
import { ModalProvider } from './ModalContext'

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