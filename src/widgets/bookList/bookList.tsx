'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './BooksFeed.module.scss'

import {
  fetchBooksCatalog,
  selectBookCatalogItems,
  selectBookCatalogIsLoading,
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
        {Array.from({ length: 6 }).map((_, i) => (
          <div className={styles.cardSkeleton} key={i}>
            <div className={styles.imageSkeleton} />
            <div style={{ height: 20, width: '80%', background: '#e0e0e0', borderRadius: 4 }} />
            <div style={{ height: 16, width: '60%', background: '#e0e0e0', borderRadius: 4 }} />
          </div>
        ))}
      </div>
    )

  return (
    <div className={styles.grid}>
      {books.map(book => (
        <Link  href={`/books/${book.id}`} key={book.id}>
          <div className={styles.card}>
            <div>ID: {book.id}</div>
            <b>{book.title}</b>
            <div>👤 {book.author}</div>

            <div style={{ flexGrow: 1 }}>
              📍 {book.location.city}, {book.location.district}
            </div>

            {book.thumbnail && (
              <div  className={styles.imageWrapper}>
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  loading="lazy"
                  placeholder="blur"
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