export const SUPPORTED_LOCALES = ['ru', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

export function getLocaleFromAcceptLanguage(
  acceptLanguage: string | null,
): Locale {
  if (!acceptLanguage) return 'en'

  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase())
  console.log(languages)

  for (const lang of languages) {
    const baseLang = lang.split('-')[0]
    if (SUPPORTED_LOCALES.includes(baseLang as Locale)) {
      return baseLang as Locale
    }
  }

  return 'en'
}
