import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'

import { mockUsers } from '@mocks/entities/users'

// TODO: Прописать все ключи по типам

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    getUserById: builder.query<User, string>({
      query: id => `users/${id}`,
    }),
  }),
})

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: mockUsers[0],
  },
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload
    },
  },
})

export const { setCurrentUser } = userSlice.actions
export const userReducer = userSlice.reducer
