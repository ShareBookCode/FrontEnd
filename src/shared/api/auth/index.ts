import axios from 'axios'

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

  return response.data
}
