'use server'

import { cookies } from 'next/headers'
import { COOKIE_NAME, Locale } from '@shared/config'

export async function changeLanguage(locale: Locale) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale)
}
