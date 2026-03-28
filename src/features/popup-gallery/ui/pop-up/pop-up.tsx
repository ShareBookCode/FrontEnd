'use client'

import { useEffect } from 'react'
import styles from './pop-up.module.scss'
import Image from 'next/image'
import { Thumballs } from '../thumballs/thumballs-popup'
import type { BookImage } from '@shared/lib/types'
import CloseIcon from '@/shared/assets/icons/close.svg'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-prev.svg'
import ArrowRightIcon from '@/shared/assets/icons/arrow-next.svg'

interface Props {
  images: BookImage[]
  isOpen: boolean
  currentImageIndex: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  chooseMiniImage: (index: number) => void
}

export function Popup({
  images,
  isOpen,
  currentImageIndex,
  onClose,
  onPrev,
  onNext,
  chooseMiniImage,
}: Props) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        onPrev()
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        onNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onPrev, onNext])

  if (!isOpen) return null

  return (
    <div className={styles.popup}>
      <button
        className={`${styles.popupCloseButton} ${styles.btn}`}
        onClick={onClose}
      >
        <CloseIcon />
      </button>
      <div className={styles.mainImgWrapper}>
        <div className={styles.popupMainImageWrapper}>
          <button
            className={`${styles.popupArrowButton} ${styles.arrowsPrev} ${styles.btn}`}
            onClick={onPrev}
          >
            <ArrowLeftIcon />
          </button>
          <Image
            src={images[currentImageIndex].src}
            alt={images[currentImageIndex].alt || 'No alt text'}
            className={styles.popupMainImage}
            tabIndex={0}
            width={437}
            height={658}
            loading='eager'
          />
          <button
            className={`${styles.popupArrowButton} ${styles.arrowsNext} ${styles.btn}`}
            onClick={onNext}
          >
            <ArrowRightIcon />
          </button>
        </div>
      </div>

      <Thumballs
        images={images}
        activeIndex={currentImageIndex}
        onClick={chooseMiniImage}
        onPrev={onPrev}
        onNext={onNext}
      />
    </div>
  )
}
