import axios from 'axios'

export interface CreateUserPayload {
  login: string
  psw: string
  name: string
  city: string
  place: string
}

export interface AuthUserPayload {
  login: string
  psw: string
}

export const createUser = async (payload: CreateUserPayload) => {
  return await axios.post('/api/user/', payload)
}

export const authUser = async (payload: AuthUserPayload) => {
  return await axios.post('/api/auth/', payload)
}
