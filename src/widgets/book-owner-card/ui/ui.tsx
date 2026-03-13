import styles from './ui.module.scss'
import HitIcon from '@icons/hit.svg'
import ExchangeIcon from '@icons/exchange.svg'
import LocationIcon from '@icons/location.svg'
import { getExchangeDescription } from '../lib/getExchangeDescription'
import type { Book, ExchangeType } from '@/entities/book'
import { PrimaryButton } from '@/shared/ui/primary-button'
import { DangerButton } from '@/shared/ui/danger-button'

type BookStatus = Book['status']

export type BookOwnerCardData = {
  ownerId: string
  name: string
  avatarUrl?: string | null
  memberSinceMonths?: number
  givenCount?: number
  exchangedCount?: number
  exchangeType: ExchangeType
  status: BookStatus
  city?: string
  district?: string
  isMyBook: boolean
  actions: {
    editHref?: string
    chatHref?: string
    onCloseAd?: () => void
  }
}

interface BookOwnerCardProps {
  data: BookOwnerCardData
}

export function BookOwnerCard({ data }: BookOwnerCardProps) {
  const {
    name,
    avatarUrl,
    memberSinceMonths,
    givenCount,
    exchangedCount,
    exchangeType,
    status,
    city,
    district,
    isMyBook,
    actions,
  } = data

  const statsText = `Отдано ${givenCount ?? 0} книг • Обменяно ${exchangedCount ?? 0}`
  const exchangeDescription = getExchangeDescription(name, exchangeType, status)
  const locationText = city ? `${city}, ${district}` : city

  return (
    <aside className={styles.card}>
      <div className={styles.header}>
        {avatarUrl ? (
          <span
            className={styles.avatar}
            aria-hidden='true'
            style={{ backgroundImage: `url(${avatarUrl})` }}
          />
        ) : (
          <div className={styles.avatar} aria-hidden='true'>
            {name.slice(0, 1)}
          </div>
        )}

        <div>
          <p className={styles.name}>{name}</p>
          {/* Пока нет даты регистрации пользователя, оставляем простую заглушку */}
          <p className={styles.meta}>
            {memberSinceMonths != null
              ? `${memberSinceMonths} месяцев с ShareBook`
              : '6 месяцев с ShareBook'}
          </p>
        </div>
      </div>

      <p className={styles.stats}>
        <span className={styles.cardIcon}>
          <HitIcon width={24} height={24} />
        </span>
        {statsText}
      </p>
      <p className={styles.note}>
        <span className={styles.cardIcon}>
          <ExchangeIcon width={18} height={18} />
        </span>
        {exchangeDescription}
      </p>
      {(city || district) && (
        <p className={styles.location}>
          <span className={styles.cardIcon}>
            <LocationIcon width={18} height={18} />
          </span>
          {locationText}
        </p>
      )}
      <span className={styles.separator} />

      {isMyBook ? (
        <div className={styles.actions}>
          {/* TODO: заменить на реальные ссылки/хендлеры, когда появятся маршруты и API */}
          <PrimaryButton as='link' href={actions.editHref ?? '#'}>
            Редактировать
          </PrimaryButton>
          {/* TODO: заменить на реальные ссылки/хендлеры, когда появятся маршруты и API */}
          <DangerButton onClick={actions.onCloseAd}>
            Закрыть объявление
          </DangerButton>
        </div>
      ) : (
        /* TODO: заменить на реальные ссылки/хендлеры, когда появятся маршруты и API */
        <PrimaryButton as='link' href={actions.chatHref ?? '/chats'}>
          Написать
        </PrimaryButton>
      )}
    </aside>
  )
}
