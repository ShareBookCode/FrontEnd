'use client'

import styles from '../RegistrationFlow.module.scss'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { StepProps } from '../../lib/types'
import { Input } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useEnterFocus, useUpdateSearchParam } from '@/shared/lib/hooks'

export function NameStep({ status }: StepProps) {
  const searchParams = useSearchParams()
  const updateParam = useUpdateSearchParam()
  const { register, handleKeyDown } = useEnterFocus()
  const [name, setName] = useState(searchParams.get('name') || '')
  const [city, setCity] = useState(searchParams.get('city') || '')

  const isNameError = !status.success && status.field == 'name'
  const isCityError = !status.success && status.field == 'city'

  return (
    <>
      <h1 className={styles.title}>Регистрация через почту</h1>
      <div className={styles.fields}>
        <label>
          <Input
            id='name'
            status={isNameError ? 'error' : 'default'}
            ref={register(0)}
            value={name}
            onChange={e => setName(e.target.value)}
            onBlur={() => updateParam('name', name)}
            onKeyDown={handleKeyDown(0)}
            placeholder='Имя'
          />
        </label>
        <label>
          <Input
            id='city'
            status={isCityError ? 'error' : 'default'}
            ref={register(1)}
            value={city}
            onChange={e => setCity(e.target.value)}
            onBlur={() => updateParam('city', city)}
            onKeyDown={handleKeyDown(1)}
            placeholder='Город (необязательно)'
          />
        </label>
      </div>

      <Button type='submit'>Далее</Button>
    </>
  )
}
