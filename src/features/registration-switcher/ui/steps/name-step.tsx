'use client'

import styles from '../RegistrationFlow.module.scss'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useEnterFocus, useUpdateSearchParam } from '@/shared/lib/hooks'

export function NameStep({
  success,
  field,
}: {
  success: boolean
  field: string | undefined
}) {
  const searchParams = useSearchParams()
  const updateParam = useUpdateSearchParam()
  const { register, handleKeyDown } = useEnterFocus()
  const [name, setName] = useState(searchParams.get('name') || '')
  const [city, setCity] = useState(searchParams.get('city') || '')

  return (
    <>
      <h1 className={styles.title}>Регистрация через почту</h1>
      <div className={styles.fields}>
        <label>
          <Input
            id='name'
            status={!success && field == 'name' ? 'error' : 'default'}
            ref={register(0)}
            value={name}
            onChange={e => {
              updateParam('name', e.target.value)
              setName(e.target.value)
            }}
            onKeyDown={handleKeyDown(0)}
            placeholder='Имя'
          />
        </label>
        <label>
          <Input
            id='city'
            status={!success && field == 'city' ? 'error' : 'default'}
            ref={register(1)}
            value={city}
            onChange={e => {
              updateParam('city', e.target.value)
              setCity(e.target.value)
            }}
            onKeyDown={handleKeyDown(1)}
            placeholder='Город (необязательно)'
          />
        </label>
      </div>

      <Button type='submit'>Далее</Button>
    </>
  )
}
