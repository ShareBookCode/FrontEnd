'use client'

import { useState } from 'react'
import Image from 'next/image'

import styles from './images-gallery.module.scss'
import { BookImage } from '../../types/types'
import { FavoriteButton } from '@/shared/ui/favorite-button'
import { PopupGallery } from '../popup-gallery/popup-gallery'
import { Thumballs } from '../thumballs/thumballs'

interface Props {
  images: BookImage[]
}

export const BookGallery = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const chooseMiniImage = (index: number) => {
    setActiveIndex(index)
  }
  const closePopup = () => {
    setIsPopupOpen(false)
  }

  const onPrev = () => {
    setActiveIndex(prev => (prev - 1 < 0 ? images.length - 1 : prev - 1))
  }
  const onNext = () => {
    setActiveIndex(prev => (prev + 1 >= images.length ? 0 : prev + 1))
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainImage} onClick={() => setIsPopupOpen(true)}>
        <Image
          src={images[activeIndex].src}
          alt={images[activeIndex].alt ?? 'No alt text'}
          className={styles.mainImageImg}
          tabIndex={0}
          width={315}
          height={475}
          loading='eager'
        />
        <FavoriteButton className={styles.mainImageLikeBtn} />
      </div>
      <Thumballs
        mode='main'
        images={images}
        activeIndex={activeIndex}
        onClick={chooseMiniImage}
        setIsPopupOpen={setIsPopupOpen}
        onPrev={onPrev}
        onNext={onNext}
      />
      <PopupGallery
        images={images}
        isOpen={isPopupOpen}
        currentImageIndex={activeIndex}
        onClose={closePopup}
        onPrev={onPrev}
        onNext={onNext}
        chooseMiniImage={chooseMiniImage}
      />
    </div>
  )
}
