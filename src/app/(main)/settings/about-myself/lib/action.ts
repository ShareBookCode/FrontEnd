// app/settings/actions.ts
'use server'

import axios from 'axios'

export interface SubmitProfileData {
  name: string
  description: string
  avatarFile?: File | null
  city?: string
}

export async function submitProfile(
  token: string,
  data: SubmitProfileData,
): Promise<{ error?: string; success?: boolean; avatarId?: string }> {
  console.log('я зашел', data)
  const backendUrl = process.env.BACKEND_URL
  const backendToken = process.env.BACKEND_TOKEN

  let uploadedAvatarId: string | undefined

  if (data.avatarFile && data.avatarFile.size > 0) {
    console.log('Загрузка аватара:', data.avatarFile.name)

    const uploadFormData = new FormData()
    uploadFormData.append('file', data.avatarFile)

    try {
      const response = await axios.post(`${backendUrl}/pic`, uploadFormData, {
        headers: {
          'X-Project-Token': backendToken,
          Authorization: `Bearer ${token}`,
        },
        timeout: 30000,
      })

      console.log('Ответ бэкенда:', response.data)

      uploadedAvatarId = response.data.id
    } catch (uploadError: any) {
      console.error(
        'Ошибка загрузки файла:',
        uploadError.response?.data || uploadError.message,
      )
      return { error: 'Не удалось загрузить фото' }
    }
  } else {
  }

  try {
    const profilePayload = {
      name: data.name,
      city: data.city ?? 'mome',
      avatarId: uploadedAvatarId || data.avatarFile,
      description: data.description,
    }

    console.log('PUT /user payload:', JSON.stringify(profilePayload, null, 2))
    console.log('PUT /user URL:', `${backendUrl}/user`)

    const response = await axios.put(`${backendUrl}/user`, profilePayload, {
      headers: {
        'X-Project-Token': backendToken,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      timeout: 10000,
      validateStatus: () => true,
    })

    console.log('PUT /user response status:', response.status)
    console.log('PUT /user response data:', response.data)

    if (response.status !== 200 && response.status !== 204) {
      console.error('Бэкенд вернул ошибку:', {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      })
      const msg =
        response.data?.errors?.[0]?.description || response.data?.message
      return { error: msg || 'Неверный запрос' }
    }

    return { success: true, avatarId: uploadedAvatarId }
  } catch (updateError: any) {
    console.error('Ошибка обновления профиля:', updateError.response?.data)
    const msg = updateError.response?.data?.errors?.[0]?.description
    return { error: msg || 'Не удалось сохранить данные' }
  }
}
