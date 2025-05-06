import axiosInstance from '~/utils/axiosInstance'
import { SERVER_ADDRESS } from '~/utils/constants'

export const getBoardDetailByIdAPI = async boardId => {
  const response = await axiosInstance.get(`${SERVER_ADDRESS}/v1/boards/${boardId}`)
  return response.data
}

export const updateBoardAPI = async (boardId, updatedData) => {
  const response = await axiosInstance.put(`${SERVER_ADDRESS}/v1/boards/${boardId}`, updatedData)
  return response.data
}
