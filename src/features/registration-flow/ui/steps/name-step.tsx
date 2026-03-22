'use client'

import styles from '../RegistrationFlow.module.scss'
import { MIN_CITY_LENGTH, StepProps } from '../../lib/types'
import { useState } from 'react'
import { useCitySuggestions } from '../../lib/use-city-suggestions'
import { selectRegistrationDraftData } from '@/entities/registration'
import { Input } from '@/shared/ui/inputs'
import { Button } from '@/shared/ui/button'
import { useAppSelector, useEnterFocus } from '@/shared/lib/hooks'
import { DropdownList } from '@/shared/ui/dropdown-list'
import { Dropdown } from '@/shared/ui/dropdown'

export function NameStep({ status }: StepProps) {
  const draft = useAppSelector(selectRegistrationDraftData)

  const [name, setName] = useState(draft.name)
  const [cityValue, setCityValue] = useState(draft.city)
  const [placeValue, setPlaceValue] = useState(draft.place)

  const { register, handleKeyDown } = useEnterFocus()
  const { cities, searchCity } = useCitySuggestions()

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

        <div>
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
                    searchCity(e.target.value, open)
                    setCityValue(e.target.value)
                    setPlaceValue('')
                  }}
                  onFocus={() => {
                    if (
                      cityValue.length < MIN_CITY_LENGTH ||
                      placeValue.length > 0
                    )
                      return
                    open()
                  }}
                  onKeyDown={handleKeyDown(1)}
                  placeholder='Город (необязательно)'
                  role='combobox'
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

          <label htmlFor='place'>
            <input
              id='place'
              name='place'
              value={placeValue}
              type='hidden'
              readOnly
            />
          </label>
        </div>
      </div>

      <Button type='submit'>Далее</Button>
    </>
  )
}
