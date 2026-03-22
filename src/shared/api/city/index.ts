import axios from 'axios'

export const getListCities = async (value: string) => {
  return await axios.get('/api/city', {
    params: {
      search: value,
    },
  })
}
