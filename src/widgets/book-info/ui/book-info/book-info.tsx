import styles from './book-info.module.scss'
import { BookImages, BookData } from '../../types/types'

import clsx from 'clsx'

import { onest } from '@shared/assets/fonts'
import { BookGallery } from '../images-gallery/images-gallery'

interface Props {
  book: BookData
}

export const BookInfo = ({book}: Props) => {
  return (
    <div className={clsx(styles.wrapper, onest.className)}>
      <BookGallery images={book.images}></BookGallery>
      <div className='description'></div>
    </div>
  )
}
