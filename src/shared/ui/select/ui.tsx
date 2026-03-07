'use client'

import styles from './ui.module.scss'
import clsx from 'clsx'
import Image from 'next/image'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'

export type SelectItem =
  | string
  | {
      label: string
      value?: string
      iconSrc?: string
      iconAlt?: string
    }

type RenderTriggerProps = {
  isOpen: boolean
  selectedItem?: SelectItem
  selectedLabel: string
  open: () => void
  close: () => void
  toggle: () => void
  disabled?: boolean
}

type Props = {
  width?: number | string
  items: SelectItem[]
  value?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
  placeholder?: string
  dropdownClassName?: string
  itemClassName?: string
  renderTrigger: (props: RenderTriggerProps) => ReactNode
}

function getLabel(item: SelectItem) {
  return typeof item === 'string' ? item : item.label
}

function getValue(item: SelectItem) {
  if (typeof item === 'string') return item
  return item.value ?? item.label
}

function getIcon(item: SelectItem) {
  return typeof item === 'string' ? undefined : item.iconSrc
}

function getIconAlt(item: SelectItem) {
  return typeof item === 'string' ? '' : item.iconAlt || ''
}

function toCssWidth(width?: Props['width']) {
  if (width === undefined) return undefined
  return typeof width === 'number' ? `${width}px` : width
}

export function Select({
  width,
  items,
  value,
  onChange,
  className,
  disabled,
  placeholder = 'Выберите…',
  dropdownClassName,
  itemClassName,
  renderTrigger,
}: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  const selectedItem = useMemo(() => {
    return items.find(item => getValue(item) === value)
  }, [items, value])

  const selectedLabel = selectedItem ? getLabel(selectedItem) : placeholder

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!rootRef.current) return
      if (!rootRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
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

  const handlePick = (item: SelectItem) => {
    onChange?.(getValue(item))
    setIsOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={clsx(styles.root, className)}
      style={{ width: toCssWidth(width) }}
      data-disabled={disabled ? 'true' : 'false'}
    >
      {renderTrigger({
        isOpen,
        selectedItem,
        selectedLabel,
        open,
        close,
        toggle,
        disabled,
      })}

      {isOpen && (
        <div
          className={clsx(styles.dropdown, dropdownClassName)}
          role='listbox'
        >
          <div className={styles.dropdownInner}>
            {items.map((item, idx) => {
              const label = getLabel(item)
              const itemValue = getValue(item)
              const iconSrc = getIcon(item)
              const iconAlt = getIconAlt(item)
              const isSelected = itemValue === value

              return (
                <button
                  key={`${itemValue}-${idx}`}
                  type='button'
                  className={clsx(
                    styles.item,
                    isSelected && styles.itemSelected,
                    itemClassName,
                  )}
                  onClick={() => handlePick(item)}
                  role='option'
                  aria-selected={isSelected}
                >
                  {iconSrc && (
                    <span className={styles.itemIcon}>
                      <Image
                        src={iconSrc}
                        alt={iconAlt}
                        width={16}
                        height={16}
                      />
                    </span>
                  )}

                  <span className={styles.itemText}>{label}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}