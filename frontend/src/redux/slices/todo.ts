import { createSlice } from '@reduxjs/toolkit'

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
  },
})

export default todoSlice.reducer
