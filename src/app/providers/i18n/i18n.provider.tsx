import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import { ReactNode } from 'react'

export async function I18nProvider({ children }: { children: ReactNode }) {
  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
