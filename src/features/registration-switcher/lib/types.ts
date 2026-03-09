export const REGISTRATION_STEPS = ['email', 'name', 'password'] as const

export type RegistrationStep = (typeof REGISTRATION_STEPS)[number]

export interface RegistrationParams {
  step: string
  email: string
  name: string
  city: string
}

export type RegistrationField =
  | 'email'
  | 'name'
  | 'password'
  | 'city'
  | 'repeat-password'

export type EmailErrorCode =
  | 'invalid_email'
  | 'busy_email'
  | 'email_check_failed'

export type NameErrorCode = 'short_name' | 'long_name' | 'invalid_name'

export type RegistrationErrorCode = EmailErrorCode | NameErrorCode

export type RegistrationResult<E = RegistrationErrorCode> =
  | { success: true }
  | {
      success: false
      field: RegistrationField
      error: E
    }
