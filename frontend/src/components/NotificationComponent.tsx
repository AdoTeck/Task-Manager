'use client'

import { useState, useEffect } from 'react'
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react'

interface Notification {
  _id: string
  status: string
  isApproved: boolean
  isChecked: boolean
  createdAt: string
}

export default function NotificationComponent() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Fetch notifications on component mount and when refreshTrigger changes
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/projects/notificationCheck', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        console.log(data)
        // Assuming the API returns an array of notifications
        setNotifications(data.notificationData || [])
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    fetchNotifications()
  }, [refreshTrigger]) // Add refreshTrigger as a dependency

  const getNotificationIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const handleMarkAllAsRead = () => {
    // Logic to mark all notifications as read
    setNotifications([]) // Clear notifications for now
    // Trigger refresh after marking all as read
    setRefreshTrigger(prev => prev + 1)
  }

  const handleAcceptRequest = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/projects/notificationCheck', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isApproved: true,
          isChecked: true,
          status: 'approved',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update notification');
      }
  
      const updatedRequest = await response.json();
      console.log('Notification updated:', updatedRequest);
      
      // Trigger refresh after accepting the request
      setRefreshTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error handling request:', error);
    }
  };
  const handleDenyRequest = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/projects/notificationCheck', {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isApproved: false,
          isChecked: true,
          status: 'denied',
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update notification');
      }
  
      const updatedRequest = await response.json();
      console.log('Notification updated:', updatedRequest);
      
      // Trigger refresh after accepting the request
      setRefreshTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Error handling request:', error);
    }
  };

  return (
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
            {notifications.length > 0 ? (
              notifications.map(notification => (
                <div
                  key={notification._id}
                  className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getNotificationIcon(notification.status)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {notification.status === "pending" ? 'Request Pending' : 'Request Approved'}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {notification.status === "pending"
                          ? 'Your request is pending approval.'
                          : 'Your request has been approved.'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                 {/* Only show Accept/Deny buttons if status is pending */}
{notification.status === "pending" && (
  <div className="flex gap-2 mt-2">
    <button
      className="px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600"
      onClick={handleAcceptRequest}
    >
      Accept
    </button>
    <button
      className="px-3 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
      onClick={handleDenyRequest}
    >
      Deny
    </button>
  </div>
)}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-center text-gray-500">No new notifications</div>
            )}
          </div>

          <div className="px-4 py-2 border-t border-gray-200">
            <button
              onClick={handleMarkAllAsRead}
              className="w-full text-center text-sm text-yellow-600 hover:text-yellow-700"
            >
              Mark all as read
            </button>
          </div>
        </div>
      )}
    </div>
  )
}