import { BookPreviewCard } from '@/entities/book'

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
  return (
    <div style={{ padding: '20px' }}>
      <BookPreviewCard bookPreview={bookPreview} />
    </div>
  )
}
