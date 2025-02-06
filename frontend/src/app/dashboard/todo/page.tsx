"use client";
// components/Todo.tsx
import { useState } from "react";
import { Check, Edit, Trash, Plus } from "lucide-react";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export default function TodoComponent() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Create project proposal", completed: false },
    { id: "2", text: "Review team tasks", completed: true },
    { id: "3", text: "Update documentation", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="bg-background text-foreground rounded-xl border border-border p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Check className="h-6 w-6 text-yellow-500" />
          Task Manager Todo
        </h2>
        <p className="text-muted-foreground mt-2">
          {todos.filter(todo => !todo.completed).length} tasks remaining
        </p>
      </div>

      {/* Add Todo Form */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="w-full px-4 py-2.5 rounded-lg border border-input bg-card focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
        />
        <button className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add Task
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-3 mb-6">
        {filteredTodos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <button className={`p-1.5 rounded-md border ${
              todo.completed 
                ? 'bg-yellow-500 border-yellow-500 text-white'
                : 'border-input text-transparent'
            }`}>
              <Check className="h-4 w-4" />
            </button>
            
            <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
              {todo.text}
            </span>
            
            <div className="flex gap-2">
              <button className="p-1.5 text-muted-foreground hover:text-yellow-500 rounded-md hover:bg-yellow-500/10">
                <Edit className="h-4 w-4" />
              </button>
              <button className="p-1.5 text-muted-foreground hover:text-red-500 rounded-md hover:bg-red-500/10">
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Stats */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "all" 
                ? 'bg-yellow-500 text-white' 
                : 'text-muted-foreground hover:bg-accent'
            }`}
          >
            All ({todos.length})
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "active" 
                ? 'bg-yellow-500 text-white' 
                : 'text-muted-foreground hover:bg-accent'
            }`}
          >
            Active ({todos.filter(t => !t.completed).length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded-md text-sm ${
              filter === "completed" 
                ? 'bg-yellow-500 text-white' 
                : 'text-muted-foreground hover:bg-accent'
            }`}
          >
            Completed ({todos.filter(t => t.completed).length})
          </button>
        </div>
      </div>

      {/* Empty State */}
      {filteredTodos.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No tasks found. Enjoy your free time! 🎉
        </div>
      )}
    </div>
  );
}