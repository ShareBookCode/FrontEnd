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

type RenderContentProps = {
  close: () => void
}

type Props = {
  width?: number | string
  className?: string
  dropdownClassName?: string
  disabled?: boolean
  isOpen?: boolean
  onOpenChange?: (next: boolean) => void
  renderTrigger: (props: RenderTriggerProps) => ReactNode
  children: ReactNode | ((props: RenderContentProps) => ReactNode)
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
  const hasRequestedCloseRef = useRef(false)

  const isControlled = controlledIsOpen !== undefined
  const rawIsOpen = isControlled ? Boolean(controlledIsOpen) : innerIsOpen
  const isOpen = disabled ? false : rawIsOpen

  const setOpen = useCallback(
    (next: boolean) => {
      if (disabled && next) return
      if (next === rawIsOpen) return

      if (!isControlled) {
        setInnerIsOpen(next)
      }

      onOpenChange?.(next)
    },
    [disabled, isControlled, rawIsOpen, onOpenChange],
  )

  const open = () => setOpen(true)
  const close = () => setOpen(false)
  const toggle = () => setOpen(!isOpen)

  useEffect(() => {
    const shouldForceClose = Boolean(disabled && rawIsOpen)

    if (!shouldForceClose) {
      hasRequestedCloseRef.current = false
      return
    }

    if (hasRequestedCloseRef.current) return

    hasRequestedCloseRef.current = true

    const timeoutId = window.setTimeout(() => {
      setOpen(false)
    }, 0)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [disabled, rawIsOpen, setOpen])

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

  const content =
    typeof children === 'function' ? children({ close }) : children

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, className)}
      style={style}
      aria-disabled={disabled || undefined}
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
          {content}
        </div>
      )}
    </div>
  )
}
