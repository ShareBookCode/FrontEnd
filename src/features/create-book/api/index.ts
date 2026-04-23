'use server'

import type { CreateBookPayload } from '../model/types'
import { apiClient } from '@shared/api/http'
import { BOOKS } from '@shared/api/endpoints'

export const createBookAction = async (payload: CreateBookPayload) => {
  return apiClient.post(BOOKS, payload)
}
