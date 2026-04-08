import { REGISTRATION_STEPS, RegistrationStep } from './types'

const DEFAULT_STEP: RegistrationStep = 'email'

export const isRegistrationStep = (
  value: string | null,
): value is RegistrationStep => {
  return REGISTRATION_STEPS.includes(value as RegistrationStep)
}

export const getRegistrationStep = (value: string | null): RegistrationStep => {
  return isRegistrationStep(value) ? value : DEFAULT_STEP
}

export const getNextStep = (
  step: RegistrationStep,
): RegistrationStep | null => {
  const currentIndex = REGISTRATION_STEPS.indexOf(step)

  if (currentIndex === -1 || currentIndex === REGISTRATION_STEPS.length - 1) {
    return null
  }

  return REGISTRATION_STEPS[currentIndex + 1]
}
