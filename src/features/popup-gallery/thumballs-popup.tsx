import styles from './thumballs-popup.module.scss'
import Image from 'next/image'
import type { BookImage } from '@shared/lib/types'
import ChooseIcon from '@/shared/assets/icons/choose.svg'
import ArrowLeftIcon from '@/shared/assets/icons/arrow-prev.svg'
import ArrowRightIcon from '@/shared/assets/icons/arrow-next.svg'

interface Props {
  images: BookImage[]
  activeIndex: number
  onClick: (index: number) => void
  onPrev: () => void
  onNext: () => void
}

export function ThumballsPopup({
  images,
  activeIndex,
  onClick,
  onPrev,
  onNext,
}: Props) {
  const numberDisplayedImagesPopup = 7
  const startIndex =
    images.length <= numberDisplayedImagesPopup
      ? 0
      : Math.max(
          0,
          Math.min(activeIndex - 3, images.length - numberDisplayedImagesPopup),
        )

  const visibleImages = images.slice(
    startIndex,
    startIndex + numberDisplayedImagesPopup,
  )

  return (
    <div className={styles.thumballPopupWrapper}>
      <button className={styles.thumballPopupArrowButton} onClick={onPrev}>
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
      <button className={styles.thumballPopupArrowButton} onClick={onNext}>
        <ArrowRightIcon />
      </button>
    </div>
  )
}
