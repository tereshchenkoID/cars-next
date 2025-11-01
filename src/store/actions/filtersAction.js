import { useRequest } from 'hooks/useRequest'

import { types } from 'store/actionTypes'

export const setFilters = () => async dispatch => {
  const { get } = useRequest('filters/')

  try {
    const data = await get()

    dispatch({
      type: types.SET_FILTERS,
      payload: data,
    })

    return data
  } catch (e) {
    console.log(e)
  }
}
