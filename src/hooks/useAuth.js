'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

import { useAuthStore } from 'stores/authStore'

export const useAuth = () => {
  const { data: session, status } = useSession()
  const { auth, setAuth } = useAuthStore()

  const [isReady, setIsReady] = useState(false)
  const isAuth = Boolean(auth?.SID) && isReady

  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      setIsReady(true)

      if(session?.SID) {
        sessionStorage.setItem('token', session?.SID)
        setAuth(session)
        setIsReady(true)
      }
    }
  }, [])

  const deleteAuth = () => {
    setAuth(null)
  }

  const updateAuth = (data) => {
    setAuth({ ...auth, ...data })
  }

  return {
    isAuth,
    auth,
    status,
    isReady,
    updateAuth,
    deleteAuth,
  }
}
