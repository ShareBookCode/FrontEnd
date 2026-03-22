import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const body = await request.json()

  console.log('Hello', body, process.env.BACKEND_URL)
  try {
    await axios.post(`${process.env.BACKEND_URL}/user`, body, {
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
