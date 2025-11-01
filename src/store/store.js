import { configureStore } from '@reduxjs/toolkit'

import authReducer from 'store/reducers/authReducer'
import settingsReducer from 'store/reducers/settingsReducer'
import toastifyReducer from 'store/reducers/toastifyReducer'
import filtersReducer from 'store/reducers/filtersReducer'
import searchReducer from 'store/reducers/searchReducer'
import brandsReducer from 'store/reducers/brandsReducer'
import favoriteReducer from 'store/reducers/favoriteReducer'

export function initializeStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      auth: authReducer,
      settings: settingsReducer,
      toastify: toastifyReducer,
      filters: filtersReducer,
      search: searchReducer,
      brands: brandsReducer,
      favorite: favoriteReducer,
    },
    preloadedState,
  })
}
