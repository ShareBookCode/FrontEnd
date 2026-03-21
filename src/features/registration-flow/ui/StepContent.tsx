import { EmailStep } from './steps/email-step'
import { NameStep } from './steps/name-step'
import { PasswordStep } from './steps/password-step'
import { RegistrationStep } from '../lib/types'
import { ValidateRegistrationResult } from '@/entities/registration'

interface StepContentProps {
  step: RegistrationStep
  status: ValidateRegistrationResult
}

export function StepContent({ step, status }: StepContentProps) {
  switch (step) {
    case 'email':
      return <EmailStep status={status} />

    case 'name':
      return <NameStep status={status} />

    case 'password':
      return <PasswordStep status={status} />

    default:
      return null
  }
}
