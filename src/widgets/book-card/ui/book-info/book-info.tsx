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

  const descriptionText = isDescriptionExpanded
    ? book.description
    : book.description.length > 220
      ? `${book.description.slice(0, 220)}...`
      : book.description

  const shouldShowButton = book.description.length > 220

  const infoItems = [
    { label: 'Автор', value: book.author },
    { label: 'Издательство', value: book.publisher },
    { label: 'Год издания', value: book.yearPublisher },
    { label: 'Переплет', value: book.binding },
    { label: 'Страниц', value: book.pages },
    { label: 'Жанр', value: book.genre },
    { label: 'Язык', value: book.bookLanguage },
    { label: 'Состояние', value: book.bookState },
  ]

  return (
    <div className={styles.wrapper}>
      <div className={styles.description}>
        <h2 className={styles.descriptionTitle}>Описание</h2>
        <p className={clsx(styles.descriptionText, literata.className)}>
          {descriptionText}

          {shouldShowButton && (
            <button
              className={styles.descriptionButton}
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
            >
              {isDescriptionExpanded ? 'Свернуть' : 'Читать полностью'}
            </button>
          )}
        </p>
      </div>

      <div className={styles.info}>
        {infoItems.map((item, index) => (
          <div key={index} className={styles.infoItem}>
            <span className={styles.infoItemLabel}>{item.label}</span>
            <span className={styles.infoItemValue}>
              {Array.isArray(item.value) ? item.value.join(', ') : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
