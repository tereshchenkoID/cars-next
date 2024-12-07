import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'

import { postData } from '@/helpers/api'

const useFavorite = (initialData) => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const auth = useSelector((state) => state.auth)
  const [data, setData] = useState(initialData || [])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: initialData?.page,
    pages: initialData?.pages,
    quantity: initialData?.quantity,
    results: initialData?.results,
  })
  const [search, setSearch] = useState({
    page: 0,
    sort: 0
  })

  const handleLoad = (page, sort) => {
    setLoading(true)
    const formData = new FormData()
    formData.append('userId', auth?.id)
    formData.append('sort', sort)
    formData.append('page', page)

    postData('user/favorites/', formData).then(json => {
      if (json) {
        setData(json)
        setPagination({
          page: json.page,
          pages: json.pages,
          quantity: json.quantity,
          results: json.results,
        })

        setTimeout(() => {
          setLoading(false)
        }, [1000])
      } else {
        dispatch(
          setToastify({
            type: 'error',
            text: json.error_message,
          })
        )
      }
    })
  }

  const generateParams = () => {
    const params = new URLSearchParams(
      Object.entries(search)
        .filter(([_, value]) => value !== 0)
        .map(([key, value]) => [key, value])
    )
  
    return params.toString()
  }

  const generateSearchFromFilters = (query) => {
    if(query.size > 0) {
      const paramsObject = Object.fromEntries(query.entries())
      const updatedSearch = Object.keys(paramsObject).reduce((acc, key) => {
        acc[key] = { value: paramsObject[key].split(',') }
        return acc
      }, {})
    
      setSearch(updatedSearch)
    }
  }

  const handleChange = (key, value) => {
    let a = {}

    if (key === 'page') {
      a = {
        ...search,
        page: value
      }
    }
    else {
      a = {
        sort: value,
        page: 0
      }
    }

    setSearch(a)
    handleLoad(a.page, a.sort)
  }

  const handlePrev = () => {
    const prev = pagination.page > 0 ? pagination.page - 1 : 0
    handleChange('page', prev)
  }

  const handleNext = () => {
    const next = pagination.page < pagination.pages ? pagination.page + 1 : pagination.pages
    handleChange('page', next)
  }

  const handleReset = () => {
    setSearch({
      page: 0,
      sort: 0
    })

    handleLoad(0, 0)
  }

  useEffect(() => {
    generateSearchFromFilters(searchParams)
  }, [])

  useEffect(() => {
    window.history.pushState(null, '', `?${generateParams()}`)
  }, [search])

  return {
    handleChange,
    handleReset,
    handlePrev,
    handleNext,
    data,
    pagination,
    loading,
    search
  }
}

export default useFavorite
