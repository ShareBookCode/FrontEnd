import type { ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import styles from './ui.module.scss'

const sizeClass = {
  small: styles.sizeS,
  medium: styles.sizeM,
  large: styles.sizeL,
} as const

type PrimaryButtonSize = keyof typeof sizeClass

type PrimaryButtonType = 'button' | 'submit'

const variantClass = {
  primaryFirst: styles['primary-first'],
  primarySecond: styles['primary-second'],
  primaryThird: styles['primary-third'],
  dangerFirst: styles['danger-first'],
  dangerSecond: styles['danger-second'],
} as const

type PrimaryButtonVariant = keyof typeof variantClass

type PrimaryButtonProps = {
  children: ReactNode
  size?: PrimaryButtonSize
  type?: PrimaryButtonType
  variant?: PrimaryButtonVariant
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
