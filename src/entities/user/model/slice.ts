import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { User } from './types'

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
