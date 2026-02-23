import clsx from 'clsx'
import { InputHTMLAttributes, forwardRef } from 'react'
import styles from './input.module.scss'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'medium'
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'default', className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(styles.input, variant === 'medium' && styles.inputMedium, className)}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
