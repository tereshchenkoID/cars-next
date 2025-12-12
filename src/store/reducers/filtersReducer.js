import { types } from 'store/actionTypes'

const initialState = {
  filters: {}
}

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_FILTERS:
      return {
        ...state,
      }
    case types.SET_FILTERS:
      return action.payload
    default:
      return state
  }
}

export default settingsReducer
