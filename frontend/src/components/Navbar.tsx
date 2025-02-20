"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { connectSocket, getSocket } from "@/utils/socketService"; // Importing the socket service
import {
  Bell,
  ChevronDown,
  User,
  Menu,
  CheckCircle,
  AlertTriangle,
  Info,
} from "lucide-react";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const userId = "user_id_here"; // Replace with actual logged-in user's ID
    connectSocket(userId); // Ensure the socket is initialized
    const socket = getSocket();
    
    socket.on("request_status_update", (data) => {
      setNotifications((prev) => [...prev, {
        id: Date.now(),
        type: data.status === "approved" ? "success" : "warning",
        title: "Access Request Update",
        message: `Your access request was ${data.status}`,
        time: "Just now",
      }]);
    });
  
    return () => {
      socket.off("request_status_update");
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "request":
        return <Info className="h-5 w-5 text-blue-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleAcceptRequest = (id: number, requestId: string, ownerId: string) => {
    getSocket().emit("respond_request", { requestId, ownerId, response: "approved" });
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleDenyRequest = (id: number, requestId: string, ownerId: string) => {
    getSocket().emit("respond_request", { requestId, ownerId, response: "denied" });
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

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

                            {/* Request Bar for Notifications Requiring Action */}
                            {notification.type === "request" && (
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => handleAcceptRequest(notification.id, "requestId", "ownerId")}
                                  className="px-3 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleDenyRequest(notification.id, "requestId", "ownerId")}
                                  className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                  Deny
                                </button>
                              </div>
                            )}
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
                  <a
                    href="/dashboard/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
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
  );
}
