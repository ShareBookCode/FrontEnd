'use server'

import axios from 'axios'

export interface GetListCitesPayload {
  search: string
  lang: 'ru' | 'en'
}

export const getListCities = async (payload: GetListCitesPayload) => {
  const response = await axios.get(`${process.env.BACKEND_URL}/city`, {
    params: payload,
    headers: {
      'X-Project-Token': process.env.BACKEND_TOKEN,
      'Content-Type': 'application/json',
      accept: '*/*',
    },
  })

  return response.data
}
