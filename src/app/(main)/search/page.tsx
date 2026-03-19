'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { BooksFeed } from '@widgets/bookList'
import { Container } from '@/shared/ui/container'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <main>
      <Container>
        <div style={{ padding: '40px 0' }}>
          <h1
            style={{
              marginBottom: '24px',
              fontSize: '24px',
              fontWeight: 'bold',
            }}
          >
            Результаты поиска по запросу: "{query}"
          </h1>
          <BooksFeed searchQuery={query} />
        </div>
      </Container>
    </main>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<div>Загрузка поиска...</div>}>
      <SearchResults />
    </Suspense>
  )
}
