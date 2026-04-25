import axios from 'axios'

export const getUserDataTest = async (token: string) => {
  if (token) {
    const user = await axios.get(`${process.env.BACKEND_URL}/user`, {
      headers: {
        'X-Project-Token': process.env.BACKEND_TOKEN,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        accept: 'application/json',
      },
    })

    const imageResponse = await axios.get(
      `${process.env.BACKEND_URL}${user.data.avatarUrl}`,
      {
        headers: {
          'X-Project-Token': process.env.BACKEND_TOKEN,
          Authorization: `Bearer ${token}`,
          accept: '*/*',
        },
        responseType: 'arraybuffer',
      },
    )

    const base64 = Buffer.from(imageResponse.data).toString('base64')
    const contentType = imageResponse.headers['content-type'] || 'image/jpeg'
    const dataUrl = `data:${contentType};base64,${base64}`

    return {
      ...user.data,
      avatarUrl: dataUrl,
    }
  }

  return {}
}
