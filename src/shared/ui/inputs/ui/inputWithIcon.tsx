import styles from './input.module.scss'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'
import { Input } from './input'

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  status?: 'default' | 'error'
  children: ReactNode
  inputClassName?: string
  containerClassName?: string
}

export function InputWithIconBase(
  {
    inputClassName,
    containerClassName,
    children,
    ...props
  }: InputWithIconProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <label className={clsx(styles.container, containerClassName)}>
      <Input ref={ref} className={inputClassName} {...props} />
      {children}
    </label>
  )
}

export const InputWithIcon = forwardRef(InputWithIconBase)
