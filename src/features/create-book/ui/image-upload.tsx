'use client'

import { useRef } from 'react'
import Image from 'next/image'
import AddBookIcon from '@icons/add-book-icon.svg'
import styles from './image-upload.module.scss'
import clsx from 'clsx'

interface ImageUploadProps {
  images: string[]
  max: number
  width: number
  height: number
  onAdd: (file: File) => void
  onRemove: (index: number) => void
  hint?: string
  layout?: 'stack' | 'grid'
}

export function ImageUpload({
  images,
  max,
  width,
  height,
  onAdd,
  onRemove,
  hint,
  layout = 'grid',
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (!file) return
    onAdd(file)
    e.target.value = ''
  }

  const slots = (
    <div
      className={clsx(styles.slots, layout === 'stack' && styles.stackSlots)}
    >
      {images.map((src, i) => (
        <div key={i} className={styles.thumb} style={{ width, height }}>
          <Image
            src={src}
            alt={`Фото ${i + 1}`}
            width={width}
            height={height}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
          <button
            type='button'
            className={styles.remove}
            onClick={() => onRemove(i)}
            aria-label='Удалить фото'
          >
            ×
          </button>
        </div>
      ))}

      {images.length < max && (
        <button
          type='button'
          className={styles.addSlot}
          style={{ width, height }}
          onClick={() => inputRef.current?.click()}
          aria-label='Добавить фото'
        >
          <AddBookIcon className={styles.addIcon} />
        </button>
      )}

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        className={styles.hiddenInput}
        onChange={handleChange}
      />
    </div>
  )

  if (layout === 'stack') {
    return (
      <div className={styles.stackLayout}>
        {slots}
        {hint && <p className={styles.hint}>{hint}</p>}
      </div>
    )
  }

  return slots
}
