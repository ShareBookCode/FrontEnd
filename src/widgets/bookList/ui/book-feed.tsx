'use client'

import { useEffect } from 'react'
import styles from './BooksFeed.module.scss'

import {
  fetchBooksCatalog,
  selectBookCatalogItems,
  selectBookCatalogIsLoading,
  selectBookCatalogError,
  BookPreviewCard,
} from '@/entities/book'

import { useAppDispatch, useAppSelector } from '@shared/hooks'

export function BooksFeed() {
  const dispatch = useAppDispatch()
  const books = useAppSelector(selectBookCatalogItems)
  const isLoading = useAppSelector(selectBookCatalogIsLoading)
  const error = useAppSelector(selectBookCatalogError)

  useEffect(() => {
    dispatch(fetchBooksCatalog())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {[...Array(15)].map((_, index) => (
          <div key={index} className={styles.cardSkeleton}>
            <div className={styles.imageSkeleton} />
            <div className={styles.skeletonLine} style={{ width: '80%' }} />
            <div className={styles.skeletonLine} style={{ width: '60%' }} />
            <div className={styles.skeletonLine} style={{ width: '40%' }} />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>😕 Что-то пошло не так</h2>
        <p className={styles.errorMessage}>
          Не удалось загрузить книги. Пожалуйста, попробуйте позже.
        </p>
        <button
          className={styles.retryButton}
          onClick={() => dispatch(fetchBooksCatalog())}
        >
          Попробовать снова
        </button>
      </div>
    )
  }

  if (!books.length) {
    return (
      <div className={styles.emptyContainer}>
        <h2 className={styles.emptyTitle}>📚 Книг пока нет</h2>
        <p className={styles.emptyMessage}>
          Здесь будут отображаться доступные книги.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {books.map(book => (
        <BookPreviewCard key={book.id} bookPreview={book} />
      ))}
    </div>
  )
}
