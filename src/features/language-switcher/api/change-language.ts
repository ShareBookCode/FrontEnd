'use server'

import { cookies } from 'next/headers'
import { COOKIE_NAME, Locale } from '@shared/config'

export async function changeLanguageAction(locale: Locale) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 31536000,
    sameSite: 'lax',
  })
}
