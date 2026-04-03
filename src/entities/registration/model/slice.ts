import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import {
  RegistrationDraft,
  RegistrationDraftPatch,
  RegistrationSchema,
} from './types'

export const fetchRegistrationDraft = createAsyncThunk(
  'registrationDraft/getDraft',
  async () => {
    const response = await axios.get('/api/registration-draft')
    return response.data as RegistrationDraft
  },
)

export const updateRegistrationDraft = createAsyncThunk(
  'registrationDraft/updateDraft',
  async (body: RegistrationDraftPatch) => {
    const response = await axios.patch('/api/registration-draft', body)
    return response.data as RegistrationDraft
  },
)

export const clearRegistrationDraft = createAsyncThunk(
  'registrationDraft/clearDraft',
  async () => {
    await axios.delete('/api/registration-draft')
    return initialState.draft.data
  },
)

export const initialState: RegistrationSchema = {
  draft: {
    data: {
      email: '',
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
