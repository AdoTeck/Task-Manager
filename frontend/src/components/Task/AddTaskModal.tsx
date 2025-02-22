import { useState } from 'react'
import { useCreateTaskMutation } from '@/redux/slices/TaskSlice'
import type { Task } from '@/types'

// Changed prop from onTaskAdded to refetchTasks
interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  refetchTasks?: () => void
}

export default function AddTaskModal({
  isOpen,
  onClose,
  projectId,
  refetchTasks,
}: AddTaskModalProps) {
  const [newTask, setNewTask] = useState<Omit<Task, 'id'>>({
    Title: '',
    Description: '',
    Status: 'Pending',
    Deadline: '',
    PriorityLevel: 'Medium',
    EstimateTime: 0,
  })

  const [createTask, { isLoading }] = useCreateTaskMutation()

  const handleSubmit = async () => {
    if (newTask.Title && newTask.Deadline) {
      try {
        const taskData = { ...newTask, EstimateTime: newTask.EstimateTime.toString() }
        await createTask({ projectId, taskData }).unwrap()
        setNewTask({
          Title: '',
          Description: '',
          Status: 'Pending',
          Deadline: '',
          PriorityLevel: 'Medium',
          EstimateTime: 0,
        })
        onClose()
        // Trigger refetch/reload after task addition.
        refetchTasks && refetchTasks()
      } catch (error) {
        console.error('Failed to create task:', error)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>

        {/* Task Title */}
        <label className="block mb-2 font-medium">Task Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          className="w-full p-2 mb-4 border rounded"
          value={newTask.Title}
          onChange={e => setNewTask({ ...newTask, Title: e.target.value })}
        />

        {/* Task Description */}
        <label className="block mb-2 font-medium">Task Description</label>
        <textarea
          placeholder="Enter task description"
          className="w-full p-2 mb-4 border rounded"
          value={newTask.Description}
          onChange={e => setNewTask({ ...newTask, Description: e.target.value })}
        />

        {/* Task Status */}
        <label className="block mb-2 font-medium">Task Status</label>
        <select
          className="w-full p-2 mb-4 border rounded"
          value={newTask.Status}
          onChange={e =>
            setNewTask({
              ...newTask,
              Status: e.target.value as 'Pending' | 'In Progress' | 'Completed',
            })
          }
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
          value={newTask.Deadline}
          onChange={e => setNewTask({ ...newTask, Deadline: e.target.value })}
        />

        {/* Task Priority Level */}
        <label className="block mb-2 font-medium">Priority Level</label>
        <select
          className="w-full p-2 mb-4 border rounded"
          value={newTask.PriorityLevel}
          onChange={e =>
            setNewTask({ ...newTask, PriorityLevel: e.target.value as 'Low' | 'Medium' | 'High' })
          }
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Task Estimate Time */}
        <label className="block mb-2 font-medium">Estimate Time (in hours)</label>
        <input
          type="number"
          placeholder="Enter estimate time"
          className="w-full p-2 mb-4 border rounded"
          value={newTask.EstimateTime}
          onChange={e => setNewTask({ ...newTask, EstimateTime: parseInt(e.target.value) || 0 })}
        />

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}
