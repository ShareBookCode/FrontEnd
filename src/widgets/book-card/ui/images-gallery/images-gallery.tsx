'use client'

import { useState } from 'react'

import styles from './images-gallery.module.scss'
import { BookImages } from '../../types/types'
import { FavoriteButton } from '@/shared/ui/favorite-button'
import ChooseIcon from '@/shared/assets/icons/choose.svg'
import { PopupGallery } from '../popup-gallery/popup-gallery'

interface Props {
  images: BookImages[]
}

export const BookGallery = ({ images }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [galleryImages, setGalleryImages] = useState(images)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

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

  const chooseMiniImage = (index: number) => {
    setActiveIndex(index)
  }
  const closePopup = () => {
    setIsPopupOpen(false)
    setActiveIndex(0)
  }

  const onPrev = () => {
    setActiveIndex(
      activeIndex - 1 < 0 ? galleryImages.length - 1 : activeIndex - 1,
    )
  }
  const onNext = () => {
    setActiveIndex(
      activeIndex + 1 >= galleryImages.length ? 0 : activeIndex + 1,
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['main-image']}>
        <img
          src={galleryImages[activeIndex].src}
          alt={correctAlt(galleryImages[activeIndex].alt)}
          className={styles['main-image__img']}
          tabIndex={0}
          onClick={() => setIsPopupOpen(true)}
        />
        <FavoriteButton
          className={`${styles['main-image__like-btn']} ${
            galleryImages[activeIndex].liked ? styles.liked : ''
          }`}
          onClick={toggleFavorite}
        />
      </div>
      <div className={styles['mini-image']}>
        {galleryImages.slice(0, 4).map((img, index) => {
          const isActive = activeIndex === index
          const isLast = index === 3
          const hiddenImages = Math.max(galleryImages.length - 4, 0)
          const showMoreOverlay = isLast && hiddenImages > 0

          return (
            <div
              key={img.src}
              className={styles['mini-image__item']}
              onClick={() => chooseMiniImage(index)}
            >
              <img
                src={img.src}
                alt={correctAlt(img.alt)}
                className={styles['mini-image__img']}
                tabIndex={0}
              />

              {showMoreOverlay && (
                <div
                  className={styles['mini-image__more-overlay']}
                  onClick={e => {
                    e.stopPropagation()
                    setIsPopupOpen(true)
                  }}
                >
                  +{hiddenImages}
                </div>
              )}
              {isActive && (
                <div className={styles['mini-image__active-overlay']}>
                  <ChooseIcon />
                </div>
              )}
            </div>
          )
        })}
      </div>
      <PopupGallery
        images={galleryImages}
        isOpen={isPopupOpen}
        currentImageIndex={activeIndex}
        onClose={closePopup}
        onPrev={onPrev}
        onNext={onNext}
        chooseMiniImage={chooseMiniImage}
        correctAlt={correctAlt}
      />
    </div>
  )
}
