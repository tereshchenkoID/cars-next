"use client"

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toastify = () => {
  const toastify = useSelector(state => state.toastify)

  useEffect(() => {
    if (toastify?.toastify) {
      toast[toastify?.toastify.type](toastify?.toastify.text, {})
    }
  }, [toastify])

  return (
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
  )
}

export default Toastify
