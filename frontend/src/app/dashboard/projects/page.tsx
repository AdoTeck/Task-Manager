"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Calendar, CheckCircle2, Clock } from "lucide-react"
import Link from "next/link"

interface Project {
  id: string
  ProjectTitle: string
  ProjectDescription: string
  DueDate: string
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects/getProjects")
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      }
    }

    fetchProjects()
  }, [])

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options)
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
                  <h2 className="text-2xl font-semibold text-primary">{project.ProjectTitle}</h2>
                  <p className="text-muted-foreground mt-1">{project.ProjectDescription}</p>
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
                <span>Due: {formatDate(project.DueDate)}</span>
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

