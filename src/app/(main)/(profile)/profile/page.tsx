import { Container } from '@/shared/ui/container'
import { ProfileDetails } from './ui/profile-details'
import { Avatar } from './ui/avatar'
import { ProfileActions } from './ui/profile-actions'
import styles from './index.module.scss'

export default function Page() {
  const { name, countBooks, countExchange, description, url } = {
    name: 'Анна Франс',
    url: 'https://www.kino-teatr.ru/person/515/6157.jpg',
    countBooks: 17,
    countExchange: 21,
    description: `Vorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.`,
  }
  const isMyProfile = true

  return (
    <div className={styles.profile}>
      <Container>
        <div className={styles.profile__inner}>
          <div className={styles.profile__info}>
            <Avatar src={url} alt={name} />

            <ProfileDetails
              name={name}
              countBooks={countBooks}
              countExchange={countExchange}
              description={description}
            />
          </div>
          <ProfileActions isMyProfile={isMyProfile} />
        </div>
      </Container>
    </div>
  )
}
