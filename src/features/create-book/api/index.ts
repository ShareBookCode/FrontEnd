'use server'

import type { CreateBookPayload } from '../model/types'
import { apiClient } from '@shared/api/http'
import { BOOKS, PIC } from '@shared/api/endpoints'
import { getAuthToken } from '@shared/api/auth'

const uploadImage = async (file: File): Promise<string> => {
  const base = (
    process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost'
  ).replace(/\/$/, '')

  const formData = new FormData()
  formData.append('file', file)

  const token = await getAuthToken()
  const headers = new Headers({
    'X-Project-Token': process.env.NEXT_PUBLIC_BACKEND_TOKEN ?? '',
  })
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(`${base}${PIC}`, {
    method: 'POST',
    headers,
    body: formData,
  })

  if (!response.ok) {
    throw new Error(`Failed to upload image: ${response.status}`)
  }

  const { id } = (await response.json()) as { id: string }
  return id
}

export const uploadThumbnails = async (
  cover: File | null,
  photos: File[],
): Promise<string[]> => {
  const files = [...(cover ? [cover] : []), ...photos]
  if (files.length === 0) return []
  return Promise.all(files.map(uploadImage))
}

export const createBookAction = async (payload: CreateBookPayload) => {
  return apiClient.post(BOOKS, payload)
}
