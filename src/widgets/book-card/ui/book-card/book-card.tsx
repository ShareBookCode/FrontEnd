import styles from './book-card.module.scss'
import type { BookData } from '../../types/types'

import clsx from 'clsx'
import { BookGallery } from '../images-gallery/images-gallery'
import { BookInfo } from '../book-info/book-info'

import { onest } from '@shared/assets/fonts'

interface Props {
  book: BookData
}

export function BookCard({ book }: Props) {
  return (
    <div className={clsx(styles.wrapper, onest.className)}>
      <BookGallery images={book.images}></BookGallery>
      <BookInfo book={book} />
    </div>
  )
}
