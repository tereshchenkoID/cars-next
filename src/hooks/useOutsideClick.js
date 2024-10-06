import { useEffect } from 'react'

export const useOutsideClick = (elementRef, handler, attached = true) => {
  useEffect(() => {
    if (!attached) return

    const handleClick = e => {
      if (!elementRef.current) return
      
      if (attached.buttonRef && attached.buttonRef.current && attached.buttonRef.current.contains(e.target)) {
        return
      }

      if (!elementRef.current.contains(e.target)) {
        handler()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [elementRef, handler, attached])
}
