"use client"
import Link from 'next/link'
import { useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'

export default function SignupPage() {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    email: '',
    password: ''
  })
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/signup', formData, {
        headers: { 'Content-Type': 'application/json' }
      })

      toast.success(data.message || 'Account created successfully!')
      setFormData({ userName: '', fullName: '', email: '', password: '' }) // Reset form
      router.push('/login')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Toaster position="top-right" /> {/* Toast notifications */}
      <div className="w-full max-w-md bg-card p-8 rounded-lg shadow-lg border border-border">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground">Get started with our platform</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-foreground mb-2">
              User Name
            </label>
            <input
              type="text"
              id="userName"
              value={formData.userName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-background text-foreground transition-all"
              placeholder="JohnDoe"
              required
            />
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-background text-foreground transition-all"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-background text-foreground transition-all"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 bg-background text-foreground transition-all"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-yellow-500 hover:text-yellow-600 font-semibold">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
