'use client'

import { useTranslations } from 'next-intl'

export default function Error() {
  const t = useTranslations('Profile')
  return <div>{t('loadError')}</div>
}
