"use client"

import { useState, useEffect } from "react"
import { Clock, FolderOpen, CheckCircle, Plus } from "lucide-react"
import MetricCard from "../../components/MetricCard"
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import CreateProjectModal from "../../components/CreateProjectModal"
// import ErrorBoundary from "../../components/ErrorBoundary"

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
//   const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    console.log("Dashboard component mounted")
  }, [])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

//   if (error) {
//     return <div>Error: {error.message}</div>
//   }

  return (
    // <ErrorBoundary>
      <div className="flex flex-col h-screen bg-[#ECECEC]">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="flex flex-1 relative">
          <Sidebar isOpen={sidebarOpen} />
          <main className="flex-1 p-4 overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h1 className="text-2xl font-semibold text-gray-800 mb-8">Dashboard</h1>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <MetricCard title="Work Summary" value="75%" icon={CheckCircle} className="bg-yellow-50" />
                <MetricCard title="Worked This Week" value="40:00:05" icon={Clock} className="bg-yellow-50" />
                <MetricCard title="Project Worked" value="02" icon={FolderOpen} className="bg-yellow-50" />
              </div>

              {/* Create Project Button */}
              <div className="flex justify-end mb-8">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Project
                </button>
              </div>

              {/* Recent Tasks Section */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Tasks</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Task 1</h3>
                      <p className="text-sm text-gray-600">Complete the dashboard design</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Task 2</h3>
                      <p className="text-sm text-gray-600">Review project requirements</p>
                    </div>
                    <span className="text-sm text-gray-500">5 hours ago</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800">Task 3</h3>
                      <p className="text-sm text-gray-600">Update documentation</p>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {/* Create Project Modal */}
        <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={toggleSidebar}></div>
        )}
      </div>
    // </ErrorBoundary>
  )
}

