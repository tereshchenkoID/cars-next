import { types } from '@/store/actionTypes'

const initialState = {
  search: null,
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SEARCH:
      return {
        ...state,
      }
    case types.SET_SEARCH:
      return action.payload
    default:
      return state
  }
}

export default searchReducer
