'use client'

import styles from '../RegistrationFlow.module.scss'
import EyeClosed from '@icons/eye-closed.svg'
import EyeOpened from '@icons/eye-opened.svg'
import { useState } from 'react'
import { InputWithIcon } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useEnterFocus } from '@/shared/lib/hooks'

export function PasswordStep({
  success,
  field,
}: {
  success: boolean
  field: string | undefined
}) {
  const { register, handleKeyDown } = useEnterFocus()
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = (e: MouseEvent) => {
    e.preventDefault()
    setShowPassword(prev => !prev)
  }

  return (
    <>
      <h1 className={styles.title}>Регистрация через почту</h1>
      <div className={styles.fields}>
        <label>
          <InputWithIcon
            status={!success && field == 'password' ? 'error' : 'default'}
            type={showPassword ? 'text' : 'password'}
            ref={register(0)}
            onKeyDown={handleKeyDown(0)}
            placeholder='Пароль'
          >
            {showPassword ? (
              <EyeOpened onClick={toggleShowPassword} />
            ) : (
              <EyeClosed onClick={toggleShowPassword} />
            )}
          </InputWithIcon>
        </label>
        <label>
          <InputWithIcon
            status={
              !success && field == 'repeat-password' ? 'error' : 'default'
            }
            type={showPassword ? 'text' : 'password'}
            ref={register(1)}
            onKeyDown={handleKeyDown(1)}
            placeholder='Повторите пароль'
          >
            {showPassword ? (
              <EyeOpened onClick={toggleShowPassword} />
            ) : (
              <EyeClosed onClick={toggleShowPassword} />
            )}
          </InputWithIcon>
        </label>
      </div>

      <Button type='submit'>Зарегестрироваться</Button>
    </>
  )
}
