import { types } from 'store/actionTypes'

const initialState = {
  favorite: '0',
}

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FAVORITE:
      return state
    case types.SET_FAVORITE:
      return action.payload
    default:
      return state
  }
}

export default favoriteReducer
