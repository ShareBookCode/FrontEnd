import { http, HttpResponse } from 'msw'
import { City } from '@shared/api/city'

const mockCities: (City & { cityEn: string })[] = [
  { city: 'Москва', place: 'Россия', cityEn: 'Moscow' },
  { city: 'Санкт-Петербург', place: 'Россия', cityEn: 'Saint Petersburg' },
  { city: 'Новосибирск', place: 'Россия', cityEn: 'Novosibirsk' },
  { city: 'Екатеринбург', place: 'Россия', cityEn: 'Yekaterinburg' },
  { city: 'Казань', place: 'Россия', cityEn: 'Kazan' },
]

export const cityHandlers = [
  http.get('/city', ({ request }) => {
    const url = new URL(request.url)
    const search = url.searchParams.get('search')?.toLowerCase() ?? ''
    const lang = url.searchParams.get('lang') ?? 'ru'
    const filtered = mockCities.filter(({ city, cityEn }) => {
      const name = lang === 'en' ? cityEn : city
      return name.toLowerCase().includes(search)
    })
    return HttpResponse.json({
      results: filtered.map(({ city, place }) => ({ city, place })),
    })
  }),
]
