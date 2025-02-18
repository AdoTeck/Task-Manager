import { Eye, Trash2, Edit, CheckCircle, XCircle } from 'lucide-react'
import type { Task } from '@/types'

interface TaskListProps {
  title: string
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onViewDetails: (task: Task) => void
  onEdit: (task: Task) => void
}

export default function TaskList({
  title,
  tasks,
  onToggle,
  onDelete,
  onViewDetails,
  onEdit,
}: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-red-50 text-red-700'
      case 'medium':
        return 'bg-yellow-50 text-yellow-700'
      default:
        return 'bg-green-50 text-green-700'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-3">
        {tasks.map(task => (
          <div 
            key={task.id} 
            className="group bg-white rounded-lg border border-gray-200 p-3 hover:border-gray-300 transition-colors duration-200 relative"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate">
                    {task.Title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => onViewDetails(task)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onEdit(task)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
                      title="Edit task"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors duration-200"
                      title="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.PriorityLevel)}`}>
                    {task.PriorityLevel}
                  </span>
                  <span className="text-gray-500">
                    Due {formatDate(task.Deadline)}
                  </span>
                  <span className="text-gray-500">
                    {task.EstimateTime}h
                  </span>
                </div>
              </div>
            </div>
            
            {/* Status Toggle Icon */}
            <button
              onClick={() => onToggle(task.id)}
              className="absolute bottom-3 right-3 p-1 rounded-full transition-colors duration-200 hover:bg-gray-100"
              title={task.Status === 'Completed' ? 'Mark as pending' : 'Mark as completed'}
            >
              {task.Status === 'Completed' ? (
                <CheckCircle className="h-5 w-5 text-green-500 hover:text-green-600" />
              ) : (
                <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-500" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}