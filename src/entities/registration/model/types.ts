export const EMPTY_REGISTRATION_DRAFT: RegistrationDraft = {
  email: '',
  name: '',
  city: '',
  place: '',
}

export interface CreateUserPayload {
  login: string
  psw: string
  name: string
  city: string
  place: string
}

export interface RegisterUserPayload {
  email: string
  name: string
  city: string
  place: string
  password: string
}

export interface RegistrationDraft {
  email: string
  name: string
  city: string
  place: string
}

export type RegistrationDraftPatch = Partial<RegistrationDraft>

export interface RegistrationSchema {
  draft: {
    data: RegistrationDraft
    isLoading: boolean
    error: string | null
  }
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

export type CityErrorCode = 'invalid_city'

export type PasswordErrorCode =
  | 'short_password'
  | 'weak_password'
  | 'password_mismatch'

export type RegistrationErrorCode =
  | EmailErrorCode
  | NameErrorCode
  | PasswordErrorCode
  | CityErrorCode

export type ValidateRegistrationResult<E = RegistrationErrorCode> =
  | { success: true }
  | {
      success: false
      field: RegistrationField
      error: E
    }
