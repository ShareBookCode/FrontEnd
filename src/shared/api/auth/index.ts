import axios from 'axios'
import { cookies } from 'next/headers'

export interface AuthUserPayload {
  login: string
  psw: string
}

export const authUser = async (payload: AuthUserPayload) => {
  const response = await axios.post(`${process.env.BACKEND_URL}/auth`, '', {
    params: payload,
    headers: {
      'X-Project-Token': process.env.BACKEND_TOKEN,
      'Content-Type': 'application/json',
      accept: '*/*',
    },
  })

  const token = response.data.token
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
