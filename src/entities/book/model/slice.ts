import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BookPreview, BookSchema } from './types'

export const fetchBookPreviews = createAsyncThunk(
  'book/fetchBooks',
  async () => {
    const response = await fetch('/api/books/preview')
    if (!response.ok) throw new Error('Failed to fetch')
    return (await response.json()) as BookPreview[]
  },
)

const initialState: BookSchema = {
  data: [],
  isLoading: false,
  error: null,
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBookPreviews.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchBookPreviews.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload
      })
      .addCase(fetchBookPreviews.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Error'
      })
  },
})

export const { reducer: bookReducer } = bookSlice
