import type { Task } from '../../types'

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
        <p className="mb-2">
          <strong>Description:</strong> {task.description}
        </p>
        <p className="mb-2">
          <strong>Due Time:</strong> {formatDueTime(task.dueTime)}
        </p>
        <p className="mb-4">
          <strong>Status:</strong> {task.completed ? 'Completed' : 'Pending'}
        </p>
        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
