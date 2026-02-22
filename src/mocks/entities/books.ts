import { http, HttpResponse, delay } from 'msw'
import type {
  Book,
  BookPreview,
  Category,
  BindingType,
  BookCondition,
} from '@/entities/book'

const categories: Category[] = [
  'Science',
  'Detectives',
  'Romance',
  'Art',
  'Textbooks',
]
const locations = [
  { city: 'Санкт-Петербург', district: 'Выборгский р-н' },
  { city: 'Москва', district: 'ЦАО' },
  { city: 'Санкт-Петербург', district: 'Приморский р-н' },
]

// Это способ создать валидный data URL для SVG, который будет работать c turbopack, при этом не ломая SVGR с импортами SVG как React-компонента. Для моков другие варианты избыточны
const getPlaceholderSvg = (color: string) => {
  const svg = `<svg width="400" height="600" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="600" fill="${color}"/><text x="50%" y="50%" text-anchor="middle" fill="#000000" font-family="Impact" font-size="32">Обложка книги</text></svg>`

  const encodedSvg = svg
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')

  return `data:image/svg+xml;utf8,${encodedSvg}`
}

const MOCK_COLORS = [
  '#FFD700', // Gold
  '#FF6B6B', // Red
  '#4ECDC4', // Teal
  '#45B7D1', // Blue
  '#96CEB4', // Green
  '#FFEEAD', // Cream
  '#D4A5A5', // Pink
  '#9B59B6', // Purple
]

const generateMockBooks = (count: number): Book[] => {
  return Array.from({ length: count }, (_, i) => {
    const bookId = i + 1

    const bookColors = MOCK_COLORS.map((_, idx) => {
      const colorIndex = (idx + bookId * 3) % MOCK_COLORS.length
      return MOCK_COLORS[colorIndex]
    })

    return {
      id: String(bookId),
      title:
        i % 5 === 0
          ? `Длинное название книги для теста верстки #${i + 1}`
          : `Книга #${i + 1}`,
      author: i % 2 === 0 ? 'Стивен Хокинг' : 'Марио Варгас Льоса',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.',
      thumbnails: bookColors.map(color => getPlaceholderSvg(color)),
      publisher: 'Издательство АСТ',
      year: 2022,
      binding: 'Hardcover' as BindingType,
      pages: 200 + i,
      genre: categories[i % categories.length],
      language: 'Русский',
      condition: 'Good' as BookCondition,
      isFavorite: Math.random() > 0.8,
      owner: {
        id: `user-${i}`,
        name: i % 2 === 0 ? 'Евгения' : 'Александр',
        avatar: `https://i.pravatar.cc/150?u=${i}`,
        stats: { given: 10, exchanged: 5 },
        location: locations[i % locations.length],
      },
      exchangeType: i % 2 === 0 ? 'free' : 'exchange',
      status: 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  })
}

const mockBooks = generateMockBooks(20)

export const bookHandlers = [
  http.get('/api/books/preview', async () => {
    await delay(800)

    const previews: BookPreview[] = mockBooks.map(book => ({
      id: book.id,
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnails[0],
      location: book.owner.location,
      isFavorite: book.isFavorite,
    }))

    return HttpResponse.json(previews)
  }),

  http.get('/api/books/:id', async ({ params }) => {
    await delay(500)
    const { id } = params

    console.log('MSW: Запрос книги с ID:', id)
    console.log(
      'MSW: Доступные ID в моках:',
      mockBooks.map(b => b.id),
    )
    const book = mockBooks.find(b => String(b.id) === String(id))

    if (!book) {
      console.error(`MSW: Книга с ID ${id} не найдена!`)
      return new HttpResponse(null, {
        status: 404,
        statusText: 'Book not found',
      })
    }

    return HttpResponse.json(book)
  }),
]
