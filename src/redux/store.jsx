import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { activeBoardReducer } from './activeBoard/activeBoardSlice'
import { userReducer } from './user/userSlice'

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { activeCardReducer } from './activeCard/activeCardSlice'
import { notificationReducer } from './notification/notificationSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
}

const rootReducer = combineReducers({
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer,
  user: userReducer,
  notification: notificationReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist actions
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // Optionally ignore certain paths in action or state
        ignoredActionPaths: ['register', 'rehydrate'],
        ignoredPaths: ['_persist']
      }
    })
})
