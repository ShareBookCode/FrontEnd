import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { DefaultUser as User } from '@shared/lib/types'

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
