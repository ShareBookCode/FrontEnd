import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const email = request.nextUrl.searchParams.get('email')?.trim() ?? ''

  try {
    await axios.post(`${process.env.BACKEND_URL}/user/check`, '', {
      params: {
        email,
      },
      headers: {
        'X-Project-Token': process.env.BACKEND_TOKEN,
        'Content-Type': 'application/json',
        accept: '*/*',
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: 'Backend request failed' },
        { status: error.response?.status ?? 500 },
      )
    }

    console.error('User check route failed:', error)

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    )
  }
}
