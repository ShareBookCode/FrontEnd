'use client'

import { useState, useRef, useEffect } from 'react'

import clsx from 'clsx'
import styles from './language-select.module.scss'
import ChevronDownIcon from '@/shared/assets/icons/chevron-down.svg'

const OPTIONS = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'English' },
] as const

type LanguageOption = (typeof OPTIONS)[number]
type LanguageValue = LanguageOption['value']

export function LanguageSelect() {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState<LanguageValue>('ru')
  const rootRef = useRef<HTMLDivElement>(null)

  const selectedOption = OPTIONS.find(o => o.value === value) ?? OPTIONS[0]

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (rootRef.current?.contains(e.target as Node)) return
      setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleSelect = (option: LanguageOption) => {
    setValue(option.value)
    setIsOpen(false)
  }

  return (
    <div className={styles.wrap} ref={rootRef}>
      <button
        type='button'
        className={clsx(styles.trigger, isOpen && styles.triggerOpen)}
        onClick={() => setIsOpen(prev => !prev)}
      >
        <span>{selectedOption.label}</span>
        <ChevronDownIcon
          className={clsx(styles.triggerIcon, isOpen && styles.triggerIconOpen)}
        />
      </button>
      {isOpen && (
        <ul className={styles.dropdown}>
          {OPTIONS.map(option => (
            <li
              key={option.value}
              className={clsx(
                styles.option,
                value === option.value && styles.optionSelected,
              )}
              onMouseDown={e => e.preventDefault()}
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
