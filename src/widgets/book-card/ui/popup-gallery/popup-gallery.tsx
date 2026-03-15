'use client'

import styles from './popup-gallery.module.scss'
import Image from 'next/image'
import { BookImage } from '../../types/types'
import CloseIcon from '@/shared/assets/icons/close.svg'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-prev.svg'
import ArrowRightIcon from '@/shared/assets/icons/arrow-next.svg'
import { Thumballs } from '../thumballs/thumballs'

interface Props {
  images: BookImage[]
  isOpen: boolean
  currentImageIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  chooseMiniImage: (index: number) => void
}

export const PopupGallery = ({
  images,
  isOpen,
  currentImageIndex,
  onClose,
  onPrev,
  onNext,
  chooseMiniImage,
}: Props) => {
  if (!isOpen) return null

  return (
    <div className={styles.popupGallery}>
      <button
        className={`${styles.popupGalleryCloseButton} ${styles.btn}`}
        onClick={onClose}
      >
        <CloseIcon />
      </button>
      <div className={styles.popupGalleryMainImageWrapper}>
        <button
          className={`${styles.popupGalleryArrowButton} ${styles.arrowsPrev} ${styles.btn}`}
          onClick={onPrev}
        >
          <ArrowLeftIcon />
        </button>
        <Image
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt || 'No alt text'}
          className={styles.popupGalleryMainImage}
          tabIndex={0}
          width={315}
          height={475}
          loading='eager'
        />
        <button
          className={`${styles.popupGalleryArrowButton} ${styles.arrowsNext} ${styles.btn}`}
          onClick={onNext}
        >
          <ArrowRightIcon />
        </button>
      </div>
      <Thumballs
        mode='popup'
        images={images}
        activeIndex={currentImageIndex}
        onClick={chooseMiniImage}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  )
}
