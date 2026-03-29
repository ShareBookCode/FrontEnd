import z from 'zod'
import {
  EmailErrorCode,
  userCheck,
  ValidateRegistrationResult,
} from '@/entities/registration'

const emailSchema = z.string().email('invalid_email')

export const validateEmail = async (
  email: string,
): Promise<ValidateRegistrationResult<EmailErrorCode>> => {
  const parsedEmail = emailSchema.safeParse(email)

  if (!parsedEmail.success) {
    return {
      success: false,
      field: 'email',
      error: parsedEmail.error.issues[0].message as EmailErrorCode,
    }
  }

  const result = await userCheck({ email: parsedEmail.data })

  if (!result.success) {
    return {
      success: false,
      field: 'email',
      error: result.error,
    }
  }

  return { success: true }
}
