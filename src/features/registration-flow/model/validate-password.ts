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
  const parsedPassword = passwordSchema.safeParse(password)

  if (!parsedPassword.success) {
    return {
      success: false,
      field: 'password',
      error: parsedPassword.error.issues[0].message as PasswordErrorCode,
    }
  }

  if (password !== repeatPassword) {
    return {
      success: false,
      field: 'repeat-password',
      error: 'password_mismatch',
    }
  }

  return {
    success: true,
  }
}
