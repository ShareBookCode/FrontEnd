import z from 'zod'
import { NameErrors, RegistrationState } from '../lib/types'

const nameSchema = z
  .string()
  .trim()
  .min(2, 'short_name')
  .max(50, 'long_name')
  .regex(/^[\p{L}\s'-]+$/u, 'invalid_name')

export const validateName = (
  name: FormDataEntryValue,
): RegistrationState<NameErrors> => {
  const result = nameSchema.safeParse(name)

  if (!result.success) {
    return {
      success: false,
      field: 'name',
      error: result.error.issues[0].message as NameErrors,
    }
  }

  return {
    success: true,
  }
}
