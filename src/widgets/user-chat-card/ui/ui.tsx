import clsx from 'clsx'
import styles from './ui.module.scss'

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
            <span
              className={styles.verifiedBadge}
              role='img'
              aria-label='Верифицированный пользователь'
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
        <span
          className={styles.badge}
          aria-label={`${unreadCount} непрочитанных сообщений`}
        >
          {unreadCount}
        </span>
      )}
    </button>
  )
}
