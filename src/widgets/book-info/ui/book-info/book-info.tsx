import styles from './book-info.module.scss'

import clsx from 'clsx'

import { onest } from '@shared/assets/fonts'

interface BookImages {
  src: string
  alt?: string
  liked: boolean
}

interface BookData {
  id: string
  title: string
  author: string
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

interface Props {
  book: BookData
}

export const BookInfo = (book: Props) => {
  return (
    <div className={clsx(styles.wrapper, onest.className)}>
      <div className='images'></div>
      <div className='description'></div>
    </div>
  )
}
