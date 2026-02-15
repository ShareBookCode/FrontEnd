import 'normalize.css/normalize.css'
import '@styles/global.scss'
import { onest } from '@shared/assets/fonts'
import ReduxProvider from '@providers/redux/redux.provider'
import { I18nProvider } from '@providers/i18n/i18n.provider'
import { MSWProvider } from './providers/msw/msw.provider'
import { LayoutProps } from '@shared/lib/types'

export default async function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html>
<<<<<<< HEAD
      <body className={onest.className}>
        <I18nProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </I18nProvider>
=======
      <body>
        <MSWProvider>
          <I18nProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </I18nProvider>
        </MSWProvider>
>>>>>>> origin/main
      </body>
    </html>
  )
}
