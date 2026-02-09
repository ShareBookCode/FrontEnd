import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('HomePage')
  return <div>{t('title')}</div>
}
