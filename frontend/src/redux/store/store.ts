import { configureStore } from '@reduxjs/toolkit'
import { api } from '../slices/TodoSlice'
import { taskApi } from '../slices/TaskSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [taskApi.reducerPath]: taskApi.reducer,

  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware), // Add API middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
