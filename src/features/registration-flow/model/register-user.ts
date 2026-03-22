import { RegisterUserPayload } from '@/entities/registration'
import {
  authUser,
  AuthUserPayload,
  createUser,
  CreateUserPayload,
} from '@/shared/api/user'

export const registerUser = async (payload: RegisterUserPayload) => {
  const { email, name, city, place, password } = payload

  const createUserPayload: CreateUserPayload = {
    login: email,
    psw: password,
    name,
    city,
    place,
  }

  const authUserPayload: AuthUserPayload = {
    login: email,
    psw: password,
  }

  await createUser(createUserPayload)
  return await authUser(authUserPayload)
}
