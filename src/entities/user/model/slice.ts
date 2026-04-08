import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User, UserProfile } from './types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    getCurrentUser: builder.query<UserProfile, void>({
      query: () => 'user',
    }),
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
    getUserById: builder.query<User, string>({
      query: id => `users/${id}`,
    }),
  }),
})

export const {
  useGetCurrentUserQuery,
  useGetUsersQuery,
  useGetUserByIdQuery,
} = userApi
