'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import ChevronIcon from '@icons/chevron.svg'
import AddBookIcon from '@icons/add-book-icon.svg'
import { createBookAction } from '../api'
import {
  CONDITION_OPTIONS,
  EXCHANGE_TYPE_OPTIONS,
  GENRE_OPTIONS,
  type CreateBookFormValues,
} from '../model/types'
import styles from './ui.module.scss'
import type { BookCondition, Category, ExchangeType } from '@entities/book'
import { Input } from '@shared/ui/inputs'
import { Dropdown } from '@shared/ui/dropdown'
import { DropdownList } from '@shared/ui/dropdown-list'
import { PrimaryButton } from '@shared/ui/primary-button'
import { getListCities } from '@shared/api/city'

const INITIAL_VALUES: CreateBookFormValues = {
  title: '',
  author: '',
  genre: '',
  language: '',
  publisher: '',
  year: '',
  exchangeType: 'free',
  condition: 'Good',
  description: '',
  location: '',
}

const MIN_LOCATION_LENGTH = 3
const DEBOUNCE_MS = 400
const MAX_EXTRA_PHOTOS = 4

export function CreateBookForm() {
  const [values, setValues] = useState<CreateBookFormValues>(INITIAL_VALUES)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [locationSuggestions, setLocationSuggestions] = useState<
    { city: string; place: string }[]
  >([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return
    if (photoFiles.length >= MAX_EXTRA_PHOTOS) return
    const preview = URL.createObjectURL(file)
    setPhotoFiles(prev => [...prev, file])
    setPhotoPreviews(prev => [...prev, preview])
    e.target.value = ''
  }

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(photoPreviews[index])
    setPhotoFiles(prev => prev.filter((_, i) => i !== index))
    setPhotoPreviews(prev => prev.filter((_, i) => i !== index))
  }

  const searchLocation = (value: string, onSuccess?: () => void) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (value.length < MIN_LOCATION_LENGTH) {
      setLocationSuggestions([])
      return
    }
    debounceRef.current = setTimeout(async () => {
      const response = await getListCities({ search: value, lang: 'ru' })
      const results: { city: string; place: string }[] = Array.isArray(
        response.results,
      )
        ? response.results
        : []
      setLocationSuggestions(results)
      if (results.length > 0) onSuccess?.()
    }, DEBOUNCE_MS)
  }

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [])

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
      formData.append('description', values.description)
      formData.append('location', values.location)
      if (coverFile) {
        formData.append('cover', coverFile)
      }
      photoFiles.forEach(file => formData.append('photos', file))
      await createBookAction(formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedGenreLabel =
    GENRE_OPTIONS.find(o => o.value === values.genre)?.label ?? null

  const mapSrc = values.location
    ? `https://yandex.ru/maps/?text=${encodeURIComponent(values.location)}&z=15`
    : null

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
                  width={18}
                  height={18}
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
                  width={150}
                  height={227}
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
              className={styles.hiddenInput}
              type='file'
              accept='image/*'
              onChange={handleCoverChange}
            />
          </div>
        </div>

        {/* Дополнительные фотографии */}
        <div className={styles.field}>
          <span className={styles.label}>Дополнительные фотографии</span>
          <div className={styles.photoGrid}>
            {photoPreviews.map((src, i) => (
              <div key={i} className={styles.photoThumb}>
                <Image
                  src={src}
                  alt={`Фото ${i + 1}`}
                  width={80}
                  height={80}
                  style={{ objectFit: 'cover' }}
                />
                <button
                  type='button'
                  className={styles.photoRemove}
                  onClick={() => removePhoto(i)}
                  aria-label='Удалить фото'
                >
                  ×
                </button>
              </div>
            ))}
            {photoFiles.length < MAX_EXTRA_PHOTOS && (
              <button
                type='button'
                className={styles.photoAdd}
                onClick={() => photoInputRef.current?.click()}
                aria-label='Добавить фото'
              >
                <AddBookIcon className={styles.photoAddIcon} />
              </button>
            )}
          </div>
          <input
            ref={photoInputRef}
            className={styles.hiddenInput}
            type='file'
            accept='image/*'
            onChange={handlePhotoChange}
          />
        </div>

        {/* Описание */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor='description'>
            Описание
          </label>
          <textarea
            id='description'
            name='description'
            className={styles.textarea}
            placeholder='Книга 1997 года издания...'
            value={values.description}
            onChange={e => set('description', e.target.value)}
            rows={4}
          />
        </div>

        {/* Место встречи */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor='location'>
            Место встречи
          </label>
          <Dropdown
            renderTrigger={({ isOpen, open }) => (
              <Input
                id='location'
                name='location'
                placeholder='Санкт-Петербург, Исаакиевский сквер'
                value={values.location}
                onChange={e => {
                  set('location', e.target.value)
                  searchLocation(e.target.value, open)
                }}
                onFocus={() => {
                  if (
                    values.location.length >= MIN_LOCATION_LENGTH &&
                    locationSuggestions.length > 0
                  )
                    open()
                }}
                role='combobox'
                aria-autocomplete='list'
                aria-expanded={isOpen}
                aria-controls='location-listbox'
              />
            )}
          >
            <DropdownList
              values={locationSuggestions.map(s => ({
                primary: s.city,
                secondary: s.place || undefined,
              }))}
              onSelect={item => {
                const full = item.secondary
                  ? `${item.primary}, ${item.secondary}`
                  : item.primary
                set('location', full)
                setLocationSuggestions([])
              }}
              idList='location-listbox'
              idOption='location-option'
              label='Подсказки мест встречи'
            />
          </Dropdown>

          {mapSrc && (
            <iframe
              className={styles.map}
              src={mapSrc}
              title='Место встречи на карте'
              allowFullScreen
            />
          )}
        </div>

        <PrimaryButton
          type='submit'
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Публикация...' : 'Выложить объявление'}
        </PrimaryButton>

        <p className={styles.disclaimer}>
          Выкладывая объявление вы соглашаетесь с правилами{' '}
          <a href='/rules' className={styles.disclaimerLink}>
            ShareBook
          </a>
        </p>
      </form>
    </div>
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
