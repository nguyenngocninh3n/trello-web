import axios from 'axios'
import { SERVER_ADDRESS } from '~/utils/constants'

export const addNewColumnAPI = async columnData => {
  const response = await axios.post(`${SERVER_ADDRESS}/v1/columns`, columnData)
  return response.data
}

export const updateColumnAPI = async (columnId, boardId, updatedData) => {
  const response = await axios.put(`${SERVER_ADDRESS}/v1/columns/${columnId}`, { ...updatedData, boardId })
  return response.data
}

export const deleteColumnAPI = async columnId => {
  const response = await axios.delete(`${SERVER_ADDRESS}/v1/columns/${columnId}`)
  return response.data
}

export const moveCardsInMultiColumnsAPI = async (cardId, preColumn, nextColumn) => {
  console.log({ preColumn, nextColumn })
  const response = await axios.put(`${SERVER_ADDRESS}/v1/columns/supports/move_cards`, {
    cardId,
    preColumnId: preColumn._id,
    preColumnCardOrderIds: preColumn.cardOrderIds,
    nextColumnId: nextColumn._id,
    nextColumnCardOrderIds: nextColumn.cardOrderIds
  })
  return response.data
}
