"use client"

import type React from "react"

import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { useState } from "react"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex flex-col h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark transition-colors duration-300">
      <div className="sticky top-0 z-10 backdrop-blur-md bg-background/80 dark:bg-background-dark/80 border-b border-border transition-colors duration-300">  
        <Navbar toggleSidebar={toggleSidebar} />
      </div>
      <div className="flex flex-1 relative">
        <Sidebar isOpen={sidebarOpen} />
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : ""}`}>
          {children}
        </main>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" onClick={toggleSidebar}></div>
      )}
    </div>
  )
}

