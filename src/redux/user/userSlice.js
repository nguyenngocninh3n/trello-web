import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axiosInstance from '~/utils/axiosInstance'
import { SERVER_ADDRESS } from '~/utils/constants'

const initialValue = {
  currentUser: null
}

export const loginUserAPI = createAsyncThunk('/user/loginUserAPI', async data => {
  const response = await axiosInstance.post(`${SERVER_ADDRESS}/v1/users/login`, data)
  return response.data
})

export const logoutUserAPI = createAsyncThunk('/user/logoutUserAPI', async (isShowToast = true) => {
  await axiosInstance.delete(`${SERVER_ADDRESS}/v1/users/logout`)
  if (isShowToast) {
    toast('Logout successfully!')
  }
})
export const userSlice = createSlice({
  name: 'user',
  initialState: initialValue,
  extraReducers: builder => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      state.currentUser = action.payload
    })
    builder.addCase(logoutUserAPI.fulfilled, (state, action) => {
      state.currentUser = null
    })
  }
})

export const selectCurrentUser = state => state.user.currentUser
export const userReducer = userSlice.reducer
