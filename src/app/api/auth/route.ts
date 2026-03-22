import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
import https from 'https'

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
})

export const POST = async (request: NextRequest) => {
  const body = await request.json()

  const response = await axios.post(`${process.env.BACKEND_URL}/auth`, body, {
    httpsAgent,
    headers: {
      'X-Project-Token': process.env.BACKEND_TOKEN,
      'Content-Type': 'application/json',
      accept: '*/*',
    },
  })

  return NextResponse.json(response.data)
}
