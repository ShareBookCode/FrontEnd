import 'normalize.css/normalize.css'
import '@styles/global.scss'
import ReduxProvider from '@providers/redux/redux.provider'
import { I18nProvider } from '@providers/i18n/i18n.provider'
import { LayoutProps } from '@shared/lib/types'

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html>
      <body>
        <I18nProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
