import { RegistrationParams, RegistrationState } from '../lib/types'
import { validateEmail } from './validate-email'
import { validateName } from './validate-name'

export const registration = async (
  params: RegistrationParams,
): Promise<RegistrationState> => {
  if (params.step == 'email') {
    const responseValidateEmail = await validateEmail(params.email || '')
    if (!responseValidateEmail.success) {
      return responseValidateEmail
    }
  }

  if (params.step == 'name') {
    const responseValidateName = validateName(params.name || '')
    if (!responseValidateName.success) {
      return responseValidateName
    }
  }

  return {
    success: true,
  }
}
