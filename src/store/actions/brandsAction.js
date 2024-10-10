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

export const updateBrands = (brandId, optionId, selected) => {
  return {
    type: types.UPDATE_BRANDS,
    payload: { brandId, optionId, selected }
  }
}

export const selectBrands = (brandId) => {
  return {
    type: types.SELECT_BRANDS,
    payload: brandId
  }
}

export const deleteBrands = (brandId) => {
  return {
    type: types.DELETE_BRANDS,
    payload: brandId
  }
}