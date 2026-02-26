import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import type { Category, BookPreview, Book, BookSchema } from './types'

export const fetchBooksCatalog = createAsyncThunk(
  'book/fetchCatalog',
  async () => {
    const response = await fetch('/api/books/preview')
    if (!response.ok) throw new Error('Failed to fetch catalog')
    return (await response.json()) as BookPreview[]
  },
)

export const fetchBookById = createAsyncThunk(
  'book/fetchById',
  async (id: string) => {
    const response = await fetch(`/api/books/${id}`)
    if (!response.ok) throw new Error('Failed to fetch book details')
    return (await response.json()) as Book
  },
)

export const initialState: BookSchema = {
  catalog: {
    entities: [],
    isLoading: false,
    error: null,
    filters: {
      category: 'All',
      filterType: 'all',
    },
  },
  details: {
    data: null,
    isLoading: false,
    error: null,
  },
}

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.catalog.filters.category = action.payload
    },
    clearDetails: state => {
      state.details.data = null
      state.details.error = null
    },
  },
  extraReducers: builder => {
    builder
      // Кейсы для каталога
      .addCase(fetchBooksCatalog.pending, state => {
        state.catalog.isLoading = true
        state.catalog.error = null
      })
      .addCase(fetchBooksCatalog.fulfilled, (state, action) => {
        state.catalog.isLoading = false
        state.catalog.entities = action.payload
      })
      .addCase(fetchBooksCatalog.rejected, (state, action) => {
        state.catalog.isLoading = false
        state.catalog.error = action.error.message || 'Error'
      })

      // Кейсы для деталей
      .addCase(fetchBookById.pending, state => {
        state.details.isLoading = true
        state.details.error = null
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.details.isLoading = false
        state.details.data = action.payload
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.details.isLoading = false
        state.details.error = action.error.message || 'Error'
      })
  },
})

export const { reducer: bookReducer } = bookSlice
export const { setCategory, clearDetails } = bookSlice.actions
