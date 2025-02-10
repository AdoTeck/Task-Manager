import { Eye, Trash2, Check, X } from 'lucide-react'
import type { Task } from '../../types'

interface TaskListProps {
  title: string
  tasks: Task[]
  onToggle: (id: number) => void
  onDelete: (id: number) => void
  onViewDetails: (task: Task) => void
}

export default function TaskList({
  title,
  tasks,
  onToggle,
  onDelete,
  onViewDetails,
}: TaskListProps) {
  const getTaskColor = (task: Task) => {
    if (task.completed) return 'bg-green-500'
    const now = new Date()
    const dueDate = new Date(task.dueTime)
    if (dueDate < now) return 'bg-red-500'
    return 'bg-yellow-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold text-primary mb-4">{title}</h2>
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center space-x-2">
              <div
                className={`flex-grow h-8 rounded-lg ${getTaskColor(task)} transition-all duration-300 ease-in-out`}
                style={{ width: `${task.completed ? 100 : 50}%` }}
              >
                <div className="flex items-center justify-between h-full px-3">
                  <span className="font-semibold text-white truncate">{task.title}</span>
                </div>
              </div>
              <button
                onClick={() => onViewDetails(task)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
              >
                <Eye className="h-4 w-4 text-gray-600" />
              </button>
              <button
                onClick={() => onToggle(task.id)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
              >
                {task.completed ? (
                  <X className="h-4 w-4 text-gray-600" />
                ) : (
                  <Check className="h-4 w-4 text-gray-600" />
                )}
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
              >
                <Trash2 className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
