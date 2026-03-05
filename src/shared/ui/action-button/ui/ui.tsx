import clsx from 'clsx'
import Link from 'next/link'
import type { ButtonHTMLAttributes } from 'react'
import styles from './ui.module.scss'

type ActionButtonVariant = 'primary' | 'dangerText'

type ActionButtonProps = {
  children: string
  variant?: ActionButtonVariant
  className?: string
  as?: 'button' | 'link'
  href?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export function ActionButton({
  children,
  variant = 'primary',
  className,
  as = 'button',
  href,
  ...props
}: ActionButtonProps) {
  const buttonClassName = clsx(styles.button, styles[variant], className)

  if (as === 'link') {
    return (
      <Link href={href ?? '#'} className={buttonClassName}>
        {children}
      </Link>
    )
  }

  return (
    <button type='button' className={buttonClassName} {...props}>
      {children}
    </button>
  )
}
