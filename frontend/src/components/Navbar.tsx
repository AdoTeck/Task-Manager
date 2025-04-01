"use client"

import { useRouter } from "next/navigation"
import { Menu, LogOut, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import NotificationComponent from "./notification-component"

interface NavbarProps {
  toggleSidebar: () => void
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        router.push("/login")
      } else {
        throw new Error("Logout failed")
      }
    } catch (error) {
      console.error("Logout error:", error)
      // You might want to show an error message to the user here
    }
  }
  const handleprofile = () => {
    router.push("/dashboard/profile")
  }

  return (
    <nav className="bg-background dark:bg-background-dark border-b border-border transition-colors duration-300">
      <div className="max-w-8xl mx-auto px-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button onClick={toggleSidebar} variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary">ProjectPro</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <NotificationComponent />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" 
                  onClick={handleprofile}
                  />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}

