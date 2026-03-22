import { RegistrationStep } from '../lib/types'
import { validateCity } from './validate-city'
import { validateEmail } from './validate-email'
import { validateName } from './validate-name'
import { validatePassword } from './validate-password'
import { ValidateRegistrationResult } from '@/entities/registration'

export const validateRegistrationStep = async (
  formData: FormData,
  step: RegistrationStep,
): Promise<ValidateRegistrationResult> => {
  switch (step) {
    case 'email': {
      const email = formData.get('email')?.toString() || ''
      return validateEmail(email)
    }

    case 'name': {
      const name = formData.get('name')?.toString() || ''
      const resultValidationName = validateName(name)

      if (!resultValidationName.success) {
        return resultValidationName
      }

      const city = formData.get('city')?.toString() || ''
      const place = formData.get('place')?.toString() || ''

      return validateCity(city, place)
    }

    case 'password': {
      const password = formData.get('password')?.toString() || ''
      const repeatPassword = formData.get('repeat-password')?.toString() || ''
      return validatePassword(password, repeatPassword)
    }

    default: {
      return { success: true }
    }
  }
}
