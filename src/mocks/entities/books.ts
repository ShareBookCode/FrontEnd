import { http, HttpResponse, delay } from 'msw'
import { BookPreview, ExchangeType } from '@entities/book/model'

const exchangeTypes: ExchangeType[] = ['free', 'temporary', 'exchange']
const locations = [
  'Москва, ЦАО',
  'Санкт-Петербург, Выборгский р-н',
  'Казань',
  'Новосибирск',
  'Екатеринбург',
]

// Функция-генератор для создания массива из 20 книг
const generateMockBooks = (count: number): BookPreview[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `book-id-${i + 1}`,
    title:
      i % 5 === 0
        ? `Очень длинное название книги для проверки переполнения текста номер ${i + 1}`
        : `Книга про разработку #${i + 1}`,
    author: i % 3 === 0 ? 'Роберт Мартин' : 'Линус Торвальдс',
    thumbnail:
      i % i === 0 ? null : `https://picsum.photos/seed/${i + 1}/200/300`,
    ownerId: `user-${i}`,
    location: locations[i % locations.length],
    exchangeType: exchangeTypes[i % exchangeTypes.length],
    status: i % 7 === 0 ? 'reserved' : 'available',
    createdAt: new Date().toISOString(),
  }))
}

const mockBooks = generateMockBooks(20)

export const bookHandlers = [
  http.get('/api/books/preview', async () => {
    await delay(1000)
    return HttpResponse.json(mockBooks)
  }),

  http.get('/api/books/:id', async ({ params }) => {
    const { id } = params
    const book = mockBooks.find(b => b.id === id)

    if (!book) {
      return new HttpResponse(null, { status: 404 })
    }

    return HttpResponse.json(book)
  }),
]
