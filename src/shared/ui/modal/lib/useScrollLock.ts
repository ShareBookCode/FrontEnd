import { useEffect } from 'react'

export const useScrollLock = (isLocked: boolean, unlockDelay: number = 0) => {
  useEffect(() => {
    if (!isLocked) return

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`

    return () => {
      setTimeout(() => {
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
      }, unlockDelay)
    }
  }, [isLocked, unlockDelay])
}
