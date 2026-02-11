'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { fetchBookPreviews } from '@entities/book/model'
import { useAppDispatch, useAppSelector } from '@shared/hooks'

export const BooksFeed = () => {
  const dispatch = useAppDispatch()
  const { data, isLoading } = useAppSelector(state => state.book)

  useEffect(() => {
    dispatch(fetchBookPreviews())
  }, [dispatch])

  if (isLoading) return <div>Загрузка 20 книг...</div>

  return (
    <div
      style={{
        display: 'grid',
        gap: '20px',
        margin: '35px',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
      }}
    >
      {data.map(book => (
        <div
          key={book.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            borderRadius: '4px',
          }}
        >
          <div style={{ fontSize: '12px', color: '#888' }}>ID: {book.id}</div>
          <div style={{ fontWeight: 'bold' }}>{book.title}</div>
          <div style={{ fontSize: '13px' }}>👤 {book.author}</div>
          <div style={{ fontSize: '11px', marginTop: '8px' }}>
            📍 {book.location} <br />
            🔄 {book.exchangeType} <br />
            📊 {book.status}
          </div>
          {book.thumbnail && (
            <Image
              src={book.thumbnail}
              alt=''
              width={200}
              height={300}
              style={{
                marginTop: '10px',
                objectFit: 'cover',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}
