import z from 'zod'
import axios from 'axios'
import { EmailErrorCode, RegistrationResult } from '../lib/types'

const TOKEN = '4CVB1p4zuf_z7z-RwLUgyOTQ9vJ1uaQzO3Zs0PAQJWi48UrZPxe4e0uxHS8yPkwD'
const emailSchema = z.string().email()

export const validateEmail = async (
  email: FormDataEntryValue,
): Promise<RegistrationResult<EmailErrorCode>> => {
  const parsedEmail = emailSchema.safeParse(email)

  if (!parsedEmail.success) {
    return {
      success: false,
      field: 'email',
      error: 'invalid_email',
    }
  }

  try {
    await axios.post(
      'https://dev-castapi.ru/api/app/sharebook/user/check',
      '',
      {
        params: {
          email: parsedEmail.data,
        },
        headers: {
          'X-Project-Token': TOKEN,
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      },
    )

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
