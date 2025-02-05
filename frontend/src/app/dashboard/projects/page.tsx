"use client"

import { useState, useEffect } from "react"
import { ChevronRight, Calendar, AlertCircle } from "lucide-react"
import Link from "next/link"

interface Project {
  _id: string
  ProjectTitle: string
  ProjectDescription: string
  DueDate: string
  PriorityLevel: string
  Status: string
  Category: string[]
  createdAt: string
  updatedAt: string
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem('token') // Get token from localStorage
        if (!token) {
          setError("Please login to view projects")
          setLoading(false)
          return
        }

        const response = await fetch("http://localhost:5000/api/projects/getProjects", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }

        const result = await response.json()
        if (result.success) {
          setProjects(result.data)
        } else {
          setError(result.error || 'Failed to fetch projects')
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
        setError('Failed to fetch projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e5e7eb] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#e5e7eb] flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <AlertCircle className="text-red-500 mr-2" />
          <span>{error}</span>
        </div>
      </div>
    )
  }

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
            <div key={project._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-primary">{project.ProjectTitle}</h2>
                  <p className="text-muted-foreground mt-1">{project.ProjectDescription}</p>
                </div>
                <Link
                  href={`/dashboard/projects/${project._id}`}
                  className="text-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </Link>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Due: {new Date(project.DueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.Status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.Status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {project.Status}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="px-2 py-1 rounded-full bg-gray-100 text-xs">
                    {project.PriorityLevel}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/dashboard/projects/create" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            Create New Project
          </Link>
        </div>
      </div>
    </div>
  )
}

