import axiosInstance from '~/utils/axiosInstance'
import { SERVER_ADDRESS } from '~/utils/constants'

export const refreshTokenAPI = async () => {
  const response = await axiosInstance.get(`${SERVER_ADDRESS}/v1/users/refresh_token`)
  return response.data
}
