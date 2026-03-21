import { RegistrationStep } from './types'
import { RegistrationDraftPatch } from '@/entities/registration'

export const getDraftPatchByStep = (
  formData: FormData,
  step: RegistrationStep,
): RegistrationDraftPatch => {
  switch (step) {
    case 'email':
      return {
        email: formData.get('email')?.toString() || '',
      }

    case 'name':
      return {
        name: formData.get('name')?.toString() || '',
        city: formData.get('city')?.toString() || '',
      }

    default:
      return {}
  }
}
