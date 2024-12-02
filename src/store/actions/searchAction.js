import { types } from '@/store/actionTypes'

export const setSearch = value => async dispatch => {  
  dispatch({
    type: types.SET_SEARCH,
    payload: value,
  })

  return value
}
