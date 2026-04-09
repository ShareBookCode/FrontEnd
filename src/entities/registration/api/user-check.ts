'use server'

import { EmailErrorCode, ValidateRegistrationResult } from '../model/types'
import { apiClient, ApiError } from '@shared/api/http'
import { USER_CHECK } from '@shared/api/endpoints'

interface UserCheckPayload {
  email: string
}

const EMAIL_CONFLICT_STATUSES = [400, 409] as const

const ERROR_MESSAGES = {
  checkFailed: 'Email validation request failed:',
} as const

export const userCheck = async (
  payload: UserCheckPayload,
): Promise<ValidateRegistrationResult<EmailErrorCode>> => {
  try {
    await apiClient.post(USER_CHECK, null, { params: payload })
    return { success: true }
  } catch (error) {
    if (
      error instanceof ApiError &&
      (EMAIL_CONFLICT_STATUSES as readonly number[]).includes(error.status)
    ) {
      return { success: false, field: 'email', error: 'busy_email' }
    }

    console.error(ERROR_MESSAGES.checkFailed, error)
    return { success: false, field: 'email', error: 'email_check_failed' }
  }
}
