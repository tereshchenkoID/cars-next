import { useRequest } from '@/hooks/useRequest'

import { types } from '@/store/actionTypes'

export const setBrands = () => async dispatch => {
  const { get } = useRequest('filters/brands/')

  try {
    const data = await get()

    dispatch({
      type: types.SET_BRANDS,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
  }
}
