'use client'

import React, { useState } from 'react'
import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/navigation'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import styles from './BookCard.module.scss'

interface BookCard {
  id: number;
  image: string | StaticImageData;
  title: string;
  author: string;
  subTitle: string;
}

interface BookCardProps {
  item: BookCard;
}

export const BookCard = ({ item }: BookCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/book/${item.id}`)
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image
            width={202}
            height={304}
            alt={item.title}
            src={item.image}
            className={styles.bookImage}
          />
          <button
            onClick={handleFavoriteClick}
            className={styles.favoriteButton}
            aria-label={isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
          >
            {isFavorite ? (
              <FavoriteIcon className={styles.favoriteIcon} />
            ) : (
              <FavoriteBorderIcon className={styles.favoriteBorderIcon} />
            )}
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={styles.title}>{item.title}</h3>
        <p className={styles.author}>{item.author}</p>
        <p className={styles.subtitle}>{item.subTitle}</p>
      </div>
    </div>
  )
}