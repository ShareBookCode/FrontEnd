import './index.scss'
import ReduxProvider from './providers/redux-provider'
import { LayoutProps } from '@/src/shared/lib/types'

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
