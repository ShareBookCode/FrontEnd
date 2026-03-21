'use client'

import styles from '../RegistrationFlow.module.scss'
import { StepProps } from '../../lib/types'
import axios from 'axios'
import { useState } from 'react'
import { selectRegistrationDraftData } from '@/entities/registration'
import { Input } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useAppSelector, useEnterFocus } from '@/shared/lib/hooks'
import { DropdownList } from '@/shared/ui/dropdown-list'

const TOKEN = '4CVB1p4zuf_z7z-RwLUgyOTQ9vJ1uaQzO3Zs0PAQJWi48UrZPxe4e0uxHS8yPkwD'

const requestCities = async () => {
  const response = await axios.get(
    'https://dev-castapi.ru/api/app/sharebook/city',
    {
      params: {
        search: 'Кимры',
        lang: 'ru',
      },
      headers: {
        'X-Project-Token': TOKEN,
        'Content-Type': 'application/json',
        accept: '*/*',
      },
    },
  )
  console.log(response)
}

// requestCities()

export function NameStep({ status }: StepProps) {
  const draft = useAppSelector(selectRegistrationDraftData)
  const [name, setName] = useState(draft.name)
  const { register, handleKeyDown } = useEnterFocus()

  const isNameError = !status.success && status.field == 'name'
  const isCityError = !status.success && status.field == 'city'

  return (
    <>
      <h1 className={styles.title}>Регистрация через почту</h1>
      <div className={styles.fields}>
        <label htmlFor='name'>
          <Input
            id='name'
            name='name'
            status={isNameError ? 'error' : 'default'}
            ref={register(0)}
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={handleKeyDown(0)}
            placeholder='Имя'
          />
        </label>

        <div className={styles.cityField}>
          <label htmlFor='city'>
            <Input
              id='city'
              name='city'
              status={isCityError ? 'error' : 'default'}
              ref={register(1)}
              defaultValue={draft.city}
              onKeyDown={handleKeyDown(1)}
              placeholder='Город (необязательно)'
              role='comobox'
              aria-autocomplete='list'
              aria-expanded={true}
              aria-controls='city-listbox'
              aria-activedescendant='city-option-1'
            />
          </label>

          <DropdownList
            values={[
              'Нью-Йорк',
              'Нижний Новгород',
              'Новосибирск',
              'Нью-Йорк',
              'Нижний Новгород',
              'Новосибирск',
            ]}
            idList='city-listbox'
            idOption='city-option'
            label='Подсказки городов'
          />
        </div>
      </div>

      <Button type='submit'>Далее</Button>
    </>
  )
}
