import styles from './ui.module.scss'
import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
}

export function Button({ className, ...props }: ButtonProps) {
  return <button className={clsx(styles.button, className)} {...props}></button>
}
