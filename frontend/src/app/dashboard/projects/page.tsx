"use client"

import { useState } from "react"
import { ChevronRight, Calendar, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

interface Project {
  id: number
  title: string
  description: string
  dueDate: string
  tasksCompleted: number
  totalTasks: number
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: "Website Redesign",
      description: "Overhaul the company website with a modern, responsive design",
      dueDate: "2023-09-30",
      tasksCompleted: 8,
      totalTasks: 15,
    },
    {
      id: 2,
      title: "Mobile App Development",
      description: "Create a cross-platform mobile app for task management",
      dueDate: "2023-11-15",
      tasksCompleted: 3,
      totalTasks: 20,
    },
    {
      id: 3,
      title: "Data Analytics Dashboard",
      description: "Develop a comprehensive analytics dashboard for business insights",
      dueDate: "2023-10-31",
      tasksCompleted: 5,
      totalTasks: 12,
    },
  ])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const calculateProgress = (completed: number, total: number) => {
    return Math.round((completed / total) * 100)
  }

  return (
    <div className="min-h-screen bg-[#e5e7eb] text-foreground p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg mb-8 p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-primary">Projects Overview</h1>
          <p className="text-muted-foreground mt-2">Manage and track all your ongoing projects</p>
        </div>

        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-primary">{project.title}</h2>
                  <p className="text-muted-foreground mt-1">{project.description}</p>
                </div>
                <Link
                  href={`/project/${project.id}`}
                  className="text-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </Link>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Due: {formatDate(project.dueDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium">
                    {project.tasksCompleted} / {project.totalTasks} tasks completed
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium">
                    {calculateProgress(project.tasksCompleted, project.totalTasks)}% complete
                  </span>
                </div>
              </div>
              <div className="mt-4 bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: `${calculateProgress(project.tasksCompleted, project.totalTasks)}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Create New Project
          </button>
        </div>
      </div>
    </div>
  )
}

