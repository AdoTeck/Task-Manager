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
          ...editedTask,
          EstimateTime: editedTask.EstimateTime.toString()
        }
        await updateTask({ 
          projectId, 
          taskId: editedTask.id,
          taskData 
        }).unwrap()
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

        {/* Form fields same as AddTaskModal but with editedTask */}
        {/* ... (copy the form fields from AddTaskModal but use editedTask state) ... */}
        
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