import styles from './input.module.scss'
import { forwardRef, InputHTMLAttributes } from 'react'
import clsx from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'default' | 'error'
  className?: string
}

function InputBase(
  { className, status = 'default', ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <input
      ref={ref}
      className={clsx(
        styles.input,
        {
          [styles.default]: status == 'default',
          [styles.error]: status == 'error',
        },
        className,
      )}
      {...props}
    />
  )
}

export const Input = forwardRef(InputBase)
