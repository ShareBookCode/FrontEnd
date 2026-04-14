'use server'

import { apiClient } from '../http'
import { CITY } from '../endpoints'
import { Locale } from '@shared/config/i18n/i18n'

export interface GetListCitesPayload {
  search: string
  lang: Locale
}

export interface CityResponse {
  results: City[]
}

export interface City {
  city: string
  place: string
}

export const getListCities = async (
  payload: GetListCitesPayload,
): Promise<CityResponse> => {
  return apiClient.get<CityResponse>(CITY, { params: payload })
}
