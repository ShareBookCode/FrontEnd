export interface BookImages {
  src: string
  alt?: string
  liked: boolean
}

export interface BookData {
  id: string
  title: string
  author: string[] | string
  images: BookImages[]
  description: string
  publisher: string
  yearPublisher: string
  binding: string
  pages: string
  genre: string[] | string
  bookLanguage: string
  bookState: string
}
