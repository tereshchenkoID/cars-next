import axios from 'axios'
import { API_BASE_URL } from 'constant/config'

import { signOut } from 'next-auth/react'

export const useRequest = (link = null, data = null, customHeaders = {}) => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('token') : null

  const server = axios.create({
    baseURL: `${API_BASE_URL}/${link}`,
    withCredentials: true,
    headers: {
      ...customHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  const handleLogout = async () => {
    post(`${API_BASE_URL}/logout/`, null).then(async json => {
      if (json) {
        await signOut({redirect: false})
        sessionStorage.clear()
        window.location.href = '/'
        // window.location.reload()
      }
    })
  }

  const get = async (url) => {
    try {
      const res = await server.get(url)

      if (res?.data?.code === '2') {
        await handleLogout()
        return false
      }

      return res.data
    } catch (e) {
      return e.response || { error: e.message }
    }
  }

  const post = async (url) => {
    try {
      const res = await server.post(url, data)

      if (res?.data?.code === '2') {
        await handleLogout()
        return false
      }

      return res.data
    } catch (e) {
      return e.response || { error: e.message }
    }
  }

  return { get, post, handleLogout }
}
