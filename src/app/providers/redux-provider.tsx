'use client'
import { store } from '@/src/shared/lib/store'
import { Provider } from 'react-redux'
import { LayoutProps } from '@/src/shared/lib/types'

export default function ReduxProvider({ children }: LayoutProps) {
  return <Provider store={store}>{children}</Provider>
}
