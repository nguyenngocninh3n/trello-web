import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '~/utils/axiosInstance'
import { SERVER_ADDRESS } from '~/utils/constants'

const initialValue = {
  currentNotifications: null
}

export const fetchNotificationsAPI = createAsyncThunk('/notification/fetchNotificationsAPI', async () => {
  const response = await axiosInstance.get(`${SERVER_ADDRESS}/v1/invitations/board`)
  return response.data.reverse()
})

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialValue,
  reducers: {
    updateNotificationStatus: (state, action) => {
      const updatedIndex = state.currentNotifications.findIndex(notify => notify._id === action.payload._id)
      state.currentNotifications[updatedIndex].status = action.payload.status
    },
    addNewNotification: (state, action) => {
      state.currentNotifications = [action.payload, ...state.currentNotifications]
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchNotificationsAPI.fulfilled, (state, action) => {
      state.currentNotifications = action.payload
    })
  }
})

export const { updateNotificationStatus, addNewNotification } = notificationSlice.actions
export const selectCurrentNotifications = state => state.notification.currentNotifications
export const notificationReducer = notificationSlice.reducer
