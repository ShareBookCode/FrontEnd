'use server'

import { cookies } from 'next/headers'
import { COOKIE_NAME, Locale } from '@shared/config'

export const changeLanguage = async (locale: Locale) => {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale)
}
