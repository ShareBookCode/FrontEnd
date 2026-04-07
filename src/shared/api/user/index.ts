import { apiClient } from '../axios'
import { USER } from '../endpoints'

export const getUser = async () => {
  return apiClient.get(USER)
}
