'use server'

import axios from 'axios'
import { EmailErrorCode, ValidateRegistrationResult } from '../model/types'

interface UserCheckPayload {
  email: string
}

export const userCheck = async (
  payload: UserCheckPayload,
): Promise<ValidateRegistrationResult<EmailErrorCode>> => {
  try {
    await axios.post(`${process.env.BACKEND_URL}/user/check`, null, {
      params: payload,
      headers: {
        'X-Project-Token': process.env.BACKEND_TOKEN,
        'Content-Type': 'application/json',
        accept: '*/*',
      },
    })

    return { success: true }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status

      if (status === 400 || status === 409) {
        return {
          success: false,
          field: 'email',
          error: 'busy_email',
        }
      }
    }

    console.error('Emaol validation request failed:', error)

    return {
      success: false,
      field: 'email',
      error: 'email_check_failed',
    }
  }
}
