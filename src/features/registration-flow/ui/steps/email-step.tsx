'use client'

import Link from 'next/link'
import styles from '../RegistrationFlow.module.scss'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { useState } from 'react'
import { StepProps } from '../../lib/types'
import { Input } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useUpdateSearchParam } from '@/shared/lib/hooks'

export function EmailStep({ status }: StepProps) {
  const searchParams = useSearchParams()
  const updateParam = useUpdateSearchParam()
  const [email, setEmail] = useState(searchParams.get('email') || '')

  const isEmailError = !status.success && status.field == 'email'

  return (
    <>
      <h1 className={clsx(styles.title, styles.titleAboutShareBook)}>
        Станьте частью <span>ShareBook.</span> Отдавайте. Меняйтесь.
        <span>Читайте.</span>
      </h1>
      <label>
        <Input
          id='email'
          status={isEmailError ? 'error' : 'default'}
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          onBlur={() => updateParam('email', email)}
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
