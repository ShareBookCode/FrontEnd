import z from 'zod'
import axios from 'axios'
import { EmailErrors, RegistrationState } from '../lib/types'

const TOKEN = '4CVB1p4zuf_z7z-RwLUgyOTQ9vJ1uaQzO3Zs0PAQJWi48UrZPxe4e0uxHS8yPkwD'
const emailSchema = z.string().email()

export const validateEmail = async (
  email: FormDataEntryValue,
): Promise<RegistrationState<EmailErrors>> => {
  const result = emailSchema.safeParse(email)

  if (!result.success) {
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
          email: email,
        },
        headers: {
          'X-Project-Token': TOKEN,
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      },
    )

    return { success: true }
  } catch {
    return {
      success: false,
      field: 'email',
      error: 'busy_email',
    }
  }
}
