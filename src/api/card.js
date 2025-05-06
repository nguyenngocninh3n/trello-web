import axiosInstance from '~/utils/axiosInstance'
import { SERVER_ADDRESS } from '~/utils/constants'

export const addNewCardAPI = async newCardData => {
  const response = await axiosInstance.post(`${SERVER_ADDRESS}/v1/cards`, newCardData)
  return response.data
}
