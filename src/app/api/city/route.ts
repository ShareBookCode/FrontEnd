import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import https from 'https'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})

export const GET = async (request: NextRequest) => {
  const search = request.nextUrl.searchParams.get('search')?.trim() ?? ''

  const response = await axios.get(`${process.env.BACKEND_URL}/city`, {
    httpsAgent,
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
