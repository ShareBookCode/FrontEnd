import axios from 'axios'
import { NextResponse } from 'next/server'

export interface CreateUserPayload {
  login: string
  psw: string
  name: string
  city: string
  place: string
}

export const createUser = async (payload: CreateUserPayload) => {
  try {
    await axios.post(`${process.env.BACKEND_URL}/user`, payload, {
      headers: {
        'X-Project-Token': process.env.BACKEND_TOKEN,
        'Content-Type': 'application/json',
        accept: '*/*',
      },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Backend status:', error.response?.status)
      console.error('Backend data:', error.response?.data)

      return NextResponse.json(
        error.response?.data ?? { message: 'Request failed' },
        { status: error.response?.status ?? 500 },
      )
    }

    console.error(error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
