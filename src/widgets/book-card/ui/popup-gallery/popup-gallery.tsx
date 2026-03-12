'use client'

import styles from './popup-gallery.module.scss'
import { BookImages } from '../../types/types'
import CloseIcon from '@/shared/assets/icons/close.svg'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-prev.svg'
import ArrowRightIcon from '@/shared/assets/icons/arrow-next.svg'
import ChooseIcon from '@/shared/assets/icons/choose.svg'

interface Props {
  images: BookImages[]
  isOpen: boolean
  currentImageIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  chooseMiniImage: (index: number) => void
  correctAlt: (alt?: string) => string
}

export const PopupGallery = ({
  images,
  isOpen,
  currentImageIndex,
  onClose,
  onPrev,
  onNext,
  chooseMiniImage,
  correctAlt,
}: Props) => {
  if (!isOpen) return null

  const windowSize = 7
  const startIndex =
    images.length <= windowSize
      ? 0
      : Math.max(0, Math.min(currentImageIndex - 3, images.length - windowSize))
  const visibleImages = images.slice(startIndex, startIndex + windowSize)

  return (
    <div className={styles['popup-gallery']}>
      <button
        className={`${styles['popup-gallery__close-button']} ${styles['btn']}`}
        onClick={onClose}
      >
        <CloseIcon />
      </button>
      <div className={styles['popup-gallery__main-image-wrapper']}>
        <button
          className={`${styles['popup-gallery__arrow-button']} ${styles['arrows__prev']} ${styles['btn']}`}
          onClick={onPrev}
        >
          <ArrowLeftIcon />
        </button>
        <img
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          className={styles['popup-gallery__main-image']}
        />
        <button
          className={`${styles['popup-gallery__arrow-button']} ${styles['arrows__next']} ${styles['btn']}`}
          onClick={onNext}
        >
          <ArrowRightIcon />
        </button>
      </div>
      <div className={styles['popup-gallery__mini-images-wrapper']}>
        <button
          className={`${styles['popup-gallery__mini-arrow-button']} ${styles['arrows__prev-mini']}`}
          onClick={onPrev}
        >
          <ArrowLeftIcon />
        </button>
        <div className={styles['popup-gallery__mini-images-list']}>
          {visibleImages.map((img, index) => {
            const actualIndex = startIndex + index
            const isActive = currentImageIndex === actualIndex

            return (
              <div
                key={`${img.src}-${actualIndex}`}
                className={styles['popup-gallery__mini-image-item']}
                onClick={() => chooseMiniImage(actualIndex)}
              >
                <img
                  src={img.src}
                  alt={correctAlt(img.alt)}
                  className={styles['popup-gallery__mini-image-img']}
                  tabIndex={0}
                />

                {isActive && (
                  <div
                    className={
                      styles['popup-gallery__mini-image-active-overlay']
                    }
                  >
                    <ChooseIcon />
                  </div>
                )}
              </div>
            )
          })}
        </div>
        <button
          className={`${styles['popup-gallery__mini-arrow-button']} ${styles['arrows__next-mini']}`}
          onClick={onNext}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  )
}
