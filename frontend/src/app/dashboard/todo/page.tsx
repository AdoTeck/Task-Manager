"use client"

import { useState } from "react"
import { Check, Edit, Trash, Plus, Eye, X } from "lucide-react"

interface Todo {
  id: string
  title: string
  description: string
  completed: boolean
}

export default function TodoComponent() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "1",
      title: "Create project proposal",
      description: "Draft a comprehensive project proposal for the new client",
      completed: false,
    },
    {
      id: "2",
      title: "Review team tasks",
      description: "Go through the team's assigned tasks and provide feedback",
      completed: true,
    },
    {
      id: "3",
      title: "Update documentation",
      description: "Revise and update the project documentation with recent changes",
      completed: false,
    },
  ])
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  const [newTodoTitle, setNewTodoTitle] = useState("")
  const [newTodoDescription, setNewTodoDescription] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [viewTodo, setViewTodo] = useState<Todo | null>(null)

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const addTodo = () => {
    if (newTodoTitle.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          title: newTodoTitle,
          description: newTodoDescription,
          completed: false,
        },
      ])
      setNewTodoTitle("")
      setNewTodoDescription("")
      setIsModalOpen(false)
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="bg-background text-foreground rounded-xl border border-border p-6 shadow-sm max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold flex items-center gap-2 text-primary">
          <Check className="h-8 w-8 text-yellow-500" />
          Task Manager
        </h2>
        <p className="text-muted-foreground mt-2">{todos.filter((todo) => !todo.completed).length} tasks remaining</p>
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
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`p-1.5 rounded-md border ${
                todo.completed
                  ? "bg-yellow-500 border-yellow-500 text-white"
                  : "border-input text-transparent hover:border-yellow-500"
              }`}
            >
              <Check className="h-4 w-4" />
            </button>

            <span className={`flex-1 ${todo.completed ? "line-through text-muted-foreground" : ""}`}>{todo.title}</span>

            <div className="flex gap-2">
              <button
                onClick={() => setViewTodo(todo)}
                className="p-1.5 text-muted-foreground hover:text-yellow-500 rounded-md hover:bg-yellow-500/10"
              >
                <Eye className="h-4 w-4" />
              </button>
              <button className="p-1.5 text-muted-foreground hover:text-yellow-500 rounded-md hover:bg-yellow-500/10">
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => deleteTodo(todo.id)}
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
          {["all", "active", "completed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as "all" | "active" | "completed")}
              className={`px-3 py-1 rounded-md text-sm ${
                filter === f ? "bg-yellow-500 text-white" : "text-muted-foreground hover:bg-accent"
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)} (
              {f === "all" ? todos.length : todos.filter((t) => (f === "active" ? !t.completed : t.completed)).length})
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredTodos.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">No tasks found. Enjoy your free time! 🎉</div>
      )}

      {/* Add Todo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Task</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Task Title"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md mb-4 bg-background"
            />
            <textarea
              placeholder="Task Description"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md mb-4 bg-background h-32 resize-none"
            />
            <button
              onClick={addTodo}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md transition-colors duration-200"
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      {/* View Todo Modal */}
      {viewTodo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{viewTodo.title}</h3>
              <button onClick={() => setViewTodo(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-muted-foreground">{viewTodo.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

