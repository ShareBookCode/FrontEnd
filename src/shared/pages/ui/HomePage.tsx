'use client'

import React from 'react'
import { BookCard } from '@/widgets/book-card/index'
import { BookCardData } from '@/shared/lib/BookCardData'
import styles from './HomePage.module.scss'

export default function HomePage() {
  const dataCards = BookCardData

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {dataCards.map((item) => (
          <BookCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}