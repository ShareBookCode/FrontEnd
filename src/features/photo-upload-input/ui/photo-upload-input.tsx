import style from './photo-upload-input.module.scss'

import Image from 'next/image'
import { useRef } from 'react'

import defaultImage from '../model/image/1.jpg'

interface Props {
  value?: string
  validText: string
  onChange: (file: File) => void
}

export function PhotoUploadInput({ value, onChange, validText }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpenFileDialog = () => {
    inputRef.current?.click()
  }
  return (
    <div className={style.wrapper}>
      <Image
        className={style.image}
        src={value ?? defaultImage}
        alt='Аватар'
        width={100}
        height={100}
        onClick={handleOpenFileDialog}
      />

      <div className={style.info}>
        <label className={style.label}>
          <button
            type='button'
            className={style.btn}
            onClick={handleOpenFileDialog}
          >
            Новое фото
          </button>
          <input
            ref={inputRef}
            className={style.input}
            type='file'
            accept='image/*'
            onChange={e => {
              const currentFile = e.target.files?.[0]
              if (currentFile) onChange(currentFile)
            }}
          />
        </label>

        <p className={style.description}>{validText}</p>
      </div>
    </div>
  )
}
