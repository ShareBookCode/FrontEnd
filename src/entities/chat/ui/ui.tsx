// this file contains the UserCard component
// it shows a single user in the chat list (like WhatsApp or Telegram sidebar)

import styles from './ui.module.scss'
import { KeyboardEvent } from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import VerifiedIcon from '@/shared/assets/icons/verified.svg'

// these are all the props (inputs) that the UserCard needs to display correctly
// each prop controls a specific part of the card's appearance or content
interface UserCardProps {
  // the URL of the user's profile picture
  avatar: string
  // the display name of the user
  name: string
  // if true, we show a blue checkmark badge next to the name
  isVerified: boolean
  // a short preview of the last message in the conversation
  lastMessage: string
  // when the last message was sent, like "12:30" or "Вчера"
  timestamp: string
  // how many messages the user hasn't read yet
  // we only show the badge when this is more than 0
  unreadCount: number
  // if true, this card is highlighted because the user is viewing this chat
  isActive: boolean
  // optional extra CSS class from the parent component
  className?: string
  // optional click handler so the parent can react when user clicks the card
  onClick?: () => void
}

// the main component — it renders one row in the chat user list
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
  return (
    // the outer wrapper of the card
    // we use clsx to combine multiple class names:
    // - styles.card is always applied (base styles)
    // - styles.active is only applied when isActive is true (highlighted look)
    // - className lets the parent add extra styles if needed
    <div
      className={clsx(styles.card, isActive && styles.active, className)}
      onClick={onClick}
      // this lets keyboard users press Enter or Space to "click" the card
      // without it, only mouse users can interact with the card
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
      role='button'
      tabIndex={0}
    >
      {/* the user's avatar (profile picture) on the left side */}
      <div className={styles.avatarWrapper}>
        <Image
          src={avatar}
          alt={`${name} avatar`}
          width={48}
          height={48}
          className={styles.avatar}
        />
      </div>

      {/* the middle part: user name + last message preview */}
      <div className={styles.content}>
        {/* top row: name and verified badge */}
        <div className={styles.nameRow}>
          {/* the user's display name, truncated if too long */}
          <span className={styles.name}>{name}</span>

          {/* this shows the blue checkmark only if the user is verified */}
          {isVerified && (
            <VerifiedIcon className={styles.verifiedIcon} />
          )}
        </div>

        {/* the last message text, shown below the name */}
        {/* it gets cut off with "..." if it's too long */}
        <p className={styles.lastMessage}>{lastMessage}</p>
      </div>

      {/* the right side: timestamp and unread count badge */}
      <div className={styles.meta}>
        {/* shows when the last message was sent */}
        <span className={styles.timestamp}>{timestamp}</span>

        {/* this shows the unread messages badge only if there are unread messages */}
        {/* if unreadCount is 0, nothing is rendered here */}
        {unreadCount > 0 && (
          <span className={styles.unreadBadge}>{unreadCount}</span>
        )}
      </div>
    </div>
  )
}
