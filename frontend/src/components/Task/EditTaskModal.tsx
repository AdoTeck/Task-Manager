import { useState, useEffect } from 'react'
import { useUpdateTaskMutation } from '@/redux/slices/TaskSlice'
import type { Task } from '@/types'

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  projectId: string
  onTaskUpdated?: () => void
}

export default function EditTaskModal({ isOpen, onClose, task, projectId, onTaskUpdated }: EditTaskModalProps) {
  const [editedTask, setEditedTask] = useState(task)
  const [updateTask, { isLoading }] = useUpdateTaskMutation()

  useEffect(() => {
    setEditedTask(task)
  }, [task])

  const handleSubmit = async () => {
    if (editedTask && editedTask.Title && editedTask.Deadline) {
      try {
        const taskData = {
          Title: editedTask.Title,
          Description: editedTask.Description,
          Status: editedTask.Status,
          Deadline: editedTask.Deadline,
          PriorityLevel: editedTask.PriorityLevel,
          EstimateTime: editedTask.EstimateTime.toString(),
        }
        await updateTask({ projectId, taskId: editedTask.id, taskData }).unwrap()
        onClose()
        onTaskUpdated && onTaskUpdated()
      } catch (error) {
        console.error('Failed to update task:', error)
      }
    }
  }

  if (!isOpen || !editedTask) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
        {/* Task Title */}
        <label className="block mb-2 font-medium">Task Title</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          value={editedTask.Title}
          onChange={e => setEditedTask({ ...editedTask, Title: e.target.value })}
        />
        {/* Task Description */}
        <label className="block mb-2 font-medium">Task Description</label>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          value={editedTask.Description}
          onChange={e => setEditedTask({ ...editedTask, Description: e.target.value })}
        />
        {/* Task Status */}
        <label className="block mb-2 font-medium">Task Status</label>
        <select
          className="w-full p-2 mb-4 border rounded"
          value={editedTask.Status}
          onChange={e => setEditedTask({ ...editedTask, Status: e.target.value })}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        {/* Task Deadline */}
        <label className="block mb-2 font-medium">Deadline</label>
        <input
          type="datetime-local"
          className="w-full p-2 mb-4 border rounded"
          value={editedTask.Deadline}
          onChange={e => setEditedTask({ ...editedTask, Deadline: e.target.value })}
        />
        {/* Task Priority Level */}
        <label className="block mb-2 font-medium">Priority Level</label>
        <select
          className="w-full p-2 mb-4 border rounded"
          value={editedTask.PriorityLevel}
          onChange={e => setEditedTask({ ...editedTask, PriorityLevel: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {/* Task Estimate Time */}
        <label className="block mb-2 font-medium">Estimate Time (in hours)</label>
        <input
          type="number"
          className="w-full p-2 mb-4 border rounded"
          value={editedTask.EstimateTime}
          onChange={e => setEditedTask({ ...editedTask, EstimateTime: parseInt(e.target.value) || 0 })}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Update Task
          </button>
        </div>
      </div>
    </div>
  )
}