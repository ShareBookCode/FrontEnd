'use client'

import { useState } from 'react'
import styles from './LikeButton.module.scss'

interface Props {
  isLiked: boolean
  onToggle: () => void
}

export const LikeButton = ({ isLiked, onToggle }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onToggle()
  }
  return (
    <button onClick={handleClick} className={styles.btn}>
      {isLiked ? '❤️' : '🤍'}
    </button>
  )
}
