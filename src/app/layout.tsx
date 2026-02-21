import '@styles/global.scss'
import 'normalize.css/normalize.css'
import ReduxProvider from '@providers/redux/redux.provider'
import { I18nProvider } from '@providers/i18n/i18n.provider'
import { MSWProvider } from './providers/msw/msw.provider'
import { onest } from '@shared/assets/fonts'
import { LayoutProps } from '@shared/lib/types'

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html>
      <body className={onest.className}>
        <MSWProvider>
          <I18nProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </I18nProvider>
        </MSWProvider>
      </body>
    </html>
  )
}
