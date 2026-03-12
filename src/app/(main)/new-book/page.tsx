import { mockData } from '@/widgets/book-card/model'
import { BookCard } from '@/widgets/book-card'

export default function Page() {
  return (
    <div>
      <BookCard book={mockData} />
    </div>
  )
}
