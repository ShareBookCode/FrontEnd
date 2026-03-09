'use client'

import Link from 'next/link'
import styles from '../RegistrationFlow.module.scss'
import { useSearchParams } from 'next/navigation'
import clsx from 'clsx'
import { Input } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useUpdateSearchParam } from '@/shared/lib/hooks'
import { useState } from 'react'

export function EmailStep({ success }: { success: boolean }) {
  const searchParams = useSearchParams()
  const updateParam = useUpdateSearchParam()
  const [email, setEmail] = useState(searchParams.get('email') || '')

  return (
    <>
      <h1 className={clsx(styles.title, styles.titleAboutShareBook)}>
        Станьте частью <span>ShareBook.</span> Отдавайте. Меняйтесь.
        <span>Читайте.</span>
      </h1>
      <label>
        <Input
          id='email'
          status={success ? 'default' : 'error'}
          name='email'
          type='email'
          value={email}
          onChange={e => {
            updateParam('email', e.target.value, 'replace')
            setEmail(e.target.value)
          }}
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
