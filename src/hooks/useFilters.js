import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'

import { getSearch } from '@/helpers/getSearch'
import { postData } from '@/helpers/api'
import { setBrands } from '@/store/actions/brandsAction'
import { setSearch } from '@/store/actions/searchAction'  

import { ACTIVE, DEFAULT } from '@/constant/config'

const useFilters = (initialData) => {
  const dispatch = useDispatch()
  const searchParams = useSearchParams()
  const auth = useSelector((state) => state.auth)
  const filters = useSelector((state) => state.filters)
  const brands = useSelector((state) => state.brands)
  const search = useSelector((state) => state.search)
  const [data, setData] = useState(initialData || [])
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [pagination, setPagination] = useState({
    page: initialData?.page,
    pages: initialData?.pages,
    quantity: initialData?.quantity,
    results: initialData?.results,
  })

  const saveHistory = (results) => {
    const params = Object.fromEntries(searchParams.entries())
    const name = Date.now()
    const entry = { params, name, results }

    let updatedHistory = [entry, ...history]

    if (updatedHistory.length > 10) {
      updatedHistory.pop()
    }

    localStorage.setItem('historySearch', JSON.stringify(updatedHistory))
    setHistory(updatedHistory)
  }

  const getSearchParams = () => {
    return Object.fromEntries(searchParams.entries())
  }

  const handleLoad = (page, data) => {
    setLoading(true)

    const formData = new FormData()
    formData.append('userId', auth?.id)
    formData.append('data', JSON.stringify(data || search))
    formData.append('page', page)

    postData('filters/search/', formData).then(json => {
      if (json) {
        setData(json)
        setPagination({
          page: json.page,
          pages: json.pages,
          quantity: json.quantity,
          results: json.results,
        })

        saveHistory(json.results)

        setTimeout(() => {
          setLoading(false)
        }, 1000)
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
    const params = new URLSearchParams()

    brands.forEach((brand) => {
      let selectedOptions = brand.options
        .filter(option => option.selected === ACTIVE)
        .map(option => option.id)

      if (selectedOptions.includes(DEFAULT)) {
        selectedOptions = [DEFAULT]
      }

      if (selectedOptions.length > 0) {
        params.append(`make_${brand.id}`, selectedOptions)
      }
    })

    Object.keys(search).forEach((key) => {
      if (key.indexOf("make") === -1) {
        const filterValue = search[key]?.value
        if (filterValue && filterValue.length > 0 && filterValue[0] !== DEFAULT) {
          params.append(key, filterValue.join(';'))
        }
      }
    })

    return params.toString()
  }

  const generateSearchFromFilters = (filters, query) => {
    const date = {}
    const paramsObject = query ? Object.fromEntries(query.entries()) : {}
    const makes = JSON.parse(JSON.stringify(brands))

    if (query) {
      for (const [key, value] of Object.entries(paramsObject)) {
        if (key.indexOf("make") !== -1) {
          const brandId = key.replace('make_', '')

          date[key] = {
            value: value.split(',')
          }

          makes.forEach((brand) => {
            if (brand.id === brandId) {
              brand.options.forEach((option) => {
                option.selected = value.split(',').includes(option.id) ? ACTIVE : DEFAULT
              })
            }
          })
        }
      }
    } else {
      makes.forEach((brand) => {
        brand.options.forEach((option) => {
          option.selected = DEFAULT
        })
      })
    }

    for (const [key, _] of Object.entries(filters)) {
      const queryValue = paramsObject[key] || DEFAULT
      const queryArray = queryValue?.split(';')

      date[key] = {
        value: queryArray
      }
    }

    return { date, makes }
  }

  const handleChange = (type, key, value, update) => {    
    const s = JSON.parse(JSON.stringify(search))
    let a = {}

    if (key === 'page') {
      a = {
        ...s,
        page: {
          value: [
            value === 1 ? DEFAULT : value.toString()
          ]
        }
      }
    }
    else {
      a = {
        ...getSearch(s, type, key, value || DEFAULT),
        page: {
          value: [
            DEFAULT
          ]
        }
      }
    }

    dispatch(setSearch(a))

    if (update) (
      handleLoad(a.page.value[0], a)
    )
  }

  const handlePrev = () => {
    const prev = pagination.page > 0 ? pagination.page - 1 : 0
    handleChange('string', 'page', prev, true)
  }

  const handleNext = () => {
    const next = pagination.page < pagination.pages ? pagination.page + 1 : pagination.pages
    handleChange('string', 'page', next, true)
  }

  const handleReset = () => {
    const { date, makes } = generateSearchFromFilters(filters, null)
    dispatch(setBrands(makes))
    dispatch(setSearch(date))
    handleLoad(0, date)
  }

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem('historySearch')) || [])
    const { date, makes } = generateSearchFromFilters(filters, searchParams)
    dispatch(setBrands(makes))
    dispatch(setSearch(date))
  }, [])

  useEffect(() => {
    window.history.pushState(null, '', `?${generateParams()}`)
  }, [search])

  return {
    getSearchParams,
    saveHistory,
    handleChange,
    handleReset,
    handleLoad,
    handlePrev,
    handleNext,
    generateParams,
    generateSearchFromFilters,
    filters,
    brands,
    search,
    data,
    history,
    pagination,
    loading,
    searchParams,
  }
}

export default useFilters
