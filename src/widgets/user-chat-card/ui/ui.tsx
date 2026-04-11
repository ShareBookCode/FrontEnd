'use client'

import StarVerifiedIcon from '@icons/star-verified.svg'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import styles from './ui.module.scss'
import { CountBadge } from '@shared/ui/count-badge'

export interface UserChatCardProps {
  name: string
  avatarUrl?: string | null
  author?: string
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
  author,
  bookTitle,
  timestamp,
  unreadCount,
  isVerified,
  isActive,
  onClick,
}: UserChatCardProps) {
  const t = useTranslations('UserChatCard')
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
              aria-label={t('verifiedAriaLabel')}
              width={18}
              height={18}
            />
          )}
        </div>

        {(author || bookTitle) && (
          <div className={styles.meta}>
            {author && <span className={styles.author}>{author}</span>}
            {bookTitle && <span className={styles.bookTitle}>{bookTitle}</span>}
          </div>
        )}
      </div>

      <div className={styles.side}>
        {timestamp && (
          <span
            className={styles.time}
            aria-label={t('timeAriaLabel', { time: timestamp })}
          >
            {timestamp}
          </span>
        )}
        {hasUnread && <CountBadge count={unreadCount!} />}
      </div>
    </button>
  )
}
