'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import {
  fetchBookById,
  clearDetails,
  selectBookDetailsData,
  selectBookDetailsIsLoading,
} from '@entities/book/model'
import { useAppDispatch, useAppSelector } from '@shared/hooks'

export default function BookPage() {
  const params = useParams()
  const id = params.bookId as string
  const dispatch = useAppDispatch()
  const book = useAppSelector(selectBookDetailsData)
  const isLoading = useAppSelector(selectBookDetailsIsLoading)

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id as string))
    }

    return () => {
      dispatch(clearDetails())
    }
  }, [dispatch, id])

  if (isLoading) return <div>Загрузка полной информации...</div>
  if (!book) return <div>Книга не найдена</div>

  return (
    <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Сетка: Слева фото, справа инфо */}
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}
      >
        {/* Блок изображений */}
        <section>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '500px',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Image
              src={book.thumbnails[0]}
              alt={book.title}
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          {/* Миниатюры */}
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            {book.thumbnails.slice(1).map((url, idx) => (
              <div
                key={idx}
                style={{ position: 'relative', width: '80px', height: '100px' }}
              >
                <Image src={url} alt='' fill style={{ objectFit: 'cover' }} />
              </div>
            ))}
          </div>
        </section>

        {/* Блок заголовка */}
        <section>
          <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>
            {book.title}
          </h1>
          <h2
            style={{ fontSize: '1.2rem', color: '#555', marginBottom: '20px' }}
          >
            {book.author}
          </h2>

          {/* Таблица описания */}
          <div style={{ marginBottom: '30px' }}>
            <h3>Описание</h3>
            <p style={{ lineHeight: '1.6' }}>{book.description}</p>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              fontSize: '14px',
            }}
          >
            <div>
              <strong>Издательство:</strong> {book.publisher}
            </div>
            <div>
              <strong>Год издания:</strong> {book.year}
            </div>
            <div>
              <strong>Жанр:</strong> {book.genre}
            </div>
            <div>
              <strong>Категория:</strong> {book.condition}
            </div>
            <div>
              <strong>Язык:</strong> {book.language}
            </div>
            <div>
              <strong>Переплет:</strong> {book.binding}
            </div>
            <div>
              <strong>Страниц:</strong> {book.pages}
            </div>
          </div>

          {/* Блок владельца */}
          {/* Здесь будет информация о пользователе, но для него нужно создавать отдельные моковые данные + прописывать интерфейс, так что оставляем пустым */}
        </section>
      </div>
    </main>
  )
}
