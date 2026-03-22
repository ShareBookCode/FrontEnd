export { registrationReducer } from './model/slice'
export {
  selectRegistrationDraftData,
  selectRegistrationDraftError,
  selectRegistrationDraftIsLoading,
} from './model/selectors'
export {
  fetchRegistrationDraft,
  updateRegistrationDraft,
  clearRegistrationDraft,
} from './model/slice'
export type {
  RegisterUserPayload,
  RegistrationDraft,
  RegistrationDraftPatch,
  RegistrationSchema,
  RegistrationField,
  EmailErrorCode,
  NameErrorCode,
  CityErrorCode,
  PasswordErrorCode,
  RegistrationErrorCode,
  ValidateRegistrationResult,
} from './model/types'
export { EMPTY_REGISTRATION_DRAFT } from './model/types'
export { normalizeRegistrationDraft } from './lib/normalize-registration-draft'
