"use client"

import { useEffect } from 'react'
import { useRequest } from 'hooks/useRequest'

const Logout = () => {
  const { handleLogout } = useRequest()
  useEffect(() => {
    handleLogout()
  }, [])
}

export default Logout
