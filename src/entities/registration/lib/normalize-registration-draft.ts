import {
  EMPTY_REGISTRATION_DRAFT,
  RegistrationDraft,
  RegistrationDraftPatch,
} from '../model/types'

export const normalizeRegistrationDraft = (
  draft?: RegistrationDraftPatch | null,
): RegistrationDraft => ({
  email: draft?.email ?? EMPTY_REGISTRATION_DRAFT.email,
  name: draft?.name ?? EMPTY_REGISTRATION_DRAFT.name,
  city: draft?.city ?? EMPTY_REGISTRATION_DRAFT.city,
  place: draft?.place ?? EMPTY_REGISTRATION_DRAFT.place,
})
