'use server'

import axios from 'axios'
import type { CreateBookPayload } from '../model/types'

export const createBookAction = async (payload: CreateBookPayload) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books`, payload)
}
