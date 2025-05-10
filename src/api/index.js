import axiosInstance from '~/utils/axiosInstance'
import { SERVER_ADDRESS } from '~/utils/constants'

export const refreshTokenAPI = async () => {
  const response = await axiosInstance.get(`${SERVER_ADDRESS}/v1/users/refresh_token`)
  return response.data
}

export const getBoardsAPI = async (page = 1, itemsPerPage = 12) => {
  const queyString = `?page=${page}`
  const response = await axiosInstance.get(`${SERVER_ADDRESS}/v1/boards${queyString}`)
  return response.data
}

export const createNewBoardAPI = async data => {
  const response = await axiosInstance.post(`${SERVER_ADDRESS}/v1/boards`, data)
  return response.data
}

export const updateBoardDetailAPI = async (boardId, updatedData) => {
  const response = await axiosInstance.put(`${SERVER_ADDRESS}/v1/boards/${boardId}`, updatedData)
  return response.data
}

export const updateCardAPI = async (cardId, newCardData) => {
  const response = await axiosInstance.put(`${SERVER_ADDRESS}/v1/cards/${cardId}`, newCardData)
  return response.data
}

export const inviteUserToBoardAPI = async (boardId, invitedEmail) => {
  const response = await axiosInstance.post(`${SERVER_ADDRESS}/v1/invitations/board`, { boardId, invitedEmail })
  return response.data
}

export const updateInvitationStatusAPI = async (invitationId, status) => {
  const response = await axiosInstance.put(`${SERVER_ADDRESS}/v1/invitations/board`, { invitationId, status })
  return response.data
}

