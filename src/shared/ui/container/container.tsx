import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './ui.module.scss'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return <div className={clsx(styles.container, className)}>{children}</div>
}
