'use client'

import { useEffect } from 'react'
import Link from 'next/link'
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
        {books.map(book => (
          <BookPreviewCard key={book.id} bookPreview={book} />
        ))}
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {books.map(book => (
        <Link href={`/books/${book.id}`} key={book.id}>
          <BookPreviewCard bookPreview={book} />
        </Link>
      ))}
    </div>
  )
}
