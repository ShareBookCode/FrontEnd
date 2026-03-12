'use client'
import styles from './book-info.module.scss'

import { BookData } from '../../types/types'
import { literata } from '@shared/assets/fonts'
import clsx from 'clsx'
import { useState } from 'react'

interface Props {
  book: BookData
}

export const BookInfo = ({ book }: Props) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles['description-wrapper']}>
        <h2 className={styles['description-title']}>Описание</h2>
        <p className={clsx(styles['description-text'], literata.className)}>
          {isDescriptionExpanded
            ? book.description
            : book.description.length > 220
              ? `${book.description.slice(0, 220)}...`
              : book.description}
          {book.description.length > 220 && (
            <button
              className={styles['description-button']}
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? 'Свернуть' : 'Читать полностью'}
            </button>
          )}
        </p>
      </div>

      <div className={styles['info']}>
        <div className={styles['info__item']}>
          <span className={styles['info__item-label']}>Автор</span>
          <span className={styles['info__item-value']}>
            {Array.isArray(book.author)
              ? book.author.map((author: string) => author).join(', ')
              : book.author}
          </span>
        </div>
        <div className={styles['info__item']}>
          <span className={styles['info__item-label']}>Издательство</span>
          <span className={styles['info__item-value']}>{book.publisher}</span>
        </div>
        <div className={styles['info__item']}>
          <span className={styles['info__item-label']}>Год издания</span>
          <span className={styles['info__item-value']}>
            {book.yearPublisher}
          </span>
        </div>
        <div className={styles['info__item']}>
          <span className={styles['info__item-label']}>Переплет</span>
          <span className={styles['info__item-value']}>{book.binding}</span>
        </div>
        <div className={styles['info__item']}>
          <span className={styles['info__item-label']}>Страниц</span>
          <span className={styles['info__item-value']}>{book.pages}</span>
        </div>
        <div className={styles['info__item']}>
          <span className={styles['info__item-label']}>Жанр</span>
          <span className={styles['info__item-value']}>
            {Array.isArray(book.genre)
              ? book.genre.map((genre: string) => genre).join(', ')
              : book.genre}
          </span>
        </div>
        <div className={styles['info__item']}>
          <span className={styles['info__item-label']}>Язык</span>
          <span className={styles['info__item-value']}>
            {book.bookLanguage}
          </span>
        </div>
        <div className={styles['info__item']}>
          <span className={styles['info__item-label']}>Состояние</span>
          <span className={styles['info__item-value']}>{book.bookState}</span>
        </div>
      </div>
    </div>
  )
}
