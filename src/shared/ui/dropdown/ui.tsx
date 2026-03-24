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
  setOpen: (next: boolean) => void
  disabled?: boolean
}

type Props = {
  width?: number | string
  className?: string
  dropdownClassName?: string
  disabled?: boolean
  isOpen?: boolean
  onOpenChange?: (next: boolean) => void
  renderTrigger: (props: RenderTriggerProps) => ReactNode
  children: ReactNode
}

const toCssWidth = (width?: Props['width']) => {
  if (width === undefined) return undefined
  return typeof width === 'number' ? `${width}px` : width
}

export function Dropdown({
  width,
  className,
  dropdownClassName,
  disabled,
  isOpen: controlledIsOpen,
  onOpenChange,
  renderTrigger,
  children,
}: Props) {
  const [innerIsOpen, setInnerIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : innerIsOpen

  const setOpen = useCallback(
    (next: boolean) => {
      if (next === isOpen) return
      if (disabled && next) return

      if (!isControlled) {
        setInnerIsOpen(next)
      }

      onOpenChange?.(next)
    },
    [disabled, isControlled, isOpen, onOpenChange],
  )

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, setOpen])

  const style: CSSProperties = {
    width: toCssWidth(width),
  }

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, className)}
      style={style}
      aria-disabled={disabled || undefined}
    >
      {renderTrigger({
        isOpen,
        setOpen,
        disabled,
      })}

      {isOpen && (
        <div className={clsx(styles.dropdown, dropdownClassName)}>
          {children}
        </div>
      )}
    </div>
  )
}
