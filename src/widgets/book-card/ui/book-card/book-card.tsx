import styles from './book-card.module.scss'
import { BookImages, BookData } from '../../types/types'

import clsx from 'clsx'

import { onest } from '@shared/assets/fonts'
import { BookGallery } from '../images-gallery/images-gallery'
import { BookInfo } from '../book-info/book-info'


interface Props {
  book: BookData
}

export const BookCard = ({ book }: Props) => {
  return (
    <div className={clsx(styles.wrapper, onest.className)}>
      <BookGallery images={book.images}></BookGallery>
      <BookInfo book={book} />
    </div>
  )
}
