'use client'

import styles from './ui.module.scss'
import clsx from 'clsx'
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
  KeyboardEvent,
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
  closeOnContentClick = false,
  renderTrigger,
  children,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    function onEscape(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEscape)

    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEscape)
    }
  }, [])

  const open = () => {
    if (!disabled) setIsOpen(true)
  }

  const close = () => {
    setIsOpen(false)
  }

  const toggle = () => {
    if (!disabled) setIsOpen(prev => !prev)
  }

  const handleDropdownClick = () => {
    if (closeOnContentClick) {
      setIsOpen(false)
    }
  }

  const handleDropdownKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  const style: CSSProperties = {
    width: toCssWidth(width),
  }

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, className)}
      style={style}
      data-disabled={disabled ? 'true' : 'false'}
    >
      {renderTrigger({
        isOpen,
        open,
        close,
        toggle,
        disabled,
      })}

      {isOpen && (
        <div
          className={clsx(styles.dropdown, dropdownClassName)}
          onClick={handleDropdownClick}
          onKeyDown={handleDropdownKeyDown}
        >
          <div className={styles.dropdownInner}>{children}</div>
        </div>
      )}
    </div>
  )
}
