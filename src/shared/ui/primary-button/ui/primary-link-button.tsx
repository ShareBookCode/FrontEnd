import type { ButtonSizes, ButtonVariants } from '../lib/types'

import clsx from 'clsx'
import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './ui.module.scss'
import { sizeClass, variantClass } from '../lib/types'

type PrimaryLinkButtonProps = {
  children: ReactNode
  href: string
  size?: ButtonSizes
  variant?: ButtonVariants
  disabled?: boolean
  className?: string
}

export function PrimaryLinkButton({
  children,
  href,
  size = 'medium',
  variant = 'primaryFirst',
  disabled,
  className,
}: PrimaryLinkButtonProps) {
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
