'use client'

import styles from '../RegistrationFlow.module.scss'
import { Cities, StepProps } from '../../lib/types'
import axios from 'axios'
import { ChangeEvent, useRef, useState } from 'react'
import { selectRegistrationDraftData } from '@/entities/registration'
import { Input } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useAppSelector, useEnterFocus } from '@/shared/lib/hooks'
import { DropdownList } from '@/shared/ui/dropdown-list'
import { Dropdown } from '@/shared/ui/dropdown'

const TOKEN = '4CVB1p4zuf_z7z-RwLUgyOTQ9vJ1uaQzO3Zs0PAQJWi48UrZPxe4e0uxHS8yPkwD'
const DEBOUNCE_MS = 400

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
  const [cityValue, setCityValue] = useState(draft.city)
  const [placeValue, setPlaceValue] = useState(draft.place)
  const [cities, setCities] = useState<Cities[]>([])
  const { register, handleKeyDown } = useEnterFocus()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const isNameError = !status.success && status.field == 'name'
  const isCityError = !status.success && status.field == 'city'

  const handleChangeCiyValue = (value: string, openList: () => void) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    setPlaceValue('')
    if (value.length < 3) return

    timeoutRef.current = setTimeout(async () => {
      const response = await axios.get(
        'https://dev-castapi.ru/api/app/sharebook/city',
        {
          params: {
            search: value,
            lang: 'ru',
          },
          headers: {
            'X-Project-Token': TOKEN,
            'Content-Type': 'application/json',
            accept: '*/*',
          },
        },
      )

      setCities(response.data.results)
      openList()
    }, DEBOUNCE_MS)
  }

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
            <Dropdown
              renderTrigger={({ isOpen, open }) => (
                <Input
                  id='city'
                  name='city'
                  status={isCityError ? 'error' : 'default'}
                  ref={register(1)}
                  value={cityValue}
                  onChange={e => {
                    setCityValue(e.target.value)
                    handleChangeCiyValue(e.target.value, open)
                  }}
                  onFocus={() => {
                    if (cityValue.length < 3 || placeValue.length > 0) return
                    open()
                  }}
                  onKeyDown={handleKeyDown(1)}
                  placeholder='Город (необязательно)'
                  role='comobox'
                  aria-autocomplete='list'
                  aria-expanded={isOpen}
                  aria-controls='city-listbox'
                  aria-activedescendant='city-option-1'
                />
              )}
            >
              <DropdownList
                values={cities.map(value => {
                  return {
                    primary: value.city,
                    secondary: value.place,
                  }
                })}
                onSelect={value => {
                  setCityValue(value.primary)
                  setPlaceValue(value.secondary || '')
                }}
                idList='city-listbox'
                idOption='city-option'
                label='Подсказки городов'
              />
            </Dropdown>
          </label>
        </div>
      </div>

      <Button type='submit'>Далее</Button>
    </>
  )
}
