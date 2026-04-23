import { apiClient } from '../http'
import { USER } from '../endpoints'

export const getUser = async () => {
  return apiClient.get(USER)
}
