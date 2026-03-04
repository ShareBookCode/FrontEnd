export type ExchangeType = 'free' | 'exchange'
export type BookCondition = 'New' | 'Good' | 'Fair' | 'Poor'
export type BindingType = 'Hardcover' | 'Softcover'
export type Category =
  | 'All'
  | 'ShareBook'
  | 'Detectives'
  | 'Romance'
  | 'Science'
  | 'Art'
  | 'Textbooks'
export type FilterType = ExchangeType | 'all'

// Пока не используется, думаю он уйдет в сущность пользователя, но так как пользователя еще не существует, останется тут
export interface User {
  id: string
  name: string
  avatar: string | null
  stats: {
    given: number
    exchanged: number
  }
  location: {
    city: string
    district: string
  }
}

// Сделал ограниченную сортировку, потому она в будущем будет проходить через БД, а не на клиенте
export interface CatalogFilters {
  category: Category
  filterType: FilterType
}

export interface BookPreview {
  id: string
  title: string
  author: string
  thumbnail: string
  location: {
    city: string
    district: string
  }
  isFavorite?: boolean
}

export interface Book {
  id: string
  title: string
  author: string
  description: string
  thumbnails: string[]
  isFavorite?: boolean

  publisher: string
  year: number
  binding: BindingType
  pages: number
  genre: Category
  language: string
  condition: BookCondition

  owner: User
  exchangeType: ExchangeType
  status: 'available' | 'reserved' | 'closed'

  createdAt: string
  updatedAt: string
}

export interface BookSchema {
  // Ветка для превью книг в каталоге
  catalog: {
    entities: BookPreview[]
    isLoading: boolean
    error: string | null
    filters: CatalogFilters
  }
  // Ветка детальной информации о конкретной книге
  details: {
    data: Book | null
    isLoading: boolean
    error: string | null
  }
}
