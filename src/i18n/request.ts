import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  let locale = navigator.language.split('-')[0]

  if (locale != 'en' && locale != 'ru') {
    locale = 'en'
  }

  return {
    locale,
    messages: (await import(`../shared/lib/local/${locale}.json`)).default,
  }
})
