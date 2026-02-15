import { onest } from '@/shared/fonts'
import React from 'react'
import styles from './MessageSent.module.scss'

interface MessageSentProps {
  text: string
  time: string
}

export const MessageSent = ({ text, time }: MessageSentProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.content}>
          <p className={`${styles.messageText} ${onest.className}`}>
            {text}
          </p>
          {time && (
            <span className={`${styles.timeText} ${onest.className}`}>
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}