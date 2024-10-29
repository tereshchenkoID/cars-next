'use client'

import { Provider } from 'react-redux'
import { useMemo } from 'react'
import { initializeStore } from './store'

const StoreProvider = ({ children, preloadedState }) => {
  const store = useMemo(() => initializeStore(preloadedState), [preloadedState])
  
  return <Provider store={store}>{children}</Provider>
}

export default StoreProvider
