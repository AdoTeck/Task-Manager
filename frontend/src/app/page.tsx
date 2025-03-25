"use client"

import { useState, useEffect } from "react"
import { Clock, FolderOpen, CheckCircle, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CreateProjectModal from "@/components/create-project-modal"
import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { ThemeToggle } from "@/components/theme-toggle"

interface Project {
  id: string
  name: string
  // Add other project properties as needed
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  useEffect(() => {
    console.log("Dashboard component mounted")
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects/getProjects", {
        method: "GET",
        credentials: "include", // Ensures HTTPOnly cookie is sent automatically
        headers: {
          "Content-Type": "application/json",
        },
      })
      const result = await response.json()
      if (response.ok) {
        setProjects(result.data)
      } else {
        console.error("Failed to fetch projects:", result.message)
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark flex flex-col transition-colors duration-300">
      {/* Navbar */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-background/80 dark:bg-background-dark/80 border-b border-border transition-colors duration-300">
        <div className="flex items-center justify-end p-2 pr-4">
          <ThemeToggle />
        </div>
        <Navbar toggleSidebar={toggleSidebar} />
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} />

        {/* Main Content */}
        <main className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-2xl font-semibold mb-8">Dashboard</h1>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-primary/5 dark:bg-primary/10 border-primary/20 transition-colors duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Work Summary</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-2xl font-bold">75%</div>
                  <CheckCircle className="h-8 w-8 text-primary" />
                </CardContent>
              </Card>

              <Card className="bg-accent/5 dark:bg-accent/10 border-accent/20 transition-colors duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Worked This Week</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-2xl font-bold">40:00:05</div>
                  <Clock className="h-8 w-8 text-accent" />
                </CardContent>
              </Card>

              <Card className="bg-secondary/5 dark:bg-secondary/10 border-secondary/20 transition-colors duration-300">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Projects</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{projects.length}</div>
                  <FolderOpen className="h-8 w-8 text-secondary" />
                </CardContent>
              </Card>
            </div>

            {/* Create Project Button */}
            <div className="flex justify-end mb-8">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create New Project
              </Button>
            </div>

            {/* Recent Tasks Section */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg transition-colors duration-300">
                  <div>
                    <h3 className="text-lg font-medium">Task 1</h3>
                    <p className="text-sm text-muted-foreground">Complete the dashboard design</p>
                  </div>
                  <span className="text-sm text-muted-foreground">2 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg transition-colors duration-300">
                  <div>
                    <h3 className="text-lg font-medium">Task 2</h3>
                    <p className="text-sm text-muted-foreground">Review project requirements</p>
                  </div>
                  <span className="text-sm text-muted-foreground">5 hours ago</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-primary/5 dark:bg-primary/10 rounded-lg transition-colors duration-300">
                  <div>
                    <h3 className="text-lg font-medium">Task 3</h3>
                    <p className="text-sm text-muted-foreground">Update documentation</p>
                  </div>
                  <span className="text-sm text-muted-foreground">1 day ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

