'use client'

import { useState } from 'react'

import styles from './images-gallery.module.scss'
import { BookImages } from '../../types/types'
import { FavoriteButton } from '@/shared/ui/favorite-button'

interface Props {
  images: BookImages[]
}

export const BookGallery = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [galleryImages, setGalleryImages] = useState(images)

  const correctAlt = (alt?: string) => {
    return alt || 'No alt text'
  }

  const toggleFavorite = () => {
    setGalleryImages(prev =>
      prev.map((img, index) =>
        index === activeIndex ? { ...img, liked: !img.liked } : img,
      ),
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['main-image']}>
        <img
          src={galleryImages[activeIndex].src}
          alt={correctAlt(galleryImages[activeIndex].alt)}
          className={styles['main-image__img']}
        />
        <FavoriteButton
          className={`${styles['main-image__like-btn']} ${
            galleryImages[activeIndex].liked ? styles.liked : ''
          }`}
          onClick={toggleFavorite}
        />
      </div>
    </div>
  )
}
