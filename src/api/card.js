import axios from 'axios'
import { SERVER_ADDRESS } from '~/utils/constants'

export const addNewCardAPI = async newCardData => {
  const response = await axios.post(`${SERVER_ADDRESS}/v1/cards`, newCardData)
  return response.data
}
