import 'normalize.css/normalize.css'
import '@styles/global.scss'
import ReduxProvider from '@providers/redux-provider'
import { LayoutProps } from '@shared/lib/types'

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html>
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
