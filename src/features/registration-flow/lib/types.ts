import { ValidateRegistrationResult } from '@/entities/registration'

export const REGISTRATION_STEPS = ['email', 'name', 'password'] as const

export type RegistrationStep = (typeof REGISTRATION_STEPS)[number]

export interface StepProps {
  status: ValidateRegistrationResult
}

export interface Cities {
  city: string
  place: string
}
