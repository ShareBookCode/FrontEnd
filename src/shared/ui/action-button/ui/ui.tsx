import clsx from 'clsx'
import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './ui.module.scss'

type PrimaryButtonSize = 'small' | 'medium' | 'large'

type BaseProps = {
  children: ReactNode
  size?: PrimaryButtonSize
  className?: string
}

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: 'button'
  }

type LinkProps = BaseProps & {
  as: 'link'
  href: string
  disabled?: boolean
}

type PrimaryButtonProps = ButtonProps | LinkProps

export function PrimaryButton(props: PrimaryButtonProps) {
  const { children, size = 'large', className } = props

  const buttonClassName = clsx(
    styles.button,
    { small: styles.sizeS, medium: styles.sizeM, large: styles.sizeL }[size],
    styles.primary,
    props.disabled && styles.isDisabled,
    className,
  )

  if (props.as === 'link' && props.disabled) {
    return (
      <span className={buttonClassName} aria-disabled='true'>
        {children}
      </span>
    )
  }

  if (props.as === 'link') {
    return (
      <Link href={props.href} className={buttonClassName}>
        {children}
      </Link>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { as: _as, size: _size, ...buttonProps } = props as ButtonProps

  return (
    <button type='button' className={buttonClassName} {...buttonProps}>
      {children}
    </button>
  )
}
