import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'
import { defaultLocale, COOKIE_NAME } from '@shared/config/i18n/i18n'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = cookieStore.get(COOKIE_NAME)?.value || defaultLocale

  return {
    locale,
    messages: (await import(`@providers/i18n/locales/${locale}.json`)).default,
  }
})
