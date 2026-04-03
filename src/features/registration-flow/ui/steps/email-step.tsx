'use client'

import Link from 'next/link'
import styles from '../RegistrationFlow.module.scss'
import clsx from 'clsx'
import { StepProps } from '../../lib/types'
import { useState } from 'react'
import { selectRegistrationDraftData } from '@/entities/registration'
import { Input } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useAppSelector } from '@/shared/lib/hooks'

export function EmailStep({ status }: StepProps) {
  const draft = useAppSelector(selectRegistrationDraftData)
  const [email, setEmail] = useState(draft.login)
  const isEmailError = !status.success && status.field == 'email'

  return (
    <>
      <h1 className={clsx(styles.title, styles.titleAboutShareBook)}>
        Станьте частью <span>ShareBook.</span> Отдавайте. Меняйтесь.
        <span>Читайте.</span>
      </h1>
      <label htmlFor='email'>
        <Input
          id='email'
          status={isEmailError ? 'error' : 'default'}
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Почта'
        />
      </label>
      <Button type='submit'>Далее</Button>
      <p className={styles.linkToSignIn}>
        Уже есть аккаунт? <Link href='/sign-in'>Войти</Link>
      </p>
    </>
  )
}
