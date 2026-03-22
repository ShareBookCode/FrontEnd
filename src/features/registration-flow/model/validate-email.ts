import z from 'zod'
import axios from 'axios'
import {
  EmailErrorCode,
  ValidateRegistrationResult,
} from '@/entities/registration'

const emailSchema = z.string().email()

export const validateEmail = async (
  email: string,
): Promise<ValidateRegistrationResult<EmailErrorCode>> => {
  const parsedEmail = emailSchema.safeParse(email)

  if (!parsedEmail.success) {
    return {
      success: false,
      field: 'email',
      error: 'invalid_email',
    }
  }

  try {
    await axios.post(`/api/user/check`, null, {
      params: {
        email: parsedEmail.data,
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
