import { types } from '@/store/actionTypes'

const initialState = {
  brands: {},
}

const brandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_BRANDS:
      return {
        ...state,
      }
    case types.SET_BRANDS:
      return {
        ...state,
        brands: action.payload,
      }
    default:
      return state
  }
}

export default brandsReducer
