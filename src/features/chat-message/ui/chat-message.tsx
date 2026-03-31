import styles from './chat-message.module.scss'

import clsx from 'clsx'
import type { Message } from '@entities/chat'

import { onest } from '@shared/assets/fonts'
import NotificationsIcon from '@shared/assets/icons/notification.svg'
import RetryIcon from '@shared/assets/icons/retry.svg'

interface Props {
  message: Message
  currentUserId: string
}

export function ChatMessage({ message, currentUserId }: Props) {
  const isOwnMessage = message.senderId.id === currentUserId
  const isError = message.status === 'error'
  return (
    <>
      <div
        tabIndex={0}
        className={clsx(
          onest.className,
          styles.wrapper,
          isOwnMessage ? styles.send : styles.received,
          isError && styles.error,
        )}
      >
        <div className={styles.container}>
          {isError && (
            <>
              <span className={styles.errorIcon}>
                <NotificationsIcon />
              </span>
            </>
          )}
          <div className={styles.messageContainer}>
            <p className={styles.message}>{message.text}</p>
            <p className={styles.time}>{message.timestamp}</p>
          </div>
        </div>

        {isError && (
          <button className={styles.retryButton}>
            <RetryIcon />
            <span className={styles.retryButtonText}>Повторить попытку</span>
          </button>
        )}
      </div>
    </>
  )
}
