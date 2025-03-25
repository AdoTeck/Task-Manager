"use client"

import { useState, useEffect } from "react"
import { Bell, CheckCircle, AlertTriangle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
        const response = await fetch("http://localhost:5000/api/user/projects/notificationCheck", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const data = await response.json()
        console.log(data)
        // Assuming the API returns an array of notifications
        setNotifications(data.notificationData || [])
      } catch (error) {
        console.error("Error fetching notifications:", error)
      }
    }

    fetchNotifications()
  }, [refreshTrigger]) // Add refreshTrigger as a dependency

  const getNotificationIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const handleMarkAllAsRead = () => {
    // Logic to mark all notifications as read
    setNotifications([]) // Clear notifications for now
    // Trigger refresh after marking all as read
    setRefreshTrigger((prev) => prev + 1)
  }

  const handleAcceptRequest = async (id: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/projects/notificationCheck", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId: id,
          isApproved: true,
          isChecked: true,
          status: "approved",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update notification")
      }

      const updatedRequest = await response.json()
      console.log("Notification updated:", updatedRequest)
      // Trigger refresh after accepting the request
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      console.error("Error handling request:", error)
    }
  }

  const handleDenyRequest = async (id: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/user/projects/notificationCheck", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notificationId: id,
          isApproved: false,
          isChecked: true,
          status: "denied",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update notification")
      }

      const updatedRequest = await response.json()
      console.log("Notification updated:", updatedRequest)

      // Trigger refresh after accepting the request
      setRefreshTrigger((prev) => prev + 1)
    } catch (error) {
      console.error("Error handling request:", error)
    }
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
        variant="ghost"
        size="icon"
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {notifications.length > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
          >
            {notifications.length}
          </Badge>
        )}
      </Button>

      {isNotificationOpen && (
        <Card className="absolute right-0 mt-2 w-80 shadow-lg z-20">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="max-h-96 overflow-y-auto space-y-2">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification._id}
                  className="p-3 hover:bg-muted/50 rounded-md border-b border-border last:border-0"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1">{getNotificationIcon(notification.status)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium">
                        {notification.status === "pending" ? "Request Pending" : "Request Approved"}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {notification.status === "pending"
                          ? "Your request is pending approval."
                          : "Your request has been approved."}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {/* Only show Accept/Deny buttons if status is pending */}
                  {notification.status === "pending" && (
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="default" onClick={() => handleAcceptRequest(notification._id)}>
                        Accept
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDenyRequest(notification._id)}>
                        Deny
                      </Button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="py-3 text-center text-muted-foreground">No new notifications</div>
            )}
          </CardContent>
          <CardFooter className="border-t border-border pt-2">
            <Button variant="ghost" size="sm" className="w-full text-primary" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

