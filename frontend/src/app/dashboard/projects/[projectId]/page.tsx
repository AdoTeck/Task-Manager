'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { PlusCircle, ChevronDown } from 'lucide-react'
import TaskList from '@/components/Task/TaskList'
import AddTaskModal from '@/components/Task/AddTaskModal'
import TaskDetailsModal from '@/components/Task/TaskDetailsModal'
import type { Task } from '@/types'
import { useGetTaskQuery, useDeleteTaskMutation } from '@/redux/slices/TaskSlice'

export default function TaskManager() {
  const { projectId } = useParams<{ projectId: string }>()
  // Extract refetch from useGetTaskQuery
  const { data: apiResponse, isLoading, error, refetch } = useGetTaskQuery(
    { projectId: projectId || '' },
    { skip: !projectId }
  )

  // Map API response to local Task structure
  const tasks: Task[] = apiResponse?.task.map(task => ({
    id: task._id, // assuming TaskList can use string ids
    title: task.Title,
    description: task.Description,
    dueTime: task.Deadline,
    completed: task.Status === 'Completed'
  })) || []

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [deleteTaskMutation] = useDeleteTaskMutation()

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTaskMutation({ projectId: projectId || '', taskId }).unwrap()
      refetch()
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const openTaskDetails = (task: Task) => {
    setSelectedTask(task)
    setIsTaskDetailsModalOpen(true)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading tasks.</div>


  return (
    <div className="min-h-screen bg-[#e5e7eb] text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-primary">Task Manager Project</h1>
              <p className="text-muted-foreground mt-2">Due Date: August 31, 2023</p>
            </div>
            <button
              onClick={() => setIsAddTaskModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              <PlusCircle className="inline-block mr-2 h-5 w-5" /> Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <TaskList
            title="All Tasks"
            tasks={tasks}
            onToggle={toggleTask}
            onDelete={handleDeleteTask}
            onViewDetails={openTaskDetails}
          />
          <TaskList
            title="Pending Tasks"
            tasks={tasks.filter(task => !task.Status)}
            onToggle={toggleTask}
            onDelete={handleDeleteTask}
            onViewDetails={openTaskDetails}
          />
          <TaskList
            title="Completed Tasks"
            tasks={tasks.filter(task => task.Status)}
            onToggle={toggleTask}
            onDelete={handleDeleteTask}
            onViewDetails={openTaskDetails}
          />
        </div>

        <div className="mt-8 text-center">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            <ChevronDown className="inline-block mr-2 h-5 w-5" /> View All Projects
          </button>
        </div>

        <AddTaskModal
          isOpen={isAddTaskModalOpen}
          onClose={() => setIsAddTaskModalOpen(false)}
          projectId={projectId}
          onTaskAdded={refetch}
        />

        <TaskDetailsModal
          isOpen={isTaskDetailsModalOpen}
          onClose={() => setIsTaskDetailsModalOpen(false)}
          task={selectedTask}
        />
      </div>
    </div>
  )
}
