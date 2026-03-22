import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import https from 'https'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})

export const POST = async (request: NextRequest) => {
  const email = request.nextUrl.searchParams.get('email')?.trim() ?? ''

  console.log('Email', email)
  try {
    await axios.post(`${process.env.BACKEND_URL}/user/check`, '', {
      httpsAgent,
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
