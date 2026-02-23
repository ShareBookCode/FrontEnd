import Link from 'next/link'
import clsx from 'clsx'
import { onest } from '@shared/fonts'
import BackIcon from '@/shared/assets/icons/back.svg'
import styles from './back-button.module.scss'

interface BackButtonProps {
  href: string
  children: React.ReactNode
  ariaLabel?: string
  className?: string
}

export function BackButton({ href, children, ariaLabel, className }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={clsx(styles.link, onest.className, className)}
      aria-label={ariaLabel}
    >
      <BackIcon className={styles.icon} aria-hidden />
      {children}
    </Link>
  )
}
