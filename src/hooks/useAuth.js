'use client'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSession } from 'next-auth/react'

import { setAuth } from 'store/actions/authAction'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { data: session, status } = useSession()
  const auth = useSelector((state) => state.auth)
  const [isReady, setIsReady] = useState(false)
  const isAuth = Boolean(auth?.SID) && isReady

  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      setIsReady(true)

      if(session?.SID) {
        sessionStorage.setItem('token', session?.SID)
        dispatch(setAuth(session))
        setIsReady(true)
      }
    }
  }, [])

  const deleteAuth = () => {
    dispatch(setAuth(null))
  }

  const updateAuth = (data) => {
    dispatch(setAuth({ ...auth, ...data }))
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
