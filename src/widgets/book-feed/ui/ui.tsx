'use client'

import { useEffect } from 'react'
import styles from './ui.module.scss'
import {
  fetchBooksCatalog,
  selectBookCatalogItems,
  BookPreviewCard,
} from '@/entities/book'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'

export function BookFeed() {
  const dispatch = useAppDispatch()
  const books = useAppSelector(selectBookCatalogItems)

  useEffect(() => {
    dispatch(fetchBooksCatalog())
  }, [dispatch])

  return (
    <div className={styles.grid}>
      {books.map(book => (
        <BookPreviewCard key={book.id} bookPreview={book} />
      ))}
    </div>
  )
}
