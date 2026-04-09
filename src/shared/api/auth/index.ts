import { cookies } from 'next/headers'
import { apiClient } from '../http'
import { AUTH } from '../endpoints'

export interface AuthUserPayload {
  login: string
  psw: string
}

export const authUser = async (payload: AuthUserPayload) => {
  const { token } = await apiClient.post<{ token: string }>(AUTH, '', {
    params: payload,
  })
  const cookieStore = await cookies()

  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export const getAuthToken = async () => {
  const cookieStore = await cookies()
  return cookieStore.get('auth_token')?.value
}
