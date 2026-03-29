import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { ButtonSizes, ButtonVariants } from '../lib/types'

import clsx from 'clsx'
import styles from './ui.module.scss'
import { sizeClass, variantClass } from '../lib/types'

type PrimaryButtonType = 'button' | 'submit'

type PrimaryButtonProps = {
  children: ReactNode
  size?: ButtonSizes
  type?: PrimaryButtonType
  variant?: ButtonVariants
  disabled?: boolean
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function PrimaryButton({
  children,
  size = 'medium',
  variant = 'primaryFirst',
  className,
  type = 'button',
  disabled,
  ...props
}: PrimaryButtonProps) {
  const classes = clsx(
    styles.button,
    sizeClass[size],
    variantClass[variant],
    disabled && styles.isDisabled,
    className,
  )

  return (
    <button type={type} disabled={disabled} className={classes} {...props}>
      {children}
    </button>
  )
}
