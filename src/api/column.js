import axios from 'axios'
import { SERVER_ADDRESS } from '~/utils/constants'

export const addNewColumnAPI = async columnData => {
  const response = await axios.post(`${SERVER_ADDRESS}/v1/columns`, columnData)
  return response.data
}
