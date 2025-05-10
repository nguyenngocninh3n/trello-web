import { createSlice } from '@reduxjs/toolkit'

const initialValue = {
  currentActiveCard: null
}

const activeCardSlice = createSlice({
  name: 'activeCard',
  initialState: initialValue,
  reducers: {
    updateActiveCard: (state, action) => {
      state.currentActiveCard = action.payload
    },
    clearActiveCard: (state, action) => {
      state.currentActiveCard = null
    }
  }
})

export const { updateActiveCard, clearActiveCard } = activeCardSlice.actions
export const selectCurrentActiveCard = state => state.activeCard.currentActiveCard
export const activeCardReducer = activeCardSlice.reducer
