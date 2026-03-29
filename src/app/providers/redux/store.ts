import { configureStore } from '@reduxjs/toolkit'
import { registrationReducer } from '@/entities/registration'
import { bookReducer } from '@entities/book'
import { chatApi } from '@entities/chat'
import { userApi } from '@entities/user'
import { modalReducer } from '@/entities/modal'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    registration: registrationReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(chatApi.middleware, userApi.middleware),
})
