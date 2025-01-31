"use client"

import { useState } from "react"
import { PlusCircle, ChevronDown } from "lucide-react"
import TaskList from "../../components/Task/TaskList"
import AddTaskModal from "../../components/Task/AddTaskModal"
import TaskDetailsModal from "../../components/Task/TaskDetailsModal"
import type { Task } from "../../types"

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Design UI",
      description: "Create wireframes and mockups for the new dashboard",
      dueTime: "2023-08-15T14:00",
      completed: false,
    },
    {
      id: 2,
      title: "Implement backend",
      description: "Set up Express.js server and MongoDB database",
      dueTime: "2023-08-20T17:00",
      completed: false,
    },
    {
      id: 3,
      title: "Write tests",
      description: "Create unit and integration tests for core functionalities",
      dueTime: "2023-08-25T12:00",
      completed: true,
    },
    {
      id: 4,
      title: "Deploy application",
      description: "Set up CI/CD pipeline and deploy to production",
      dueTime: "2023-08-28T09:00",
      completed: false,
    },
    {
      id: 5,
      title: "User testing",
      description: "Conduct user testing sessions and gather feedback",
      dueTime: "2023-08-30T15:00",
      completed: true,
    },
  ])

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isTaskDetailsModalOpen, setIsTaskDetailsModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const addTask = (newTask: Omit<Task, "id" | "completed">) => {
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }])
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const openTaskDetails = (task: Task) => {
    setSelectedTask(task)
    setIsTaskDetailsModalOpen(true)
  }

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
            onDelete={deleteTask}
            onViewDetails={openTaskDetails}
          />
          <TaskList
            title="Pending Tasks"
            tasks={tasks.filter((task) => !task.completed)}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onViewDetails={openTaskDetails}
          />
          <TaskList
            title="Completed Tasks"
            tasks={tasks.filter((task) => task.completed)}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onViewDetails={openTaskDetails}
          />
        </div>

        <div className="mt-8 text-center">
          <button className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            <ChevronDown className="inline-block mr-2 h-5 w-5" /> View All Projects
          </button>
        </div>

        <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} onAddTask={addTask} />

        <TaskDetailsModal
          isOpen={isTaskDetailsModalOpen}
          onClose={() => setIsTaskDetailsModalOpen(false)}
          task={selectedTask}
        />
      </div>
    </div>
  )
}

