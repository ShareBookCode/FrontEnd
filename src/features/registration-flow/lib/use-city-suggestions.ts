import { useEffect, useRef, useState } from 'react'
import { DEBOUNCE_MS, MIN_CITY_LENGTH } from './types'
import { City, getListCities } from '@shared/api/city'

export const useCitySuggestions = () => {
  const [cities, setCities] = useState<City[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const searchCity = (value: string, onSuccess?: () => void) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (value.length < MIN_CITY_LENGTH) return

    timeoutRef.current = setTimeout(async () => {
      const response = await getListCities({ search: value, lang: 'ru' })
      const results = response.results ?? []

      setCities(results)

      if (results.length > 0) onSuccess?.()
    }, DEBOUNCE_MS)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    cities,
    searchCity,
  }
}
