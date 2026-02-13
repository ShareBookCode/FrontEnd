'use client'

import { useEffect, useState } from 'react'
import { enableMocking } from '@mocks/enableMocking'

export const MSWProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    enableMocking().then(() => setIsReady(true))
  }, [])

  if (!isReady) return null

  return <>{children}</>
}
