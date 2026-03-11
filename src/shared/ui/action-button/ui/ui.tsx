import clsx from 'clsx'
import Link from 'next/link'
import type { ButtonHTMLAttributes } from 'react'
import styles from './ui.module.scss'

type ActionButtonVariant = 'primary' | 'dangerText'
type ActionButtonSize = 's' | 'm' | 'l'

type ActionButtonProps = {
  children: string
  variant?: ActionButtonVariant
  size?: ActionButtonSize
  className?: string
  as?: 'button' | 'link'
  href?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function ActionButton({
  children,
  variant = 'primary',
  size = 'l',
  className,
  as = 'button',
  href,
  ...props
}: ActionButtonProps) {
  const { disabled, ...buttonProps } = props
  const sizeClassName = {
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL,
  }[size]

  const actionButtonClassName = clsx(
    styles.button,
    sizeClassName,
    styles[variant],
    disabled && styles.isDisabled,
    className,
  )

  if (as === 'link' && disabled) {
    return (
      <span className={actionButtonClassName} aria-disabled='true'>
        {children}
      </span>
    )
  }

  if (as === 'link') {
    return (
      <Link href={href ?? '#'} className={actionButtonClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type='button'
      className={actionButtonClassName}
      disabled={disabled}
      {...buttonProps}
    >
      {children}
    </button>
  )
}
