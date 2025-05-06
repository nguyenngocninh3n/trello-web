import axiosInstance from '~/utils/axiosInstance'
import { SERVER_ADDRESS } from '~/utils/constants'

export const registerAPI = async data => {
  const response = await axiosInstance.post(`${SERVER_ADDRESS}/v1/users/register`, data)
  return response.data
}

export const verifyUserAPI = async data => {
  const response = await axiosInstance.post(`${SERVER_ADDRESS}/v1/users/verify`, data)
  return response.data
}

