import style from './info-form.module.scss'
import { useState } from 'react'

import { PhotoUploadInput } from '@/features/photo-upload-input'
import { TextInput } from '@/features/text-input'

interface Props {
  onSubmit: (data: {
    name: string
    bio: string
    avatarFile: File | null
  }) => void
}

export function InfoForm({ onSubmit }: Props) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>()
  const [userName, setUserName] = useState<string>('')
  const [userBio, setUserBio] = useState<string>('')

  const handleAvatarChange = (file: File) => {
    setAvatarFile(file)

    const url = URL.createObjectURL(file)

    setAvatarUrl(url)
    console.log(avatarFile)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name: userName, bio: userBio, avatarFile })
  }
  return (
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
          value={userBio}
          onChange={setUserBio}
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
  )
}
