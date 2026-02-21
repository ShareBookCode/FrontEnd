'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { LikeButton } from '@/features/toggle-book-like'
import { onest } from '@shared/fonts'
import clsx from 'clsx'

import styles from './book-card.module.scss'

interface BookImages {
  src: string
  alt?: string
  liked: boolean
}

interface BookData {
  id: string
  title: string
  author: string
  images: BookImages[]
  description: string
  publisher: string
  yearPublisher: string
  binding: string
  pages: string
  genre: string[] | string
  bookLanguage: string
  bookState: string
}

interface Props {
  book: BookData
}

export const BookCard = ({ book }: Props) => {
  const [activeImage, setActiveImage] = useState<number>(0)
  const [galleryPopupIndex, setGalleryPopupIndex] = useState<number | null>(
    null,
  )
  const MAX_PREVIEW = 4
  const MINI_VISIBLE = 6
  const [miniStartIndex, setMiniStartIndex] = useState(0)
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

  const [currentMiniVisible, setCurrentMiniVisible] = useState(MINI_VISIBLE)
  
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [miniTransition, setMiniTransition] = useState(0)
  const [isSwipingMini, setIsSwipingMini] = useState(false)
  const [popupImageTransition, setPopupImageTransition] = useState(false)

  useEffect(() => {
    const getMiniVisible = () => {
      if (window.innerWidth <= 480) return 3
      if (window.innerWidth <= 768) return 4
      return MINI_VISIBLE 
    }

    const handleResize = () => {
      setCurrentMiniVisible(getMiniVisible())
    }


    setCurrentMiniVisible(getMiniVisible())

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const nextMini = () => {
    setMiniStartIndex(prev => (prev + 1) % book.images.length)
  }

  const prevMini = () => {
    setMiniStartIndex(
      prev => (prev - 1 + book.images.length) % book.images.length,
    )
  }

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setIsSwipingMini(true)
      nextMini()
      setTimeout(() => setIsSwipingMini(false), 300)
    } else if (isRightSwipe) {
      setIsSwipingMini(true)
      prevMini()
      setTimeout(() => setIsSwipingMini(false), 300)
    }
  }

  const [mouseStart, setMouseStart] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const onMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientX)
    setIsDragging(true)
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !mouseStart) return
    e.preventDefault()
  }

  const onMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !mouseStart) return
    
    const distance = mouseStart - e.clientX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setIsSwipingMini(true)
      nextMini()
      setTimeout(() => setIsSwipingMini(false), 300)
    } else if (isRightSwipe) {
      setIsSwipingMini(true)
      prevMini()
      setTimeout(() => setIsSwipingMini(false), 300)
    }

    setIsDragging(false)
    setMouseStart(null)
  }

  const onMainImageTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onMainImageTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onMainImageTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    const maxImages = Math.min(MAX_PREVIEW, book.images.length)
    
    if (isLeftSwipe) {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveImage(prev => (prev + 1) % maxImages)
        setIsTransitioning(false)
      }, 150)
    } else if (isRightSwipe) {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveImage(prev => (prev - 1 + maxImages) % maxImages)
        setIsTransitioning(false)
      }, 150)
    }
  }

  const onMainImageMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientX)
    setIsDragging(true)
  }

  const onMainImageMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !mouseStart) return
    
    const distance = mouseStart - e.clientX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    const maxImages = Math.min(MAX_PREVIEW, book.images.length)
    
    if (isLeftSwipe) {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveImage(prev => (prev + 1) % maxImages)
        setIsTransitioning(false)
      }, 150)
    } else if (isRightSwipe) {
      setIsTransitioning(true)
      setTimeout(() => {
        setActiveImage(prev => (prev - 1 + maxImages) % maxImages)
        setIsTransitioning(false)
      }, 150)
    }

    setIsDragging(false)
    setMouseStart(null)
  }
    
  const onPopupImageTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onPopupImageTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onPopupImageTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }
  }

  const onPopupImageMouseDown = (e: React.MouseEvent) => {
    setMouseStart(e.clientX)
    setIsDragging(true)
  }

  const onPopupImageMouseUp = (e: React.MouseEvent) => {
    if (!isDragging || !mouseStart) return
    
    const distance = mouseStart - e.clientX
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      nextImage()
    } else if (isRightSwipe) {
      prevImage()
    }

    setIsDragging(false)
    setMouseStart(null)
  }

  const [likedImages, setLikedImages] = useState<boolean[]>(() =>
    book.images.map(img => img.liked),
  )

  const isLiked = likedImages[activeImage]

  const toggleLike = (index: number) => {
    setLikedImages(prev =>
      prev.map((value, i) => (i === index ? !value : value)),
    )
  }

  const hasMoreThanPreview = book.images.length > MAX_PREVIEW

  const nextImage = () => {
    setPopupImageTransition(true)
    setTimeout(() => {
      setGalleryPopupIndex(prev =>
        prev === null ? 0 : (prev + 1) % book.images.length,
      )
      setPopupImageTransition(false)
    }, 150)
  }

  const prevImage = () => {
    setPopupImageTransition(true)
    setTimeout(() => {
      setGalleryPopupIndex(prev =>
        prev === null ? 0 : (prev - 1 + book.images.length) % book.images.length,
      )
      setPopupImageTransition(false)
    }, 150)
  }

  useEffect(() => {
    if (galleryPopupIndex === null) return

    const visibleIndices = Array.from(
      { length: currentMiniVisible },
      (_, i) => (miniStartIndex + i) % book.images.length,
    )

    if (!visibleIndices.includes(galleryPopupIndex)) {
      const centerOffset = Math.floor(currentMiniVisible / 2)
      setMiniStartIndex(
        (galleryPopupIndex - centerOffset + book.images.length) %
          book.images.length,
      )
    }
  }, [galleryPopupIndex, book.images.length, currentMiniVisible])

  if (!book.images || book.images.length === 0) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.emptyState}>
          <img
            src='https://picsum.photos/seed/book1/400/600'
            alt='Нет изображений'
            className={styles.bookImagesEmptyImage}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={clsx(styles.wrapper, onest.className)}>
      <div className={styles.bookImages}>
        <div
          className={styles.bookImagesMain}
          onClick={() => setGalleryPopupIndex(activeImage)}
          onTouchStart={onMainImageTouchStart}
          onTouchMove={onMainImageTouchMove}
          onTouchEnd={onMainImageTouchEnd}
          onMouseDown={onMainImageMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMainImageMouseUp}
          onMouseLeave={() => {
            setIsDragging(false)
            setMouseStart(null)
          }}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none'
          }}
        >
          <img
            src={book.images[activeImage].src}
            alt={book.images[activeImage].alt ?? book.title}
            className={styles.bookImagesMainImage}
            style={{
              opacity: isTransitioning ? 0.7 : 1,
              transform: isTransitioning ? 'scale(0.98)' : 'scale(1)'
            }}
          />
          <div className={styles.likedBtnContainer}>
            <LikeButton
              isLiked={isLiked}
              onToggle={() => toggleLike(activeImage)}
            />
          </div>
        </div>
        <div className={styles.bookImagesMini}>
          {book.images.slice(0, MAX_PREVIEW).map((img, index) => {
            const isActive = activeImage === index
            const isLastPreviewItem =
              hasMoreThanPreview && index === MAX_PREVIEW - 1

            return (
              <div
                key={img.src}
                className={`${styles.bookImagesMiniItem} ${
                  isActive ? styles.active : ''
                }`}
              >
                {isLastPreviewItem ? (
                  <div
                    className={styles.morePlaceholder}
                    onClick={() => setGalleryPopupIndex(index)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt ?? `Фото ${index + 1}`}
                      className={styles.morePlaceholderImage}
                    />
                    <div className={styles.morePlaceholderOverlay}>
                      +{book.images.length - MAX_PREVIEW}
                    </div>
                  </div>
                ) : (
                  <img
                    src={img.src}
                    alt={img.alt ?? `Фото ${index + 1}`}
                    className={styles.bookImagesMiniImage}
                    onClick={() => setActiveImage(index)}
                  />
                )}

                {isActive && !isLastPreviewItem && (
                  <div className={styles.overlay}>
                    <svg
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <polyline points='20 6 9 17 4 12' />
                    </svg>
                  </div>
                )}
              </div>
            )
          })}
          {galleryPopupIndex !== null &&
            typeof window !== 'undefined' &&
            createPortal(
              <div
                className={styles.popupOverlay}
                onClick={() => setGalleryPopupIndex(null)}
              >
                <div
                  className={styles.popupInterface}
                  onClick={e => e.stopPropagation()}
                >
                  <div 
                    className={styles.popupImageMain}
                    onTouchStart={onPopupImageTouchStart}
                    onTouchMove={onPopupImageTouchMove}
                    onTouchEnd={onPopupImageTouchEnd}
                    onMouseDown={onPopupImageMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onPopupImageMouseUp}
                    onMouseLeave={() => {
                      setIsDragging(false)
                      setMouseStart(null)
                    }}
                    style={{ 
                      cursor: isDragging ? 'grabbing' : 'grab',
                      userSelect: 'none'
                    }}
                  >
                    <img 
                      src={book.images[galleryPopupIndex].src} 
                      alt='' 
                      style={{
                        opacity: popupImageTransition ? 0.7 : 1,
                        transform: popupImageTransition ? 'scale(0.95)' : 'scale(1)'
                      }}
                    />
                    <button
                      className={styles.popupMainNextBtn}
                      onClick={nextImage}
                    >
                      <svg
                        width='8'
                        height='16'
                        viewBox='0 0 8 16'
                        fill='currentColor'
                      >
                        <path
                          d='M1 1l6 7-6 7'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                    <button
                      className={styles.popupMainPrevBtn}
                      onClick={prevImage}
                    >
                      <svg
                        width='8'
                        height='16'
                        viewBox='0 0 8 16'
                        fill='currentColor'
                      >
                        <path
                          d='M7 1L1 8l6 7'
                          stroke='currentColor'
                          strokeWidth='1.5'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>
                  <div 
                    className={styles.popupImageMini}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    onMouseLeave={() => {
                      setIsDragging(false)
                      setMouseStart(null)
                    }}
                    style={{ 
                      cursor: isDragging ? 'grabbing' : 'grab',
                      userSelect: 'none'
                    }}
                  >
                    <div className={styles.miniContainer}>
                      {Array.from(
                        { length: Math.min(currentMiniVisible, book.images.length) },
                        (_, index) => {
                          const realIndex =
                            (miniStartIndex + index) % book.images.length
                          const img = book.images[realIndex]
                          const isActive = realIndex === galleryPopupIndex

                          return (
                            <div
                              key={`${img.src}${realIndex}`}
                              className={`${styles.popupMiniImageItem} ${
                                isActive ? styles.activeMini : ''
                              }`}
                            >
                              <img
                                src={img.src}
                                alt={img.alt ?? `Фото ${realIndex + 1}`}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  transform: isSwipingMini ? 'scale(0.95)' : 'scale(1)',
                                  opacity: isSwipingMini ? 0.7 : 1,
                                  transition: 'transform 0.2s ease, opacity 0.2s ease'
                                }}
                                onClick={() => setGalleryPopupIndex(realIndex)}
                              />
                              {isActive && (
                                <div className={styles.overlay}>
                                  <svg
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    stroke='currentColor'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  >
                                    <polyline points='20 6 9 17 4 12' />
                                  </svg>
                                </div>
                              )}
                            </div>
                          )
                        },
                      )}
                    </div>

                    <button
                      className={styles.popupMiniPrevBtn}
                      onClick={prevMini}
                    >
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                      >
                        <path
                          d='M15 18l-6-6 6-6'
                          stroke='currentColor'
                          strokeWidth='2'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>

                    <button
                      className={styles.popupMiniNextBtn}
                      onClick={nextMini}
                    >
                      <svg
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='currentColor'
                      >
                        <path
                          d='M9 18l6-6-6-6'
                          stroke='currentColor'
                          strokeWidth='2'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </button>
                  </div>

                  <button
                    onClick={() => setGalleryPopupIndex(null)}
                    className={styles.popupCloseBtn}
                  >
                    <svg
                      width='11'
                      height='11'
                      viewBox='0 0 11 11'
                      fill='currentColor'
                    >
                      <path
                        d='M1 1l9 9M10 1l-9 9'
                        stroke='currentColor'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  </button>
                </div>
              </div>,
              document.body,
            )}
        </div>
      </div>
      <div className={styles.bookDetails}>
        <div className={styles.bookDetailsDescription}>
          <h3 className={styles.bookDetailsTitle}>Описание</h3>
          <div className={styles.bookDetailsContent}>
            <p className={styles.bookDetailsText}>
              {isDescriptionExpanded
                ? book.description
                : book.description.length > 300
                  ? `${book.description.slice(0, 300)}...`
                  : book.description}
              {book.description.length > 300 && (
                <button
                  className={styles.readMoreBtn}
                  onClick={() =>
                    setIsDescriptionExpanded(!isDescriptionExpanded)
                  }
                >
                  {isDescriptionExpanded ? ' Скрыть' : ' Читать полностью'}
                </button>
              )}
            </p>
          </div>
        </div>

        <div className={styles.bookInfo}>
          <div className={styles.bookInfoItem}>
            <span className={styles.bookInfoLabel}>Автор</span>
            <span className={styles.bookInfoValue}>{book.author}</span>
          </div>
          <div className={styles.bookInfoItem}>
            <span className={styles.bookInfoLabel}>Издательство</span>
            <span className={styles.bookInfoValue}>{book.publisher}</span>
          </div>
          <div className={styles.bookInfoItem}>
            <span className={styles.bookInfoLabel}>Год издания</span>
            <span className={styles.bookInfoValue}>{book.yearPublisher}</span>
          </div>
          <div className={styles.bookInfoItem}>
            <span className={styles.bookInfoLabel}>Переплет</span>
            <span className={styles.bookInfoValue}>{book.binding}</span>
          </div>
          <div className={styles.bookInfoItem}>
            <span className={styles.bookInfoLabel}>Страниц</span>
            <span className={styles.bookInfoValue}>{book.pages}</span>
          </div>
          <div className={styles.bookInfoItem}>
            <span className={styles.bookInfoLabel}>Жанр</span>
            <span className={styles.bookInfoValue}>
              {Array.isArray(book.genre)
                ? book.genre.length > 0
                  ? book.genre.join(', ')
                  : 'Не указан'
                : book.genre || 'Не указан'}
            </span>
          </div>
          <div className={styles.bookInfoItem}>
            <span className={styles.bookInfoLabel}>Язык</span>
            <span className={styles.bookInfoValue}>{book.bookLanguage}</span>
          </div>
          <div className={styles.bookInfoItem}>
            <span className={styles.bookInfoLabel}>Состояние</span>
            <span className={styles.bookInfoValue}>{book.bookState}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
