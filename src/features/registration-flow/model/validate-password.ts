import z from 'zod'
import {
  PasswordErrorCode,
  ValidateRegistrationResult,
} from '@/entities/registration'

const passwordSchema = z
  .string()
  .min(8, 'short_password')
  .regex(/[A-Za-z]/, 'weak_password')
  .regex(/\d/, 'weak_password')
  .regex(/[^A-Za-z0-9]/, 'weak_password')

export const validatePassword = (
  password: FormDataEntryValue,
  repeatPassword: FormDataEntryValue,
): ValidateRegistrationResult<PasswordErrorCode> => {
  const result = passwordSchema.safeParse(password)

  if (!result.success) {
    return {
      success: false,
      field: 'password',
      error: result.error.issues[0].message as PasswordErrorCode,
    }
  }

  if (password !== repeatPassword) {
    return {
      success: false,
      field: 'password',
      error: 'password_mismatch',
    }
  }

  return {
    success: true,
  }
}
