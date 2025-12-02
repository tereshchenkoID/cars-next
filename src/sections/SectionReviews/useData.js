import { useState } from 'react'

import { useToastifyStore } from 'stores/toastifyStore'
import { postData } from 'helpers/api'

const useReviews = (initialData) => {
  const showToast = useToastifyStore(state => state.showToast)
  const [data, setData] = useState(initialData?.data || [])
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: initialData?.page,
    pages: initialData?.pages,
    quantity: initialData?.quantity,
    results: initialData?.results,
  })

  const handleLoad = (page) => {
    setLoading(true)

    const formData = new FormData()
    formData.append('page', page)

    postData('reviews/', formData).then(json => {
      if (json) {
        setTimeout(() => {
          setData(prev =>
            [...prev, ...json.data]
          )

          setPagination({
            page: json.page,
            pages: json.pages,
            quantity: json.quantity,
            results: json.results,
          })

          setLoading(false)
        }, 500)
      }
      else {
        showToast(
          'error',
          json.error_message
        )
      }
    })
  }

  const handleMore = () => {
    handleLoad(pagination.page + 1)
  }

  return {
    data,
    loading,
    pagination,
    handleMore
  }
}

export default useReviews
