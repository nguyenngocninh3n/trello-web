import axios from 'axios'
import { SERVER_ADDRESS } from '~/utils/constants'

export const getBoardDetailByIdAPI = async boardId => {
  const response = await axios.get(`${SERVER_ADDRESS}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardAPI = async (boardId, updatedData) => {
  const response = await axios.put(`${SERVER_ADDRESS}/v1/boards/${boardId}`, updatedData)
  return response.data
}
