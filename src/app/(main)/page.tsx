import { useTranslations } from 'next-intl'
import { BookPreview } from '@/entities/bookPreview'

const bookPreview = {
  id: '2',
  title: 'Старик и море, Зеленые холмы Африки',
  author: 'Эрнест Хэмингуэй',
  thumbnail: '/auntBook.png',
  location: {
    city: 'Санкт-Петербург',
    district: 'Московский район',
  },
  isFavorite: false,
}

export default function Page() {
  const t = useTranslations('HomePage')
  return (
    <div>
      {t('title')}
      <BookPreview bookPreview={bookPreview} />
    </div>
  )
}
