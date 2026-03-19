import { configureStore } from '@reduxjs/toolkit'
import { bookReducer } from '@entities/book'
import { chatApi } from '@entities/chat'
import { userApi, userReducer } from '@entities/user'

export const store = configureStore({
  reducer: {
    book: bookReducer,
    user: userReducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(chatApi.middleware, userApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
