import styles from './ui.module.scss'
import { useState, KeyboardEvent } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import VerifiedIcon from '@/shared/assets/icons/verified.svg'
import DefaultAvatar from '@/shared/assets/icons/default-avatar.svg'

interface UserCardProps {
  avatar?: string | null
  name: string
  isVerified: boolean
  lastMessage: string
  timestamp: string
  unreadCount: number
  isActive: boolean
  className?: string
  onClick?: () => void
}

export function UserCard({
  avatar,
  name,
  isVerified,
  lastMessage,
  timestamp,
  unreadCount,
  isActive,
  className,
  onClick,
}: UserCardProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const showFallback = !avatar || hasImageError

  return (
    <div
      className={clsx(styles.card, isActive && styles.active, className)}
      onClick={onClick}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      role='button'
      tabIndex={0}
    >
      <div className={styles.avatarWrapper}>
        {showFallback ? (
          <DefaultAvatar className={styles.avatar} width={48} height={48} />
        ) : (
          <Image
            src={avatar as string}
            alt={`${name} avatar`}
            width={48}
            height={48}
            className={styles.avatar}
            onError={() => setHasImageError(true)}
          />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.nameRow}>
          <span className={styles.name}>{name}</span>
          {isVerified && <VerifiedIcon className={styles.verifiedIcon} />}
        </div>
        <p className={styles.lastMessage}>{lastMessage}</p>
      </div>

      <div className={styles.meta}>
        <span className={styles.timestamp}>{timestamp}</span>
        {unreadCount > 0 && (
          <span className={styles.unreadBadge}>{unreadCount}</span>
        )}
      </div>
    </div>
  )
}
