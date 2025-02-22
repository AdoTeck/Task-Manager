'use client'

import { useState, useEffect } from 'react'
import { Check, Edit, Trash, Plus, Eye, X } from 'lucide-react'
import {
  useCreateTodoMutation,
  useGetTodoQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from '@/redux/slices/TodoSlice'

interface Todo {
  _id: string
  Title: string
  Description: string
  Completed: boolean
  createdAt: string
}
// interface ApiResponse {
//   message: string
//   todo: Todo[]
// }

export default function TodoComponent() {
  const { data: apiResponse, isLoading, error, refetch } = useGetTodoQuery()
  const [createTodo, { isLoading: isCreating }] = useCreateTodoMutation()
  const [deleteTodoMutation] = useDeleteTodoMutation()
  const [updateTodo, { isLoading: isUpdating }] = useUpdateTodoMutation()
  const [filter, setFilter] = useState<'all' | 'active' | 'Completed'>('all')
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewTodo, setViewTodo] = useState<Todo | null>(null)
  const [editTodo, setEditTodo] = useState<Todo | null>(null)
  const [localTodos, setLocalTodos] = useState<Todo[]>([])

  useEffect(() => {
    if (apiResponse?.todo) {
      setLocalTodos(apiResponse.todo)
    }
  }, [apiResponse])

  const filteredTodos = localTodos.filter(todo => {
    if (filter === 'active') return !todo.Completed
    if (filter === 'Completed') return todo.Completed
    return true
  })

  const addTodo = async () => {
    if (newTitle.trim()) {
      try {
        await createTodo({
          Title: newTitle,
          Description: newDescription,
        })
        refetch()
        setNewTitle('')
        setNewDescription('')
        setIsModalOpen(false)
      } catch (error) {
        console.error('Failed to create todo:', error)
      }
    }
  }

  const toggleTodo = async (id: string, completed: boolean) => {
    try {
      const todoToUpdate = localTodos.find(todo => todo._id === id)
      if (todoToUpdate) {
        await updateTodo({
          _id: id,
          Title: todoToUpdate.Title,
          Description: todoToUpdate.Description,
          Completed: !completed,
        })
      }
      refetch()
    } catch (error) {
      console.error('Failed to update todo:', error)
    }
  }

  const deleteTodo = async (id: string) => {
    try {
      await deleteTodoMutation(id)
      refetch()
    } catch (error) {
      console.error('Failed to delete todo:', error)
    }
  }

  const openEditModal = (todo: Todo) => {
    setEditTodo(todo)
  }

  const handleEditSave = async () => {
    if (editTodo) {
      try {
        await updateTodo({
          _id: editTodo._id,
          Title: editTodo.Title,
          Description: editTodo.Description,
        })
        refetch()
        setEditTodo(null)
      } catch (error) {
        console.error('Failed to update todo:', error)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="bg-background text-foreground rounded-xl border border-border p-6 shadow-sm max-w-2xl mx-auto text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 rounded-full border-yellow-500 border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Loading tasks...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-background text-foreground rounded-xl border border-border p-6 shadow-sm max-w-2xl mx-auto text-center text-red-500">
        Error loading tasks. Please try again later.
      </div>
    )
  }

  return (
    <div className="bg-background text-foreground rounded-xl border border-border p-6 shadow-sm max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2 text-primary">
          <Check className="h-8 w-8 text-yellow-500" />
          Task Manager
        </h2>
        <p className="text-muted-foreground mt-2">
          {localTodos.filter(todo => !todo.Completed).length} tasks remaining
        </p>
      </div>

      {/* Add Todo Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full mb-6 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200"
      >
        <Plus className="h-5 w-5 mr-2" />
        Add New Task
      </button>

      {/* Todo List */}
      <div className="space-y-3 mb-6">
        {filteredTodos.map(todo => (
          <div
            key={todo._id}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <button
              onClick={() => toggleTodo(todo._id, todo.Completed)}
              className={`p-1.5 rounded-md border ${
                todo.Completed
                  ? 'bg-yellow-500 border-yellow-500 text-white'
                  : 'border-input text-transparent hover:border-yellow-500'
              }`}
            >
              <Check className="h-4 w-4" />
            </button>

            <div className="flex-1">
              <span className={`${todo.Completed ? 'line-through text-muted-foreground' : ''}`}>
                {todo.Title}
              </span>
              <p className="text-sm text-muted-foreground mt-1">
                Created: {new Date(todo.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setViewTodo(todo)}
                className="p-1.5 text-muted-foreground hover:text-yellow-500 rounded-md hover:bg-yellow-500/10"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button
                onClick={() => openEditModal(todo)}
                className="p-1.5 text-muted-foreground hover:text-yellow-500 rounded-md hover:bg-yellow-500/10"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-500/10"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Stats */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {['all', 'active', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as 'all' | 'active' | 'Completed')}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === f ? 'bg-yellow-500 text-white' : 'text-muted-foreground hover:bg-accent'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} (
              {f === 'all'
                ? localTodos.length
                : localTodos.filter(t => (f === 'active' ? !t.Completed : t.Completed)).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredTodos.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No tasks found. Enjoy your free time! 🎉
        </div>
      )}

      {/* Add Todo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Task</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Task Title"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md mb-4 bg-background"
            />
            <textarea
              placeholder="Task Description"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md mb-4 bg-background h-32 resize-none"
            />
            <button
              onClick={addTodo}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              {isCreating ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </div>
      )}

      {/* View Todo Modal */}
      {viewTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{viewTodo.Title}</h3>
              <button
                onClick={() => setViewTodo(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-muted-foreground">{viewTodo.Description}</p>
            <p className="text-sm text-muted-foreground mt-2">
              Created: {new Date(viewTodo.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      )}

      {/* Edit Todo Modal */}
      {editTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Task</h3>
              <button
                onClick={() => setEditTodo(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              type="text"
              value={editTodo.Title}
              onChange={e => setEditTodo({ ...editTodo, Title: e.target.value })}
              className="w-full px-3 py-2 border border-input rounded-md mb-4 bg-background"
            />
            <textarea
              value={editTodo.Description}
              onChange={e => setEditTodo({ ...editTodo, Description: e.target.value })}
              className="w-full px-3 py-2 border border-input rounded-md mb-4 bg-background h-32 resize-none"
            />
            <button
              onClick={handleEditSave}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md"
            >
              {isUpdating ? 'Updating...' : 'Update Task'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
