'use server'

import axios from 'axios'

export const createBookAction = async (formData: FormData) => {
  return axios.post('/books', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}
