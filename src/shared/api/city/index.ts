'use server'

import { apiClient } from '../http'
import { CITY } from '../endpoints'

export interface GetListCitesPayload {
  search: string
  lang: 'ru' | 'en'
}

export const getListCities = async (payload: GetListCitesPayload) => {
  return apiClient.get<GetListCitesPayload>(CITY, { params: payload })
}
