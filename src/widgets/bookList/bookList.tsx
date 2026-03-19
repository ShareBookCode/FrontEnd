'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  fetchBooksCatalog,
  selectBookCatalogItems,
  selectBookCatalogIsLoading,
} from '@/entities/book'
import { useAppDispatch, useAppSelector } from '@shared/hooks'

export function BooksFeed({
  searchQuery = '',
  category = 'All',
}: {
  searchQuery?: string
  category?: string
}) {
  const dispatch = useAppDispatch()
  const books = useAppSelector(selectBookCatalogItems)
  const isLoading = useAppSelector(selectBookCatalogIsLoading)

  useEffect(() => {
    dispatch(fetchBooksCatalog())
  }, [dispatch])

  const filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = category === 'All' || book.genre === category
    return matchesSearch && matchesCategory
  })

  if (isLoading)
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#909090' }}>
        Загрузка книг...
      </div>
    )
  if (filteredBooks.length === 0)
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: '#909090' }}>
        Книги не найдены.
      </div>
    )

  return (
    <div
      style={{
        display: 'grid',
        gap: '20px',
        margin: '35px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      }}
    >
      {filteredBooks.map(book => (
        <Link
          href={`/books/${book.id}`}
          key={book.id}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <div
            key={book.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ fontSize: '12px', color: '#888' }}>ID: {book.id}</div>
            <div style={{ fontWeight: 'bold' }}>{book.title}</div>
            <div style={{ fontSize: '13px' }}>👤 {book.author}</div>

            <div style={{ fontSize: '11px', marginTop: '8px', flexGrow: 1 }}>
              {/* Теперь location — это объект */}
              📍 {book.location.city}, {book.location.district}
            </div>

            {book.thumbnail && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '300px',
                  marginTop: '10px',
                }}
              >
                <Image
                  src={book.thumbnail}
                  alt={book.title}
                  fill
                  sizes='(max-width: 768px) 100vw, 250px'
                  style={{
                    objectFit: 'cover',
                    borderRadius: '2px',
                  }}
                />
              </div>
            )}

            {/* Простой индикатор избранного */}
            {book.isFavorite && (
              <div style={{ color: 'red', fontSize: '18px', marginTop: '5px' }}>
                ❤️
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
