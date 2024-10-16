import React, { createContext, useContext, useState, useEffect } from 'react'

const WindowWidthContext = createContext()

export const WindowWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width)
    }

    handleResize()

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  return (
    <WindowWidthContext.Provider value={{ windowWidth }}>
      {children}
    </WindowWidthContext.Provider>
  )
}

export const useWindowWidth = () => useContext(WindowWidthContext)