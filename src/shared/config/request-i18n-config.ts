import { getRequestConfig } from 'next-intl/server'
import { headers } from 'next/headers'
import { getLocaleFromAcceptLanguage } from '../lib/i18n/locale'

export default getRequestConfig(async () => {
  const headersList = await headers()
  const acceptLanguage = headersList.get('accept-language')
  const locale = getLocaleFromAcceptLanguage(acceptLanguage)

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  }
})
