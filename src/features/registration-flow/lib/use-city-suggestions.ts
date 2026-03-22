import { useEffect, useRef, useState } from 'react'
import { Cities, DEBOUNCE_MS, MIN_CITY_LENGTH } from './types'
import { getListCities } from '@/shared/api/city'

export const useCitySuggestions = () => {
  const [cities, setCities] = useState<Cities[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const searchCity = (value: string, onSuccess?: () => void) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    if (value.length < MIN_CITY_LENGTH) return

    timeoutRef.current = setTimeout(async () => {
      const response = await getListCities(value)
      const results: Cities[] = Array.isArray(response.data.results)
        ? response.data.results
        : []

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
