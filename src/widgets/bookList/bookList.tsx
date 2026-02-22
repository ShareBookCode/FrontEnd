'use client'

import { useEffect } from 'react'
import Image from 'next/image'
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
  if (isLoading)
    return (
      <div className={styles.grid}>
        {books.map(book => (
          <BookPreviewCard key={book.id} bookPreview={book} />
        ))}
      </div>
    )

  return (
    <div className={styles.grid}>
      {books.map(book => (
        <Link href={`/books/${book.id}`} key={book.id}>
          <div className={styles.card}>
            <div>ID: {book.id}</div>
            <b>{book.title}</b>
            <div>👤 {book.author}</div>

            <div style={{ flexGrow: 1 }}>
              📍 {book.location.city}, {book.location.district}
            </div>

            {book.thumbnail && (
              <div className={styles.imageWrapper}>
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  loading='lazy'
                  placeholder='blur'
                  blurDataURL={book.thumbnail}
                />
              </div>
            )}

            {book.isFavorite && <div>❤️</div>}
          </div>
        </Link>
      ))}
    </div>
  )
}
