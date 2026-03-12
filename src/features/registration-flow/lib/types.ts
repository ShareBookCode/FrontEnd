export const REGISTRATION_STEPS = ['email', 'name', 'password'] as const

export type RegistrationStep = (typeof REGISTRATION_STEPS)[number]

export interface RegistrationParams {
  step: RegistrationStep
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

export type PasswordErrorCode =
  | 'short_password'
  | 'weak_password'
  | 'password_mismatch'

export type RegistrationErrorCode =
  | EmailErrorCode
  | NameErrorCode
  | PasswordErrorCode

export type ValidateRegistrationResult<E = RegistrationErrorCode> =
  | { success: true }
  | {
      success: false
      field: RegistrationField
      error: E
    }

export interface StepProps {
  status: ValidateRegistrationResult
}
