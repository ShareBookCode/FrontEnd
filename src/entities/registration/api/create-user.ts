import axios from 'axios'
import { RegisterUserPayload } from '../model/types'

export const createUser = async (
  payload: RegisterUserPayload,
): Promise<void> => {
  try {
    await axios.post(`${process.env.BACKEND_URL}/user`, payload, {
      headers: {
        'X-Project-Token': process.env.BACKEND_TOKEN,
        'Content-Type': 'application/json',
        accept: '*/*',
      },
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Backend status:', error.response?.status)
      console.error('Backend data:', error.response?.data)

      throw new Error(error.response?.data?.message || 'Request failed')
    }

    console.error(error)
    throw new Error('Internal server error')
  }
}
