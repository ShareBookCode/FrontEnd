import styles from './thumballs.module.scss'
import Image from 'next/image'
import { BookImage } from '../../types/types'
import clsx from 'clsx'
import ChooseIcon from '@/shared/assets/icons/choose.svg'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-prev.svg'
import ArrowRightIcon from '@/shared/assets/icons/arrow-next.svg'

interface Props {
  mode: 'main' | 'popup'
  images: BookImage[]
  activeIndex: number
  onClick: (index: number) => void
  setIsPopupOpen?: (isOpen: boolean) => void
  onPrev?: () => void
  onNext?: () => void
}

export const Thumballs = ({
  mode,
  images,
  activeIndex,
  onClick,
  setIsPopupOpen,
  onPrev,
  onNext,
}: Props) => {
  switch (mode) {
    case 'main':
      const numberDisplayedImages = 4
      return (
        <div className={styles.thumballsMainWrapper}>
          {images.slice(0, numberDisplayedImages).map((image, index) => {
            const isActive = activeIndex === index
            const isLast = index === numberDisplayedImages - 1
            const hiddenCount = Math.max(
              images.length - numberDisplayedImages,
              0,
            )
            const showMoreOverlay = isLast && hiddenCount > 0

            return (
              <button
                key={`${image.src}-${index}`}
                onClick={() => onClick(index)}
                className={styles.thumballMainItem}
              >
                <Image
                  src={image.src}
                  alt={image.alt ?? 'No alt text'}
                  tabIndex={0}
                  width={72}
                  height={72}
                  className={styles.thumballMainImg}
                />
                {showMoreOverlay && (
                  <div
                    className={styles.thumballMainMoreOverlay}
                    onClick={e => {
                      e.stopPropagation()
                      setIsPopupOpen?.(true)
                    }}
                  >
                    +{hiddenCount}
                  </div>
                )}
                {isActive && !showMoreOverlay && (
                  <div className={styles.thumballMainActiveOverlay}>
                    <ChooseIcon />
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )
    case 'popup':
      const numberDisplayedImagesPopup = 7
      const startIndex =
        images.length <= numberDisplayedImagesPopup
          ? 0
          : Math.max(
              0,
              Math.min(
                activeIndex - 3,
                images.length - numberDisplayedImagesPopup,
              ),
            )

      const visibleImages = images.slice(
        startIndex,
        startIndex + numberDisplayedImagesPopup,
      )

      return (
        <div className={styles.thumballPopupWrapper}>
          <button
            className={styles.thumballPopupArrowButton}
            onClick={onPrev ?? (() => {})}
          >
            <ArrowLeftIcon />
          </button>
          <div className={styles.thumballImagesList}>
            {visibleImages.map((img, index) => {
              const actualIndex = startIndex + index
              const isActive = activeIndex === actualIndex

              return (
                <button
                  key={`${img.src}-${actualIndex}`}
                  className={styles.thumballPopupItem}
                  onClick={() => onClick(actualIndex)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt ?? 'No alt text'}
                    className={styles.thumballPopupImg}
                    tabIndex={0}
                    width={72}
                    height={72}
                  />

                  {isActive && (
                    <div className={styles.thumballPopupActiveOverlay}>
                      <ChooseIcon />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
          <button
            className={styles.thumballPopupArrowButton}
            onClick={onNext ?? (() => {})}
          >
            <ArrowRightIcon />
          </button>
        </div>
      )
    default:
      return null
  }
}
