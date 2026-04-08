'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createUser, RegisterUserPayload } from '@/entities/registration'
import { authUser, AuthUserPayload } from '@/shared/api/auth'

export const registerUser = async (payload: RegisterUserPayload) => {
  const authUserPayload: AuthUserPayload = {
    login: payload.login,
    psw: payload.psw,
  }

  await createUser(payload)
  await authUser(authUserPayload)

  revalidatePath('/')
  redirect('/')
}
