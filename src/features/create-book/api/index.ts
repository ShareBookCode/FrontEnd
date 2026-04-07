'use server'

import axios from 'axios'

export const createBookAction = async (formData: FormData) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/books`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
