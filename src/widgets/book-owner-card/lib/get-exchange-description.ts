import type { ExchangeType } from '@/entities/book'
import type { Book } from '@/entities/book'

type BookStatus = Book['status']

export const getExchangeDescription = (
  name: string,
  exchangeType: ExchangeType,
  status: BookStatus,
) => {
  if (status === 'closed') {
    return `${name} уже закрыл(а) это объявление`
  }
  if (status === 'reserved') {
    return `${name} временно зарезервировал(а) эту книгу`
  }
  if (exchangeType === 'free') {
    return `${name} готов(а) отдать книгу бесплатно`
  }
  return `${name} готов(а) обменять книгу на любую интересную`
}
