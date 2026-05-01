import { cookies } from 'next/headers'
import { apiClient, ParamsType } from '../http'
import { AUTH } from '../endpoints'

export { getAuthToken } from './get-auth-token'

export interface AuthUserPayload extends ParamsType {
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
