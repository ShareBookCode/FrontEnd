import axios from 'axios'
import { getAuthToken } from '../auth'

export const getUser = async () => {
  const token = await getAuthToken()

  if (token) {
    const user = await axios.get(`${process.env.BACKEND_URL}/user`, {
      headers: {
        'X-Project-Token': process.env.BACKEND_TOKEN,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    })

    return user.data
  }

  return {}
}
