'use client'

import styles from './ui.module.scss'
import HitIcon from '@icons/hit.svg'
import ExchangeIcon from '@icons/exchange.svg'
import LocationIcon from '@icons/location.svg'
import type { Book, ExchangeType } from '@/entities/book'
import { ActionButton } from '@/shared/ui/action-button'

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

  function buildExchangeDescription(
    name: string,
    exchangeType: ExchangeType,
    status: BookStatus,
  ) {
    if (status === 'closed') {
      return `${name} уже закрыла это объявление`
    }
    if (status === 'reserved') {
      return `${name} временно зарезервировала эту книгу`
    }
    if (exchangeType === 'free') {
      return `${name} готов(а) отдать книгу бесплатно`
    }

    return `${name} готов(а) обменять книгу на любую интересную`
  }

  const safeGivenCount = givenCount ?? 0
  const safeExchangedCount = exchangedCount ?? 0
  const safeCity = city ?? ''
  const safeDistrict = district ?? ''

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
          <HitIcon width={18} height={18} />
        </span>
        Отдано {safeGivenCount} книг • Обменяно {safeExchangedCount}
      </p>
      <p className={styles.note}>
        <span className={styles.cardIcon}>
          <ExchangeIcon width={18} height={18} />
        </span>
        {buildExchangeDescription(name, exchangeType, status)}
      </p>
      <p className={styles.location}>
        <span className={styles.cardIcon}>
          <LocationIcon width={18} height={18} />
        </span>
        {safeCity}
        {safeDistrict && `, ${safeDistrict}`}
      </p>
      <span className={styles.separator} />

      {/* Переключаем действие по владельцу книги */}
      {isMyBook ? (
        <div className={styles.actions}>
          <ActionButton as='link' href={actions.editHref ?? '#'}>
            Редактировать
          </ActionButton>
          <ActionButton
            as='button'
            variant='dangerText'
            onClick={actions.onCloseAd}
          >
            Закрыть объявление
          </ActionButton>
        </div>
      ) : (
        <ActionButton as='link' href={actions.chatHref ?? '/chats'}>
          Написать
        </ActionButton>
      )}
    </aside>
  )
}
