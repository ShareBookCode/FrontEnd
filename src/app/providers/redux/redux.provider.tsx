'use client'
import { store } from './store'
import { Provider } from 'react-redux'
import { LayoutProps } from '@shared/lib/types'

export default function ReduxProvider({ children }: LayoutProps) {
  return <Provider store={store}>{children}</Provider>
}
