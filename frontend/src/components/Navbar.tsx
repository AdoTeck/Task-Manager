import { useState } from "react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie" 
import { Bell, Search, ChevronDown, User, Menu, CheckCircle, AlertTriangle, Info } from "lucide-react"

interface NavbarProps {
  toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const router = useRouter()

  // Mock notifications data
  const [notifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Task completed",
      message: "Design homepage task marked as completed",
      time: "2h ago"
    },
    {
      id: 2,
      type: "warning",
      title: "Deadline approaching",
      message: "Marketing project deadline in 3 days",
      time: "4h ago"
    },
    {
      id: 3,
      type: "info",
      title: "New assignment",
      message: "You've been assigned to the mobile app project",
      time: "1d ago"
    }
  ])

  const handleLogout = () => {
    Cookies.remove("token", { path: "/" })
    router.push("/login")
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
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
            {/* Notification Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="p-2 text-gray-800 hover:text-yellow-600 relative"
              >
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>
              
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                  </div>
                  
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{notification.title}</h4>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-yellow-600 hover:text-yellow-700">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center text-gray-800 hover:text-yellow-600 focus:outline-none"
              >
                <User className="h-8 w-8 rounded-full bg-yellow-200 p-1" />
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                  <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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