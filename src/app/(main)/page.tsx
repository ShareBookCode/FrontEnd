'use client'

import { useState } from 'react'
import { BooksFeed } from '@widgets/bookList/bookList'
import { Container } from '@/shared/ui/container'

const categories = [
  'All',
  'ShareBook',
  'Detectives',
  'Romance',
  'Science',
  'Art',
  'Textbooks',
]

export default function Page() {
  const [activeCategory, setActiveCategory] = useState('All')

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <Container>
        <div style={{ padding: '48px 0' }}>
          <h1
            style={{
              marginBottom: '32px',
              fontSize: '32px',
              fontWeight: '800',
              color: '#1a1a1a',
              letterSpacing: '-0.02em',
            }}
          >
            Каталог книг
          </h1>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '40px',
              overflowX: 'auto',
              paddingBottom: '8px',
            }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '100px',
                  border: '1px solid #e0e0e0',
                  background: activeCategory === cat ? '#1a1a1a' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#1a1a1a',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  whiteSpace: 'nowrap',
                  boxShadow:
                    activeCategory === cat
                      ? '0 4px 12px rgba(0,0,0,0.1)'
                      : 'none',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <BooksFeed category={activeCategory} />
        </div>
      </Container>
    </main>
  )
}
