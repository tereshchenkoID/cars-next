// 'use client'

// import { Provider } from 'react-redux'
// import { useMemo } from 'react'
// import { configureStore } from '@reduxjs/toolkit'

// import authReducer from './reducers/authReducer'
// import settingsReducer from './reducers/settingsReducer'
// import toastifyReducer from './reducers/toastifyReducer'
// import filtersReducer from './reducers/filtersReducer'
// import searchReducer from './reducers/searchReducer'
// import brandsReducer from './reducers/brandsReducer'

// const StoreProvider = ({ children, preloadedState = {} }) => {
//   const store = useMemo(() => configureStore({
//     reducer: {
//       settings: settingsReducer,
//       auth: authReducer,
//       toastify: toastifyReducer,
//       filters: filtersReducer,
//       search: searchReducer,
//       brands: brandsReducer,
//     },
//     preloadedState,
//   }), [preloadedState])

//   return <Provider store={store}>{children}</Provider>
// }

// export default StoreProvider


// store/StoreProvider.js

'use client'

import { Provider } from 'react-redux'
import { useMemo } from 'react'
import { initializeStore } from './store'

const StoreProvider = ({ children, preloadedState }) => {
  const store = useMemo(() => initializeStore(preloadedState), [preloadedState])

  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
