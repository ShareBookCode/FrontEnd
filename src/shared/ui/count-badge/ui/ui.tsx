'use client'

import type { CSSProperties } from 'react'

import styles from './ui.module.scss'

type CountBadgeProps = {
  count: number
  color?: string
}

export function CountBadge({ count, color }: CountBadgeProps) {
  const display = count > 99 ? '99+' : count
  return (
    <span
      className={styles.badge}
      aria-label={`${count} непрочитанных сообщений`}
      style={color ? ({ '--badge-color': color } as CSSProperties) : undefined}
    >
      {display}
    </span>
  )
}
