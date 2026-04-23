import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  RegistrationDraft,
  RegistrationDraftPatch,
  RegistrationSchema,
} from './types'

const DRAFT_URL = '/api/registration-draft'

export const fetchRegistrationDraft = createAsyncThunk(
  'registrationDraft/getDraft',
  async () => {
    const response = await fetch(DRAFT_URL)
    if (!response.ok) throw new Error('Failed to fetch draft')
    return response.json() as Promise<RegistrationDraft>
  },
)

export const updateRegistrationDraft = createAsyncThunk(
  'registrationDraft/updateDraft',
  async (body: RegistrationDraftPatch) => {
    const response = await fetch(DRAFT_URL, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!response.ok) throw new Error('Failed to update draft')
    return response.json() as Promise<RegistrationDraft>
  },
)

export const clearRegistrationDraft = createAsyncThunk(
  'registrationDraft/clearDraft',
  async () => {
    const response = await fetch(DRAFT_URL, { method: 'DELETE' })
    if (!response.ok) throw new Error('Failed to clear draft')
    return initialState.draft.data
  },
)

export const initialState: RegistrationSchema = {
  draft: {
    data: {
      login: '',
      name: '',
      city: '',
      place: '',
    },
    isLoading: false,
    error: null,
  },
}

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchRegistrationDraft.pending, state => {
        state.draft.isLoading = true
        state.draft.error = null
      })
      .addCase(fetchRegistrationDraft.fulfilled, (state, action) => {
        state.draft.isLoading = false
        state.draft.data = action.payload
      })
      .addCase(fetchRegistrationDraft.rejected, (state, action) => {
        state.draft.isLoading = false
        state.draft.error = action.error.message || 'Error'
      })

      .addCase(updateRegistrationDraft.pending, state => {
        state.draft.isLoading = true
        state.draft.error = null
      })
      .addCase(updateRegistrationDraft.fulfilled, (state, action) => {
        state.draft.isLoading = false
        state.draft.data = action.payload
      })
      .addCase(updateRegistrationDraft.rejected, (state, action) => {
        state.draft.isLoading = false
        state.draft.error = action.error.message || 'Error'
      })

      .addCase(clearRegistrationDraft.pending, state => {
        state.draft.isLoading = true
        state.draft.error = null
      })
      .addCase(clearRegistrationDraft.fulfilled, (state, action) => {
        state.draft.isLoading = false
        state.draft.data = action.payload
      })
      .addCase(clearRegistrationDraft.rejected, (state, action) => {
        state.draft.isLoading = false
        state.draft.error = action.error.message || 'Error'
      })
  },
})

export const registrationReducer = registrationSlice.reducer
