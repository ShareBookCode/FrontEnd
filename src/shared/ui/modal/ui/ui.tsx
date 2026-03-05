import { useRef, useEffect } from 'react'
import clsx from 'clsx'
import styles from './ui.module.scss'
import { useScrollLock } from '@shared/hooks'
import { useEscapeKey } from '@shared/hooks'

const MODAL_ANIMATION_DURATION = 150

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  closeOnOverlayClick?: boolean
  ariaLabel?: string
}

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  closeOnOverlayClick = true,
  ariaLabel,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useScrollLock(isOpen, MODAL_ANIMATION_DURATION)
  useEscapeKey(onClose, isOpen)

  useEffect(() => {
    if (isOpen) {
      overlayRef.current?.removeAttribute('data-hidden')
    }
  }, [isOpen])

  return (
    <div
      ref={overlayRef}
      className={clsx(styles.overlay, !isOpen && styles.overlayHide)}
      onClick={() => closeOnOverlayClick && onClose()}
      onTransitionEnd={e => {
        if (
          !isOpen &&
          e.target === e.currentTarget &&
          e.propertyName === 'opacity'
        ) {
          overlayRef.current?.setAttribute('data-hidden', 'true')
        }
      }}
      role='dialog'
      aria-modal='true'
      aria-hidden={!isOpen}
      aria-label={ariaLabel}
    >
      <div
        className={clsx(
          styles.content,
          !isOpen && styles.contentHide,
          className,
        )}
        onClick={e => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  )
}
