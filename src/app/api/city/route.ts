import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const search = request.nextUrl.searchParams.get('search')?.trim() ?? ''

  const response = await axios.get(`${process.env.BACKEND_URL}/city`, {
    params: {
      search,
      lang: 'ru',
    },
    headers: {
      'X-Project-Token': process.env.BACKEND_TOKEN,
      'Content-Type': 'application/json',
      accept: '*/*',
    },
  })

  return NextResponse.json(response.data)
}
