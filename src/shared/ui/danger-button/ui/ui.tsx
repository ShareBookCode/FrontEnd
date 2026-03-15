import type { ButtonHTMLAttributes } from 'react'
import styles from './ui.module.scss'

type DangerButtonProps = {
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export function DangerButton({ children, ...props }: DangerButtonProps) {
  return (
    <button type='button' className={styles.button} {...props}>
      {children}
    </button>
  )
}
