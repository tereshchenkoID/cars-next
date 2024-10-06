"use client"

import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { setAuth } from '@/store/actions/authAction'

const Fetch = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(loading) {
      dispatch(setAuth()).then(() => {
        setLoading(false)
      })
    }
  }, [dispatch, loading])
}

export default Fetch