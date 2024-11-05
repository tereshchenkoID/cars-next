// import { useRequest } from '@/hooks/useRequest'

import { types } from '@/store/actionTypes'

export const setSearch = value => async dispatch => {  
  dispatch({
    type: types.SET_SEARCH,
    payload: value,
  })

  return value
  
  // if (value) {
  //   dispatch({
  //     type: types.SET_SEARCH,
  //     payload: value,
  //   })

  //   return value
  // } else {
  //   const { get } = useRequest('filters/search/')

  //   try {
  //     const data = await get()

  //     dispatch({
  //       type: types.SET_SEARCH,
  //       payload: data,
  //     })

  //     return data
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }
}
