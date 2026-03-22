import {
  CityErrorCode,
  ValidateRegistrationResult,
} from '@/entities/registration'

export const validateCity = (
  city: string,
  place: string,
): ValidateRegistrationResult<CityErrorCode> => {
  if (place.length === 0) {
    return {
      success: false,
      field: 'city',
      error: 'invalid_city',
    }
  }

  return {
    success: true,
  }
}
