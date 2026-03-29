import styles from './thumballs-gallery.module.scss'
import Image from 'next/image'
import type { BookImage } from '@shared/lib/types'
import ChooseIcon from '@/shared/assets/icons/choose.svg'

interface Props {
  images: BookImage[]
  activeIndex: number
  onClick: (index: number) => void
  setIsPopupOpen: (isOpen: boolean) => void
}

export function ThumballsGallery({
  images,
  activeIndex,
  onClick,
  setIsPopupOpen,
}: Props) {
  const numberDisplayedImages = 4
  return (
    <div className={styles.thumballsMainWrapper}>
      {images.slice(0, numberDisplayedImages).map((image, index) => {
        const isActive = activeIndex === index
        const isLast = index === numberDisplayedImages - 1
        const hiddenCount = Math.max(images.length - numberDisplayedImages, 0)
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
                  setIsPopupOpen(true)
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
}
