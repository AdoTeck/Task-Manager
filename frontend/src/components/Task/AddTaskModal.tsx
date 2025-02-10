import { useState } from 'react'
import type { Task } from '../../types'

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void
}

export default function AddTaskModal({ isOpen, onClose, onAddTask }: AddTaskModalProps) {
  const [newTask, setNewTask] = useState<Omit<Task, 'id' | 'completed'>>({
    title: '',
    description: '',
    dueTime: '',
  })

  const handleSubmit = () => {
    if (newTask.title && newTask.dueTime) {
      onAddTask(newTask)
      setNewTask({ title: '', description: '', dueTime: '' })
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
        <input
          type="text"
          placeholder="Task Title"
          className="w-full p-2 mb-4 border rounded"
          value={newTask.title}
          onChange={e => setNewTask({ ...newTask, title: e.target.value })}
        />
        <textarea
          placeholder="Task Description"
          className="w-full p-2 mb-4 border rounded"
          value={newTask.description}
          onChange={e => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="datetime-local"
          className="w-full p-2 mb-4 border rounded"
          value={newTask.dueTime}
          onChange={e => setNewTask({ ...newTask, dueTime: e.target.value })}
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  )
}
