'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { PlusCircle, ChevronDown, ArrowLeft } from 'lucide-react'
import TaskList from '@/components/Task/TaskList'
import AddTaskModal from '@/components/Task/AddTaskModal'
import TaskDetailsModal from '@/components/Task/TaskDetailsModal'
import type { Task } from '@/types'
import { useGetTaskQuery, useDeleteTaskMutation } from '@/redux/slices/TaskSlice'
import EditTaskModal from '@/components/Task/EditTaskModal'

export default function TaskManager() {
  const router = useRouter()
  const { projectId } = useParams<{ projectId: string }>()
  const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false)
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState<Task | null>(null)
 
  const { data: apiResponse, isLoading, error, refetch } = useGetTaskQuery(
    { projectId: projectId || '' },
    { skip: !projectId }
  )

  // Map API response to local Task structure
  const tasks: Task[] = apiResponse?.task.map(task => ({
    id: task._id,
    Title: task.Title,
    Description: task.Description,
    Status: task.Status,
    Deadline: task.Deadline,
    PriorityLevel: task.PriorityLevel,
    EstimateTime: task.EstimateTime
  })) || []

  // Filter tasks by status
  const allTasks = tasks
  const pendingTasks = tasks.filter(task => task.Status !== 'Completed')
  const completedTasks = tasks.filter(task => task.Status === 'Completed')

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [deleteTaskMutation] = useDeleteTaskMutation()

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const handleEditTask = (task: Task) => {
    setSelectedTaskForEdit(task)
    setIsEditTaskModalOpen(true)
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

  if (isLoading) return <div className="text-primary">Loading...</div>
  if (error) return <div className="text-destructive">Error loading tasks.</div>

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-card rounded-xl shadow-md mb-8 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-primary">Task Manager Project</h1>
              <p className="text-muted-foreground mt-2">Due Date: August 31, 2023</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/dashboard/projects')}
                className="bg-background border border-border hover:bg-muted text-foreground font-medium px-6 py-2 rounded-lg transition duration-200 flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Projects
              </button>
              <button
                onClick={() => setIsAddTaskModalOpen(true)}
                className="bg-primary hover:bg-yellow-500 text-primary-foreground font-medium px-6 py-2 rounded-lg transition duration-200 flex items-center gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Add Task
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TaskList
            title="All Tasks"
            tasks={allTasks}
            onToggle={toggleTask}
            onDelete={handleDeleteTask}
            onViewDetails={openTaskDetails}
            onEdit={handleEditTask}
          />
          <TaskList
            title="Pending Tasks"
            tasks={pendingTasks}
            onToggle={toggleTask}
            onDelete={handleDeleteTask}
            onViewDetails={openTaskDetails}
            onEdit={handleEditTask}
          />
          <TaskList
            title="Completed Tasks"
            tasks={completedTasks}
            onToggle={toggleTask}
            onDelete={handleDeleteTask}
            onViewDetails={openTaskDetails}
            onEdit={handleEditTask}
          />
        </div>

        <EditTaskModal
          isOpen={isEditTaskModalOpen}
          onClose={() => setIsEditTaskModalOpen(false)}
          task={selectedTaskForEdit}
          projectId={projectId}
          onTaskUpdated={refetch}
        />

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
