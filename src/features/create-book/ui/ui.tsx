'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import ChevronIcon from '@icons/chevron.svg'
import { createBookAction, uploadThumbnails } from '../api'
import { ImageUpload } from './image-upload'
import { GENRE_OPTIONS, type CreateBookFormValues } from '../model/types'
import { FIELD_CONFIG } from '../model/config'
import styles from './ui.module.scss'
import type { Category } from '@entities/book'
import { Input } from '@shared/ui/inputs'
import { Dropdown } from '@shared/ui/dropdown'
import { DropdownList } from '@shared/ui/dropdown-list'
import { PrimaryButton } from '@shared/ui/primary-button'
import { getListCities } from '@shared/api/city'
import { ROUTES } from '@shared/config/routes'

const INITIAL_VALUES: CreateBookFormValues = {
  title: '',
  author: '',
  genre: '',
  language: '',
  publisher: '',
  year: '',
  pages: '',
  exchangeType: 'free',
  condition: 'Good',
  description: '',
  location: '',
}

const MIN_LOCATION_LENGTH = 3
const DEBOUNCE_MS = 400
const MAX_EXTRA_PHOTOS = 3

export function CreateBookForm() {
  const router = useRouter()
  const t = useTranslations('CreateBook')
  const [values, setValues] = useState<CreateBookFormValues>(INITIAL_VALUES)
  const [coverFile, setCoverFile] = useState<File | null>(null)
  const [coverPreview, setCoverPreview] = useState<string | null>(null)
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])
  const [locationSuggestions, setLocationSuggestions] = useState<
    { city: string; place: string }[]
  >([])
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateBookFormValues, string>>
  >({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const set = <K extends keyof CreateBookFormValues>(
    key: K,
    value: CreateBookFormValues[K],
  ) => setValues(prev => ({ ...prev, [key]: value }))

  const clearError = (key: keyof CreateBookFormValues) =>
    setErrors(prev => ({ ...prev, [key]: undefined }))

  const validate = (): boolean => {
    const next: Partial<Record<keyof CreateBookFormValues, string>> = {}
    if (!values.title.trim()) next.title = t('errors.required')
    if (!values.author.trim()) next.author = t('errors.required')
    if (!values.language.trim()) next.language = t('errors.required')
    if (values.year) {
      const y = Number(values.year)
      if (y < 1000 || y > 2100) next.year = t('errors.yearRange')
    }
    if (values.pages) {
      const p = Number(values.pages)
      if (p < 1) next.pages = t('errors.pagesMin')
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleAddCover = (file: File) => {
    if (coverPreview) URL.revokeObjectURL(coverPreview)
    setCoverFile(file)
    setCoverPreview(URL.createObjectURL(file))
  }

  const handleRemoveCover = () => {
    if (coverPreview) URL.revokeObjectURL(coverPreview)
    setCoverFile(null)
    setCoverPreview(null)
  }

  const handleAddPhoto = (file: File) => {
    setPhotoFiles(prev => [...prev, file])
    setPhotoPreviews(prev => [...prev, URL.createObjectURL(file)])
  }

  const handleRemovePhoto = (index: number) => {
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

  const resetForm = () => {
    setValues(INITIAL_VALUES)
    if (coverPreview) URL.revokeObjectURL(coverPreview)
    setCoverFile(null)
    setCoverPreview(null)
    photoPreviews.forEach(url => URL.revokeObjectURL(url))
    setPhotoFiles([])
    setPhotoPreviews([])
    setLocationSuggestions([])
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const thumbnails = await uploadThumbnails(coverFile, photoFiles)
      await createBookAction({
        title: values.title,
        description: values.description,
        publisher: values.publisher,
        year: Number(values.year),
        pages: Number(values.pages),
        genres: [values.genre],
        authors: [values.author],
        language: values.language,
        condition: values.condition,
        exchangeType: values.exchangeType,
        thumbnails,
        location: { city: values.location, district: '' },
      })
      resetForm()
      router.push(ROUTES.home)
    } catch {
      setSubmitError(t('submitError'))
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
      <h4 className={styles.title}>{t('title')}</h4>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        {FIELD_CONFIG.map(field => {
          if (field.type === 'input') {
            return (
              <div key={field.key} className={styles.field}>
                <label className={styles.label} htmlFor={field.key}>
                  {t(`fields.${field.key}.label`)}
                </label>
                <Input
                  id={field.key}
                  name={field.key}
                  placeholder={t(`fields.${field.key}.placeholder`)}
                  value={values[field.key] as string}
                  onChange={e => {
                    setValues(prev => ({
                      ...prev,
                      [field.key]: e.target.value,
                    }))
                    clearError(field.key)
                  }}
                  type={field.inputType}
                  min={field.min}
                  max={field.max}
                />
                {errors[field.key] && (
                  <span className={styles.fieldError}>{errors[field.key]}</span>
                )}
              </div>
            )
          }

          if (field.type === 'genre') {
            return (
              <div key='genre' className={styles.field}>
                <span className={styles.label}>{t('fields.genre.label')}</span>
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
                        {selectedGenreLabel ?? t('fields.genre.placeholder')}
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
                      const option = GENRE_OPTIONS.find(
                        o => o.label === item.primary,
                      )
                      if (option) set('genre', option.value as Category)
                    }}
                  />
                </Dropdown>
              </div>
            )
          }

          return (
            <div key={field.key} className={styles.field}>
              <span className={styles.label}>
                {t(`fields.${field.key}.label`)}
              </span>
              <div className={styles.toggleGroup}>
                {field.options.map(option => (
                  <PrimaryButton
                    key={option.value}
                    type='button'
                    variant={
                      values[field.key] === option.value
                        ? 'primaryFirst'
                        : 'primarySecond'
                    }
                    onClick={() =>
                      setValues(prev => ({
                        ...prev,
                        [field.key]: option.value,
                      }))
                    }
                  >
                    {option.label}
                  </PrimaryButton>
                ))}
              </div>
            </div>
          )
        })}

        <div className={styles.field}>
          <span className={styles.label}>{t('fields.cover.label')}</span>
          <ImageUpload
            images={coverPreview ? [coverPreview] : []}
            max={1}
            width={150}
            height={227}
            onAdd={handleAddCover}
            onRemove={handleRemoveCover}
            layout='stack'
            hint={t('fields.cover.hint')}
          />
        </div>

        <div className={styles.field}>
          <span className={styles.label}>{t('fields.photos.label')}</span>
          <ImageUpload
            images={photoPreviews}
            max={MAX_EXTRA_PHOTOS}
            width={156}
            height={156}
            onAdd={handleAddPhoto}
            onRemove={handleRemovePhoto}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='description'>
            {t('fields.description.label')}
          </label>
          <textarea
            id='description'
            name='description'
            className={styles.textarea}
            placeholder={t('fields.description.placeholder')}
            value={values.description}
            onChange={e => set('description', e.target.value)}
            rows={4}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor='location'>
            {t('fields.location.label')}
          </label>
          <Dropdown
            renderTrigger={({ isOpen, open }) => (
              <Input
                id='location'
                name='location'
                placeholder={t('fields.location.placeholder')}
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
              label={t('locationSuggestionsLabel')}
            />
          </Dropdown>

          {mapSrc && (
            <iframe
              className={styles.map}
              src={mapSrc}
              title={t('mapTitle')}
              allowFullScreen
            />
          )}
        </div>

        {submitError && <p className={styles.submitError}>{submitError}</p>}

        <div className={styles.submitSection}>
          <PrimaryButton
            type='submit'
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? t('submittingButton') : t('submitButton')}
          </PrimaryButton>

          <p className={styles.disclaimer}>
            {t.rich('disclaimer', {
              link: chunks => (
                <a href={ROUTES.rules} className={styles.disclaimerLink}>
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </form>
    </div>
  )
}
