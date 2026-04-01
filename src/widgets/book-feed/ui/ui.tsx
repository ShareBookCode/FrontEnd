'use client'

import { useEffect } from 'react'
import styles from './ui.module.scss'
import {
  fetchBooksCatalog,
  selectBookCatalogItems,
  selectBookCatalogIsLoading,
  selectBookCatalogError,
  BookPreviewCard,
  BookPreviewSkeleton,
} from '@/entities/book'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { PrimaryButton } from '@/shared/ui/primary-button'

export function BookFeed() {
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
        {Array.from({ length: 10 }).map((_, i) => (
          <BookPreviewSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.status}>
        <p className={styles.statusText}>Не удалось загрузить книги</p>
        <PrimaryButton onClick={() => dispatch(fetchBooksCatalog())}>
          Повторить
        </PrimaryButton>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className={styles.status}>
        <p className={styles.statusText}>Книг пока нет</p>
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
