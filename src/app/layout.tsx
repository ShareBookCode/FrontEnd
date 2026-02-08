import { NextIntlClientProvider } from 'next-intl'
import './index.scss'
import ReduxProvider from './providers/redux-provider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <NextIntlClientProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
