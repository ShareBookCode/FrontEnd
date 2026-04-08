import style from './about-myself.module.scss'
import { InfoForm } from '../info-form/info-form'
import { BackLink } from '@/features/back-link'

export function aboutMyself() {
  const handleMockSubmit = (data: {
    name: string
    bio: string
    avatarFile: File | null
  }) => {
    console.log('Данные из InfoForm:')
    console.log(data)
  }
  return (
    <div className={style.wrapper}>
      <BackLink path='/' text='Назад в Профиль' />
      <h2 className={style.title}>О себе</h2>
      <InfoForm onSubmit={handleMockSubmit} />
    </div>
  )
}
