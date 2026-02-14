'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { changeLanguageAction } from '../api/change-language'
import { Locale, locales } from '@shared/config'

export const LangSwitcher = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const currentLocale = useLocale()

  const onSelectChange = (nextLocale: Locale) => {
    startTransition(async () => {
      await changeLanguageAction(nextLocale)
      router.refresh()
    })
  }

  return (
    <select
      defaultValue={currentLocale}
      disabled={isPending}
      onChange={e => onSelectChange(e.target.value as Locale)}
    >
      {locales.map(loc => (
        <option key={loc} value={loc}>
          {loc.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
