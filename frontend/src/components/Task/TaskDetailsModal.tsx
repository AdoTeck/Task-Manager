import type { Task } from '@/types'

interface TaskDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
}

export default function TaskDetailsModal({ isOpen, onClose, task }: TaskDetailsModalProps) {
  if (!isOpen || !task) return null

  const formatDueTime = (dueTime: string) => {
    const date = new Date(dueTime)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  }
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{task.Title}</h2>
        <div className="space-y-3">
          <div>
            <label className="font-medium">Description:</label>
            <p className="text-gray-600">{task.Description}</p>
          </div>
          <div>
            <label className="font-medium">Status:</label>
            <p className="text-gray-600">{task.Status}</p>
          </div>
          <div>
            <label className="font-medium">Deadline:</label>
            <p className="text-gray-600">{formatDueTime(task.Deadline)}</p>
          </div>
          <div>
            <label className="font-medium">Priority:</label>
            <span className={`px-2 py-1 rounded ${getPriorityColor(task.PriorityLevel)}`}>
              {task.PriorityLevel}
            </span>
          </div>
          <div>
            <label className="font-medium">Estimated Time:</label>
            <p className="text-gray-600">{task.EstimateTime} hours</p>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
