import { configureStore } from '@reduxjs/toolkit'
import { bookReducer } from '@/entities/book'
import { registrationReducer } from '@/entities/registration'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    registration: registrationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
