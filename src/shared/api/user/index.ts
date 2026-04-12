import axios from 'axios'
import { getAuthToken } from '../auth'
import { formatAvatar } from './format-avatar'
import type { UserProfile } from '@entities/user'

export const getUser = async (): Promise<UserProfile | null> => {
  const token = await getAuthToken()

  if (!token) return null

  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/user`, {
      headers: {
        'X-Project-Token': process.env.BACKEND_TOKEN,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    })

    const user = response.data
    return {
      ...user,
      avatar: formatAvatar(user.avatar),
      description: user.description ?? '',
      stats: user.stats ?? { given: 0, exchanged: 0 },
    }
  } catch {
    return null
  }
}

export const getUserById = async (id: string): Promise<UserProfile | null> => {
  const token = await getAuthToken()

  if (!token) return null

  try {
    const response = await axios.get(`${process.env.BACKEND_URL}/user/${id}`, {
      headers: {
        'X-Project-Token': process.env.BACKEND_TOKEN,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    })

    const user = response.data
    return {
      ...user,
      avatar: formatAvatar(user.avatar),
      description: user.description ?? '',
      stats: user.stats ?? { given: 0, exchanged: 0 },
    }
  } catch {
    return null
  }
}
