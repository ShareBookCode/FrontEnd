'use client'

import styles from './ui.module.scss'
import clsx from 'clsx'
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
  CSSProperties,
} from 'react'

type RenderTriggerProps = {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  disabled?: boolean
}

type Props = {
  width?: number | string
  className?: string
  dropdownClassName?: string
  disabled?: boolean
  closeOnContentClick?: boolean
  isOpen?: boolean
  onOpenChange?: (next: boolean) => void
  renderTrigger: (props: RenderTriggerProps) => ReactNode
  children: ReactNode
}

function toCssWidth(width?: Props['width']) {
  if (width === undefined) return undefined
  return typeof width === 'number' ? `${width}px` : width
}

export function Dropdown({
  width,
  className,
  dropdownClassName,
  disabled,
  closeOnContentClick = true,
  isOpen: controlledIsOpen,
  onOpenChange,
  renderTrigger,
  children,
}: Props) {
  const [uncontrolledIsOpen, setUncontrolledIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : uncontrolledIsOpen

  const setOpenState = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledIsOpen(next)
      }

      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const open = useCallback(() => {
    if (!disabled) {
      setOpenState(true)
    }
  }, [disabled, setOpenState])

  const close = useCallback(() => {
    setOpenState(false)
  }, [setOpenState])

  const toggle = useCallback(() => {
    if (!disabled) {
      setOpenState(!isOpen)
    }
  }, [disabled, isOpen, setOpenState])

  const handleDropdownInnerClick = () => {
    if (closeOnContentClick) {
      close()
    }
  }

  useEffect(() => {
    function onDocClick(e: PointerEvent) {
      if (!rootRef.current) return

      if (!rootRef.current.contains(e.target as Node)) {
        close()
      }
    }

    function onEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close()
      }
    }

    document.addEventListener('pointerdown', onDocClick)
    document.addEventListener('keydown', onEscape)

    return () => {
      document.removeEventListener('pointerdown', onDocClick)
      document.removeEventListener('keydown', onEscape)
    }
  }, [close])

  const style: CSSProperties = {
    width: toCssWidth(width),
  }

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, className)}
      style={style}
      aria-disabled={disabled ? 'true' : 'false'}
    >
      {renderTrigger({
        isOpen,
        open,
        close,
        toggle,
        disabled,
      })}

      {isOpen && (
        <div className={clsx(styles.dropdown, dropdownClassName)}>
          <div
            className={styles.dropdownInner}
            onClick={handleDropdownInnerClick}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}
