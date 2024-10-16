"use client"

import { AuthProvider } from './AuthContext'
import { ModalProvider } from './ModalContext'
import { WindowWidthProvider } from './WindowWidthContext'

const AppProviders = ({ children }) => {
  return (
    <WindowWidthProvider>
      <AuthProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </AuthProvider>
    </WindowWidthProvider>

  )
}

export default AppProviders