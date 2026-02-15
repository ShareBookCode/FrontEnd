import { onest } from '@/shared/fonts'
import React from 'react'
import styles from './MessageGet.module.scss'

interface MessageGetProps {
  text: string
  time: string
}

export const MessageGet = ({ text, time }: MessageGetProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.messageCard}>
        <div className={styles.content}>
          <p className={`${styles.text} ${onest.className}`}>
            {text}
          </p>
          {time && (
            <span className={`${styles.time} ${onest.className}`}>
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}