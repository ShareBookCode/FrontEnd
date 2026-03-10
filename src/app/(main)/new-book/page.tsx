import { mockData } from '@/widgets/book-card/model'
import { BookCard } from '@/widgets/book-card'
import { BookInfo } from '@/widgets/book-info'

export default function Page() {
  return (
    <div>
      <BookInfo book={mockData} />
    </div>
  )
}
