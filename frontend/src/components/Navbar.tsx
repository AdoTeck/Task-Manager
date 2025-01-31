import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie" 
import { Bell, Search, ChevronDown, User, Menu } from "lucide-react"

interface NavbarProps {
  toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove("token") // Remove token from cookies
    router.push("/login") // Redirect to login page
  }

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
            <div className="relative">
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
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
