import type { BookCondition, Category, ExchangeType } from '@entities/book'

export type CreateBookFormValues = {
  title: string
  author: string
  genre: Category | ''
  language: string
  publisher: string
  year: string
  exchangeType: ExchangeType
  condition: BookCondition
}

export const GENRE_OPTIONS: { value: Category; label: string }[] = [
  { value: 'Detectives', label: 'Детективы' },
  { value: 'Romance', label: 'Романы' },
  { value: 'Science', label: 'Наука' },
  { value: 'Art', label: 'Искусство' },
  { value: 'Textbooks', label: 'Учебники' },
  { value: 'ShareBook', label: 'ShareBook' },
]

export const EXCHANGE_TYPE_OPTIONS: { value: ExchangeType; label: string }[] = [
  { value: 'free', label: 'Отдаю' },
  { value: 'exchange', label: 'Обмениваю' },
]

export const CONDITION_OPTIONS: { value: BookCondition; label: string }[] = [
  { value: 'Good', label: 'Хорошее' },
  { value: 'Fair', label: 'Нормальное' },
  { value: 'Poor', label: 'Плохое' },
]
