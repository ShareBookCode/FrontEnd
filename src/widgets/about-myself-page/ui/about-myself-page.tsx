'use client'

import style from './about-myself-page.module.scss'
import { useState, useEffect } from 'react'
import { BackLink } from '@/features/back-link'
import { PhotoUploadInput } from '@/features/photo-upload-input'
import { TextInput } from '@/features/text-input'

interface Props {
  submitAction: (
    formData: SubmitProfileData,
  ) => Promise<{ error?: string; success?: boolean }>
  initialData?: {
    name?: string
    description?: string
    avatarUrl?: string
  }
}

export interface SubmitProfileData {
  name: string
  description: string
  avatarFile?: File | null
  city?: string
}

export function AboutMyselfPage({
  initialData,
  submitAction,
}: Readonly<Props>) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(
    initialData?.avatarUrl || undefined,
  )
  const [userName, setUserName] = useState<string>(initialData?.name || '')
  const [userDescription, setUserDescription] = useState<string>(
    initialData?.description || '',
  )

  useEffect(() => {
    if (initialData) {
      setAvatarUrl(initialData.avatarUrl || undefined)
      setUserName(initialData.name || '')
      setUserDescription(initialData.description || '')
    }
  }, [initialData])

  const handleAvatarChange = (file: File) => {
    setAvatarFile(file)

    const url = URL.createObjectURL(file)
    setAvatarUrl(url)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const payload: SubmitProfileData = {
      name: userName,
      description: userDescription,
      avatarFile: avatarFile,
      city: 'mome',
    }

    try {
      console.log(payload)
      const result = await submitAction(payload)

      if (result?.success) {
        console.log('Профиль обновлён', result)
      } else {
        console.error('Ошибка:', result?.error)
        alert(result?.error || 'Не удалось сохранить')
      }
    } catch (err) {
      console.error('Network error:', err)
      alert('Ошибка соединения с сервером')
    }
  }

  return (
    <div className={style.wrapper}>
      <BackLink path='/' text='Назад в Профиль' />
      <h2 className={style.title}>О себе</h2>
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.avatarBlock}>
          <PhotoUploadInput
            value={avatarUrl}
            onChange={handleAvatarChange}
            validText='Рекомендуемый размер фото от 800×800 пх. Желательно, чтобы на
          фотографии было видно ваше лицо, так вы сможете повысить доверие
          пользователей.'
          />
        </div>
        <div className={style.fieldsBlock}>
          <TextInput
            value={userName}
            onChange={setUserName}
            title='Имя'
            description='Имя видно всем пользователям'
            id='name-input'
            variant='horizontal'
            type='input'
          />
          <TextInput
            value={userDescription}
            onChange={setUserDescription}
            title='Био'
            description='Расскажите немного о себе'
            id='bio-input'
            variant='vertical'
            type='textarea'
          />
        </div>
        <div className={style.actionBlock}>
          <button type='submit' className={style.btn}>
            Сохранить
          </button>
        </div>
      </form>
    </div>
  )
}
