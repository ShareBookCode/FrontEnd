import { getAuthToken } from '../auth/get-auth-token'
import { apiClient } from '../http'
import { USER } from '../endpoints'
import { formatAvatar, type UserProfile } from '@entities/user'

export const getUser = async (): Promise<UserProfile | null> => {
  const token = await getAuthToken()
  if (!token) return null
  try {
    const user = await apiClient.get<UserProfile>(USER)
    return { ...user, avatar: formatAvatar(user.avatar) }
  } catch {
    return null
  }
}

export const getUserById = async (id: string): Promise<UserProfile | null> => {
  const token = await getAuthToken()
  if (!token) return null
  try {
    const user = await apiClient.get<UserProfile>(`${USER}/${id}`)
    return { ...user, avatar: formatAvatar(user.avatar) }
  } catch {
    return null
  }
}
