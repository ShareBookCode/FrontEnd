import { getRegistrationStep } from './steps'
import { RegistrationParams } from './types'

type SearchParamsLike = {
  get(name: string): string | null
}

export const getRegistrationParams = (
  searchParams: SearchParamsLike,
): RegistrationParams => {
  return {
    step: getRegistrationStep(searchParams.get('step')),
    email: searchParams.get('email') ?? '',
    name: searchParams.get('name') ?? '',
    city: searchParams.get('city') ?? '',
  }
}
