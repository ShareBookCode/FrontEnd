import { useTranslations } from 'next-intl'
import { BooksFeed } from '@/widgets/bookList'

export default function Page() {
  const t = useTranslations('HomePage')
  return (
    <>
      <div>{t('title')}</div>
      <BooksFeed />
    </>
  )
}
