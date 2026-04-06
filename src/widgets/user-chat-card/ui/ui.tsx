'use client'

import clsx from 'clsx'

import StarVerifiedIcon from '@icons/star-verified.svg'

import styles from './ui.module.scss'
import { CountBadge } from '@shared/ui/count-badge'

export interface UserChatCardProps {
  name: string
  avatarUrl?: string | null
  lastMessage?: string
  bookTitle?: string
  timestamp?: string
  unreadCount?: number
  isVerified?: boolean
  isActive?: boolean
  onClick?: () => void
}

export function UserChatCard({
  name,
  avatarUrl,
  lastMessage,
  bookTitle,
  timestamp,
  unreadCount,
  isVerified,
  isActive,
  onClick,
}: UserChatCardProps) {
  const hasUnread = unreadCount != null && unreadCount > 0

  return (
    <button
      type='button'
      className={clsx(styles.card, isActive && styles.cardActive)}
      onClick={onClick}
    >
      <div className={styles.avatar} aria-hidden='true'>
        {avatarUrl ? (
          // TODO: заменить на <Image> когда появятся реальные аватары в API
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatarUrl} alt='' className={styles.avatarImg} />
        ) : (
          name.slice(0, 1)
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{name}</span>
          {isVerified && (
            <StarVerifiedIcon
              aria-label='Верифицированный пользователь'
              width={18}
              height={18}
            />
          )}
        </div>

        {(lastMessage || bookTitle) && (
          <p className={styles.message}>
            {lastMessage && <span>{lastMessage} </span>}
            {bookTitle && <span className={styles.bookTitle}>{bookTitle}</span>}
          </p>
        )}
      </div>

      {timestamp && (
        <span className={styles.time} aria-label={`Время: ${timestamp}`}>
          {timestamp}
        </span>
      )}

      {hasUnread && (
        <span className={styles.badgeWrapper}>
          <CountBadge count={unreadCount!} />
        </span>
      )}
    </button>
  )
}
