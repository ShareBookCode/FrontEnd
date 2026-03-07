import { configureStore } from '@reduxjs/toolkit'
import { bookReducer } from '@/entities/book'
import { modalReducer } from '@/entities/modal'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    modal: modalReducer,
  },
})
