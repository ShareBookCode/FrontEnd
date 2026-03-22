'use client'

import styles from '../RegistrationFlow.module.scss'
import EyeClosed from '@icons/eye-closed.svg'
import EyeOpened from '@icons/eye-opened.svg'
import { useState } from 'react'
import { StepProps } from '../../lib/types'
import { InputWithIcon } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useEnterFocus } from '@/shared/lib/hooks'

export function PasswordStep({ status }: StepProps) {
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  const { register, handleKeyDown } = useEnterFocus()
  const [showPassword, setShowPassword] = useState(false)

  const isPasswordError = !status.success && status.field == 'password'
  const isRepeatPasswordError =
    !status.success && status.field == 'repeat-password'

  const toggleShowPassword = (e: MouseEvent) => {
    e.preventDefault()
    setShowPassword(prev => !prev)
  }

  return (
    <>
      <h1 className={styles.title}>Регистрация через почту</h1>
      <div className={styles.fields}>
        <label htmlFor='password'>
          <InputWithIcon
            id='password'
            name='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            status={isPasswordError ? 'error' : 'default'}
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
        <label htmlFor='repeat-password'>
          <InputWithIcon
            id='repeat-password'
            name='repeat-password'
            value={repeatPassword}
            onChange={e => setRepeatPassword(e.target.value)}
            status={isRepeatPasswordError ? 'error' : 'default'}
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
