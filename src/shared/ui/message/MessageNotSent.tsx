import { onest } from '@/shared/fonts'
import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import ReplayIcon from '@mui/icons-material/Replay'
import styles from './MessageNotSent.module.scss'

interface MessageNotSentProps {
  text: string
}

export const MessageNotSent = ({ text }: MessageNotSentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.messageRow}>
        <ErrorOutlineIcon className={styles.errorIcon} />
        <div className={styles.messageCard}>
          <div className={styles.content}>
            <p className={`${styles.text} ${onest.className}`}>
              {text}
            </p>
          </div>
        </div>
      </div>
      
      <div className={styles.retryRow}>
        <ReplayIcon className={styles.retryIcon} />
        <span className={`${styles.retryText} ${onest.className}`}>
          Повторить попытку
        </span>
      </div>
    </div>
  )
}