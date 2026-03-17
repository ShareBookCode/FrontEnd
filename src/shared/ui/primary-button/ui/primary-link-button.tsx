import clsx from 'clsx'
import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './ui.module.scss'

const sizeClass = {
  small: styles.sizeS,
  medium: styles.sizeM,
  large: styles.sizeL,
} as const

type PrimaryLinkButtonSize = keyof typeof sizeClass

const variantClass = {
  primaryFirst: styles['primary-first'],
  primarySecond: styles['primary-second'],
  primaryThird: styles['primary-third'],
  dangerFirst: styles['danger-first'],
  dangerSecond: styles['danger-second'],
} as const

type PrimaryLinkButtonVariant = keyof typeof variantClass

type PrimaryLinkButtonProps = {
  children: ReactNode
  href: string
  size?: PrimaryLinkButtonSize
  variant?: PrimaryLinkButtonVariant
  disabled?: boolean
  className?: string
}

export function PrimaryLinkButton(props: PrimaryLinkButtonProps) {
  const {
    children,
    href,
    size = 'medium',
    variant = 'primaryFirst',
    disabled,
    className,
  } = props

  const classes = clsx(
    styles.button,
    variantClass[variant],
    sizeClass[size],
    disabled && styles.isDisabled,
    className,
  )

  if (disabled) {
    return (
      <span aria-disabled className={classes}>
        {children}
      </span>
    )
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  )
}
