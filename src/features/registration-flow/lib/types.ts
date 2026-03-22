import { ValidateRegistrationResult } from '@/entities/registration'

export const MIN_CITY_LENGTH = 3
export const DEBOUNCE_MS = 400
export const REGISTRATION_STEPS = ['email', 'name', 'password'] as const

export type RegistrationStep = (typeof REGISTRATION_STEPS)[number]

export interface StepProps {
  status: ValidateRegistrationResult
}

export interface Cities {
  city: string
  place: string
}
