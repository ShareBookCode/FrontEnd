export interface BookImage {
  src: string
  alt?: string
}

export interface BookData {
  id: string
  title: string
  author: string[] | string
  images: BookImage[]
  description: string
  publisher: string
  yearPublisher: string
  binding: string
  pages: string
  genre: string[] | string
  bookLanguage: string
  bookState: string
  liked: boolean
}
