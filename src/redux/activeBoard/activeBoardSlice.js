import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { isEmpty } from 'lodash'
import axiosInstance from '~/utils/axiosInstance'
import { SERVER_ADDRESS } from '~/utils/constants'
import mapOrder, { generate_placeholder_card } from '~/utils/mapOrder'

const initialState = {
  currentActiveBoard: null
}

export const getBoardDetailByIdAPI = createAsyncThunk('activeBoard/getBoardDetailByIdAPI', async boardId => {
  const response = await axiosInstance.get(`${SERVER_ADDRESS}/v1/boards/${boardId}`)
  return response.data
})

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState: initialState,
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      state.currentActiveBoard = action.payload
    },
    deleteColumn: (state, action) => {
      const board = { ...state.currentActiveBoard }
      const columnId = action.payload
      board.columns = board.columns.filter(column => column._id !== columnId)
      board.columnOrderIds = board.columnOrderIds.filter(_id => _id !== columnId)
      state.currentActiveBoard = board
    },
    addColumn: (state, action) => {
      const board = { ...state.currentActiveBoard }
      const newColumnData = action.payload
      board.columns = board.columns.concat([newColumnData])
      board.columnOrderIds = board.columnOrderIds.concat([newColumnData._id])
      state.currentActiveBoard = board
    },
    addCard: (state, action) => {
      const board = { ...state.currentActiveBoard }
      const newCardData = action.payload
      const customColumn = board.columns.find(columnn => columnn._id === newCardData.columnId)
      if (customColumn.cardOrderIds.find(cardId => cardId.includes('placeholder_card'))) {
        customColumn.cards = []
        customColumn.cardOrderIds = []
      }
      customColumn.cards = customColumn.cards.concat([newCardData])
      customColumn.cardOrderIds = customColumn.cardOrderIds.concat([newCardData._id])
      state.currentActiveBoard = board
    },
    updateCardInline: (state, action) => {
      const updatedCard = action.payload
      const columnContainer = state.currentActiveBoard.columns?.find(column => column._id === updatedCard.columnId)
      const currentCard = columnContainer?.cards?.find(card => card._id === updatedCard._id)
      Object.keys(currentCard).forEach(key => (currentCard[key] = updatedCard[key]))
    }
  },
  extraReducers: builder => {
    builder.addCase(getBoardDetailByIdAPI.fulfilled, (state, action) => {
      const board = action.payload
      board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
      board.columns.forEach(column => {
        if (isEmpty(column?.cards)) {
          column.cards = [generate_placeholder_card(column)]
          column.cardOrderIds = [generate_placeholder_card(column)._id]
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, '_id')
        }
      })
      board.allMembers = board.owners.concat(board.members)
      state.currentActiveBoard = board
    })
  }
})

export const { updateCurrentActiveBoard, deleteColumn, addColumn, addCard, updateCardInline } = activeBoardSlice.actions
export const selectCurrentActiveBoard = state => state.activeBoard.currentActiveBoard
export const activeBoardReducer = activeBoardSlice.reducer
