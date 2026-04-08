import type { RegistrationSchema } from './types'

interface PartialState {
  registration: RegistrationSchema
}

export const selectRegistrationDraftData = (state: PartialState) =>
  state.registration.draft.data
export const selectRegistrationDraftIsLoading = (state: PartialState) =>
  state.registration.draft.isLoading
export const selectRegistrationDraftError = (state: PartialState) =>
  state.registration.draft.error
