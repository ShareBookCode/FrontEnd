import { configureStore } from '@reduxjs/toolkit'
import { bookReducer } from '@entities/book'
import { chatApi } from '@entities/chat'
import { userApi } from '@entities/user'
import { modalReducer } from './slices/modal'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(chatApi.middleware, userApi.middleware),
})
