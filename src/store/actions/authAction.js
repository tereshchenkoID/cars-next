import { types } from 'store/actionTypes'

export const setAuth = value => async dispatch => {
  dispatch({
    type: types.SET_AUTH,
    payload: value,
  })  
}
