import 'normalize.css/normalize.css'
import '@styles/global.scss'
import { onest } from '@shared/assets/fonts'
import ReduxProvider from '@providers/redux/redux.provider'
import { LayoutProps } from '@shared/lib/types'
import { I18nProvider } from '@providers/i18n/i18n.provider'

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html>
      <body className={onest.className}>
        <I18nProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
