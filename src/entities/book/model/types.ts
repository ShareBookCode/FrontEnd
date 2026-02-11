export type ExchangeType = 'free' | 'temporary' | 'exchange'

export interface BookPreview {
  id: string
  title: string
  author: string
  thumbnail: string | null
  ownerId: string
  location: string
  exchangeType: ExchangeType
  status: 'available' | 'reserved'
  createdAt: string
}

export interface BookSchema {
  data: BookPreview[]
  isLoading: boolean
  error: string | null
}
