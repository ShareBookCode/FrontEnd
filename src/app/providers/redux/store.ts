import { configureStore } from '@reduxjs/toolkit'
import { modalReducer } from './slices/modal'
import { bookReducer } from '@/entities/book'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    modal: modalReducer,
  },
})
