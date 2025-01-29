import { useState } from "react"
import { Bell, Search, ChevronDown, User, Menu } from "lucide-react"

interface NavbarProps {
  toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-8xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-gray-800 p-2 rounded-md lg:hidden focus:outline-none focus:ring-2 focus:ring-yellow-400 mr-2"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-gray-800">Task Manager</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-100 text-gray-800 rounded-l-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <button className="absolute right-0 top-0 h-full px-4 bg-yellow-400 text-white rounded-r-full hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600">
                Search
              </button>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 rounded-full text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <Bell className="h-6 w-6" />
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-10">
                  <div className="px-4 py-2 font-semibold border-b">Notifications</div>
                  <div className="max-h-64 overflow-y-auto">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      New task assigned to you
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Project deadline reminder
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Team meeting scheduled
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative ml-4">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-800 hover:text-yellow-600 focus:outline-none"
              >
                <User className="h-8 w-8 rounded-full bg-yellow-200 p-1" />
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

