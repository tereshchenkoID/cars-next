import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'next/navigation'

import { postData } from 'helpers/api'
import { setToastify } from 'store/actions/toastifyAction'

const useFavorite = (initialData) => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const [data, setData] = useState(initialData?.data || [])
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
    formData.append('sort', sort)
    formData.append('page', page)

    postData('user/favorites/', formData).then(json => {
      if (json) {
        setData(json.data)
        setPagination({
          page: json.page,
          pages: json.pages,
          quantity: json.quantity,
          results: json.results,
        })

        setTimeout(() => setLoading(false), 500)
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
    if (query.size > 0) {
      const paramsObject = Object.fromEntries(query.entries());
      const updatedSearch = Object.keys(search).reduce((acc, key) => {
        acc[key] = paramsObject[key] ? Number(paramsObject[key]) : search[key]
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
        page: value === 1 ? 0 : value
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
    handleChange('page', pagination.page > 0 ? pagination.page - 1 : 0)
  }

  const handleNext = () => {
    handleChange('page', pagination.page < pagination.pages ? pagination.page + 1 : pagination.pages)
  }

  useEffect(() => {
    generateSearchFromFilters(searchParams)
    // handleLoad(search.page, search.sort)
  }, [])

  useEffect(() => {
    window.history.pushState(null, '', `?${generateParams()}`)
  }, [search])

  return {
    handleLoad,
    handleChange,
    handlePrev,
    handleNext,
    data,
    pagination,
    loading,
    search,
  }
}

export default useFavorite
