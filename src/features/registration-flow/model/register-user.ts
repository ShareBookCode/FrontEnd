'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { RegisterUserPayload } from '@/entities/registration'
import { createUser, CreateUserPayload } from '@/shared/api/user'
import { authUser, AuthUserPayload } from '@/shared/api/auth'

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
  await authUser(authUserPayload)

  revalidatePath('/')
  redirect('/')
}
