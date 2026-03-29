import styles from './chat-message.module.scss'

import clsx from 'clsx'

import { onest } from '@shared/assets/fonts'
import type { MessageData } from '@shared/lib/types/chat'
import NotificationsIcon from '@shared/assets/icons/notification.svg'
import RetryIcon from '@shared/assets/icons/retry.svg'

interface Props {
  message: MessageData
  currentUserId: string
}

export function ChatMessage({ message, currentUserId }: Props) {
  const isOwnMessage = message.senderId === currentUserId
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
            <p className={styles.message}>{message.message}</p>
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
