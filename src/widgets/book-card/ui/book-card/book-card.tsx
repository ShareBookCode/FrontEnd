import styles from './book-card.module.scss'

import clsx from 'clsx'
import { BookGallery } from '../images-gallery/images-gallery'
import { BookInfo } from '../book-info/book-info'
import type { BookData } from '@shared/lib/types'

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
