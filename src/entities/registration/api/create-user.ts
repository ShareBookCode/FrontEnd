'use server'

import { RegisterUserPayload } from '../model/types'
import { apiClient, ApiError } from '@shared/api/http'
import { USER } from '@shared/api/endpoints'

const ERROR_MESSAGES = {
  requestFailed: 'Request failed',
  internalServer: 'Internal server error',
} as const

export const createUser = async (
  payload: RegisterUserPayload,
): Promise<void> => {
  try {
    await apiClient.post(USER, payload)
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message || ERROR_MESSAGES.requestFailed)
    }
    throw new Error(ERROR_MESSAGES.internalServer)
  }
}
