import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../slices/todo'
import { api } from '../slices/apiSlice'

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware), // Add API middleware
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
