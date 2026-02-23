import { onest } from '@shared/fonts'
import { BackButton } from '@shared/ui/back-button'
import { SectionTitle } from '@shared/ui/section-title'

export default function AboutPage() {
  return (
    <div className={onest.className}>
      <BackButton href='/profile' ariaLabel='Назад в профиль'>
        Назад в профиль
      </BackButton>
      <SectionTitle>О себе</SectionTitle>
    </div>
  )
}
