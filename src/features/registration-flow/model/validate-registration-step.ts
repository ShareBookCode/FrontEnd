import { RegistrationParams, ValidateRegistrationResult } from '../lib/types'
import { validateEmail } from './validate-email'
import { validateName } from './validate-name'

export const validateRegistrationStep = async (
  params: RegistrationParams,
): Promise<ValidateRegistrationResult> => {
  switch (params.step) {
    case 'email': {
      return validateEmail(params.email)
    }

    case 'name': {
      return validateName(params.name)
    }

    case 'password': {
      return { success: true }
    }

    default: {
      return { success: true }
    }
  }
}
