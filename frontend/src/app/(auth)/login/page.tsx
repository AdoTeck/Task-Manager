"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"

// Google client ID from your environment variables
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Initialize Google API
  useEffect(() => {
    // Load the Google Identity Services script
    const loadGoogleScript = () => {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      document.body.appendChild(script)
      
      script.onload = initializeGoogleButton
    }

    // Initialize the Google button after script loads
    const initializeGoogleButton = () => {
      if (window.google && GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleResponse
        })
        
        window.google.accounts.id.renderButton(
          document.getElementById('googleSignInDiv')!,
          { theme: 'outline', size: 'large', width: '100%' }
        )
      }
    }

    loadGoogleScript()
    
    // Cleanup
    return () => {
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]')
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // Handle Google Sign-In response
  interface GoogleResponse {
    credential: string;
  }

  const handleGoogleResponse = async (response: GoogleResponse) => {
    setError("")
    setIsLoading(true)
    
    try {
      // Send the ID token to the backend
      const serverResponse = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: response.credential }),
        credentials: "include",
      })

      const data = await serverResponse.json()

      if (!serverResponse.ok) {
        throw new Error(data.message || "Google login failed")
      }

      // Redirect to dashboard after successful login
      router.push("/dashboard")
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  interface LoginFormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement
    password: HTMLInputElement
  }

  interface LoginForm extends HTMLFormElement {
    readonly elements: LoginFormElements
  }

  const handleSubmit = async (e: React.FormEvent<LoginForm>) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const email = e.currentTarget.elements.email.value
    const password = e.currentTarget.elements.password.value

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      // Redirect to dashboard or home page
      router.push("/dashboard")
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark text-foreground dark:text-foreground-dark flex flex-col items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute top-4 left-4 flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md border-border bg-card dark:bg-card/80 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Please sign in to continue</CardDescription>
        </CardHeader>

        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                className="bg-background dark:bg-background-dark"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                  className="bg-background dark:bg-background-dark"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card dark:bg-card/80 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Google Sign-In button rendered by Google's SDK */}
            <div id="googleSignInDiv" className="w-full"></div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

// Add TypeScript declaration for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
          renderButton: (element: HTMLElement, options: { theme: string; size: string; width?: string }) => void;
          prompt: () => void;
        };
      };
    };
  }
}