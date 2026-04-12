import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from './types'

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: builder => ({
    getUsers: builder.query<User[], void>({
      query: () => 'users',
    }),
  }),
})

export const { useGetUsersQuery } = userApi
