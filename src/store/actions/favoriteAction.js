import { types } from 'store/actionTypes'
import { postData } from 'helpers/api'

export const setFavorite = (value, id) => async dispatch => {
  if(value) {
    dispatch({
      type: types.SET_FAVORITE,
      payload: value,
    })
  }
  else {
    const formData = new FormData()
    formData.append('userId', id)

    postData('user/favorites/counter/', formData).then(json => {
      if (json) {
        dispatch({
          type: types.SET_FAVORITE,
          payload: json,
        })
      }
    })
  }
}
