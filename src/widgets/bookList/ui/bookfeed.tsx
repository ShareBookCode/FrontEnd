'use client'

import { useEffect } from 'react'
import styles from './BooksFeed.module.scss'

import {
  fetchBooksCatalog,
  selectBookCatalogItems,
  selectBookCatalogIsLoading,
  BookPreviewCard,
} from '@/entities/book'

import { useAppDispatch, useAppSelector } from '@shared/hooks'

export const BooksFeed = () => {
  const dispatch = useAppDispatch()
  const books = useAppSelector(selectBookCatalogItems)
  const isLoading = useAppSelector(selectBookCatalogIsLoading)

  useEffect(() => {
    dispatch(fetchBooksCatalog())
  }, [dispatch])

  if (isLoading) {
    return (
      <div className={styles.grid}>
        {[...Array(6)].map((_, index) => (
          <div key={index} className={styles.cardSkeleton}>
            <div className={styles.imageSkeleton} />
            <div className={styles.skeletonLine} style={{ width: '60%' }} />
            <div className={styles.skeletonLine} style={{ width: '40%' }} />
            <div className={styles.skeletonLine} style={{ width: '80%' }} />
          </div>
        ))}
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
