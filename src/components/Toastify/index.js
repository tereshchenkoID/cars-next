import { useEffect } from 'react'

import { useToastifyStore } from 'stores/toastifyStore'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Toastify = () => {
  const { toastData, clearToast } = useToastifyStore()

  useEffect(() => {
    if (toastData) {
      toast[toastData?.type](toastData.text, {})
      clearToast()
    }
  }, [toastData])

  return (
    <ToastContainer position="top-right" autoClose={3000} theme="colored" />
  )
}

export default Toastify
