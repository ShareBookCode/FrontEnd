'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import styles from './ui.module.scss'
import { createBookAction } from '../api'
import {
  CONDITION_OPTIONS,
  EXCHANGE_TYPE_OPTIONS,
  GENRE_OPTIONS,
  type CreateBookFormValues,
} from '../model/types'
import type { BookCondition, Category, ExchangeType } from '@entities/book'
import { Input } from '@shared/ui/inputs'
import { Dropdown } from '@shared/ui/dropdown'
import { DropdownList } from '@shared/ui/dropdown-list'
import { PrimaryButton } from '@shared/ui/primary-button'

const INITIAL_VALUES: CreateBookFormValues = {
  title: '',
  author: '',
  genre: '',
  language: '',
  publisher: '',
  year: '',
  exchangeType: 'free',
  condition: 'Good',
}

export function CreateBookForm() {
  const [values, setValues] = useState<CreateBookFormValues>(INITIAL_VALUES)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof CreateBookFormValues>(
    key: K,
    value: CreateBookFormValues[K],
  ) => setValues(prev => ({ ...prev, [key]: value }))

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setCoverFile(file)
    if (file) {
      setCoverPreview(URL.createObjectURL(file))
    } else {
      setCoverPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('author', values.author)
      formData.append('genre', values.genre)
      formData.append('language', values.language)
      formData.append('publisher', values.publisher)
      formData.append('year', values.year)
      formData.append('exchangeType', values.exchangeType)
      formData.append('condition', values.condition)
      if (coverFile) {
        formData.append('cover', coverFile)
      }
      await createBookAction(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedGenreLabel =
    GENRE_OPTIONS.find(o => o.value === values.genre)?.label ?? null

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Новое объявление</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        {/* Название книги */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor='title'>
            Название книги
          </label>
          <Input
            id='title'
            name='title'
            placeholder='Евгений Онегин'
            value={values.title}
            onChange={e => set('title', e.target.value)}
            required
          />
        </div>

        {/* Автор */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor='author'>
            Автор
          </label>
          <Input
            id='author'
            name='author'
            placeholder='Александр Пушкин'
            value={values.author}
            onChange={e => set('author', e.target.value)}
            required
          />
        </div>

        {/* Жанр */}
        <div className={styles.field}>
          <span className={styles.label}>Жанр</span>
          <Dropdown
            renderTrigger={({ isOpen, toggle }) => (
              <button
                type='button'
                className={styles.dropdownTrigger}
                onClick={toggle}
                aria-expanded={isOpen}
              >
                <span
                  className={clsx(
                    !selectedGenreLabel && styles.dropdownPlaceholder,
                  )}
                >
                  {selectedGenreLabel ?? 'Роман'}
                </span>
                <ChevronIcon
                  className={clsx(
                    styles.dropdownChevron,
                    isOpen && styles.open,
                  )}
                />
              </button>
            )}
          >
            <DropdownList
              values={GENRE_OPTIONS.map(o => ({ primary: o.label }))}
              onSelect={item => {
                const option = GENRE_OPTIONS.find(o => o.label === item.primary)
                if (option) set('genre', option.value as Category)
              }}
            />
          </Dropdown>
        </div>

        {/* Язык книги */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor='language'>
            Язык книги
          </label>
          <Input
            id='language'
            name='language'
            placeholder='Русский'
            value={values.language}
            onChange={e => set('language', e.target.value)}
            required
          />
        </div>

        {/* Издательство */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor='publisher'>
            Издательство
          </label>
          <Input
            id='publisher'
            name='publisher'
            placeholder='АСТ'
            value={values.publisher}
            onChange={e => set('publisher', e.target.value)}
          />
        </div>

        {/* Год издания */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor='year'>
            Год издания
          </label>
          <Input
            id='year'
            name='year'
            placeholder='1994'
            value={values.year}
            onChange={e => set('year', e.target.value)}
            type='number'
            min='1000'
            max='2100'
          />
        </div>

        {/* Вид передачи */}
        <div className={styles.field}>
          <span className={styles.label}>Вид передачи</span>
          <div className={styles.toggleGroup}>
            {EXCHANGE_TYPE_OPTIONS.map(option => (
              <PrimaryButton
                key={option.value}
                type='button'
                variant={
                  values.exchangeType === option.value
                    ? 'primaryFirst'
                    : 'primarySecond'
                }
                onClick={() =>
                  set('exchangeType', option.value as ExchangeType)
                }
              >
                {option.label}
              </PrimaryButton>
            ))}
          </div>
        </div>

        {/* Состояние */}
        <div className={styles.field}>
          <span className={styles.label}>Состояние</span>
          <div className={styles.toggleGroup}>
            {CONDITION_OPTIONS.map(option => (
              <PrimaryButton
                key={option.value}
                type='button'
                variant={
                  values.condition === option.value
                    ? 'primaryFirst'
                    : 'primarySecond'
                }
                onClick={() => set('condition', option.value as BookCondition)}
              >
                {option.label}
              </PrimaryButton>
            ))}
          </div>
        </div>

        {/* Обложка */}
        <div className={styles.field}>
          <span className={styles.label}>Обложка</span>
          <div className={styles.coverUpload}>
            <button
              type='button'
              className={styles.coverPreview}
              onClick={() => coverInputRef.current?.click()}
              aria-label='Загрузить обложку'
            >
              {coverPreview ? (
                <Image
                  src={coverPreview}
                  alt='Обложка книги'
                  width={120}
                  height={150}
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <ImageIcon className={styles.coverIcon} />
              )}
            </button>
            <p className={styles.coverHint}>
              Загрузите обложку из интернета, так мы сможем поддерживать
              удобство поиска книги на платформе. Если в интернете не нашлось
              вашей книги, постарайтесь сделать аккуратное фото обложки.
            </p>
            <input
              ref={coverInputRef}
              className={styles.coverInput}
              type='file'
              accept='image/*'
              onChange={handleCoverChange}
            />
          </div>
        </div>

        <PrimaryButton
          type='submit'
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Создание...' : 'Создать объявление'}
        </PrimaryButton>
      </form>
    </div>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 6L8 10L12 6'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function ImageIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect
        x='3'
        y='3'
        width='18'
        height='18'
        rx='3'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <circle
        cx='8.5'
        cy='8.5'
        r='1.5'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <path
        d='M3 15L8 10L11 13L14 10L21 17'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}
