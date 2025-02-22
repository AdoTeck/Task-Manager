'use client'
import Link from 'next/link'
import { ChevronLeft, User, Mail, Lock, Bell, Upload, CheckCircle, Link2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function ProfilePage() {
  const [showSuccess, setShowSuccess] = useState(false)
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    totalProjects: 0,
    refecode: '',
  })
  const fullNameRef = useRef<HTMLInputElement>(null)
  const newPasswordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Fetch user profile details
    fetch('http://localhost:5000/api/auth/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setProfile(data)
      })
      .catch(error => {
        console.error('Error fetching profile:', error)
      })
  }, [])

  const handleSaveChanges = () => {
    const updatedProfile = {
      fullName: fullNameRef.current?.value || profile.fullName,
      password: newPasswordRef.current?.value,
    }

    fetch('http://localhost:5000/api/auth/profile', {
      method: 'PATCH',
      credentials: 'include', // Ensure cookies are sent with the request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProfile),
    })
      .then(response => {
        if (response.ok) {
          setShowSuccess(true)
        } else {
          throw new Error('Error updating profile')
        }
      })
      .catch(error => {
        console.error('Error updating profile:', error)
      })
  }
  // Demo password strength calculation
  const calculateStrength = (password: string) => {
    return Math.min(password.length * 10, 100)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg hover:bg-accent transition-colors text-yellow-500 hover:text-yellow-600"
          >
            <ChevronLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
        </div>

        {/* Success Notification */}
        {showSuccess && (
          <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5" />
            Profile updated successfully!
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <div className="flex flex-col items-center">
                <div className="relative group">
                  <div className="h-32 w-32 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <User className="h-16 w-16 text-yellow-500" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-yellow-500 p-2 rounded-full shadow-md hover:bg-yellow-600 transition-colors">
                    <Upload className="h-5 w-5 text-white" />
                    <input type="file" className="hidden" />
                  </button>
                </div>
                <h2 className="text-xl font-semibold mt-4">{profile.fullName}</h2>
                <p className="text-muted-foreground flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </p>
              </div>
            </div>

            {/* Account Stats */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="font-medium mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-yellow-500" />
                Account Overview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Projects</span>
                  <span className="font-medium">{profile.totalProjects}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed Tasks</span>
                  <span className="font-medium">42</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="font-medium">2023</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Settings */}
          <div className="md:col-span-2 space-y-8">
            {/* Personal Information Section */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    defaultValue={profile.fullName}
                    ref={fullNameRef}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-card focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={profile.email}
                      disabled
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-card opacity-75 cursor-not-allowed pr-10"
                    />
                    <Mail className="h-5 w-5 text-muted-foreground absolute right-3 top-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Security Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter new password"
                      ref={newPasswordRef}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-card focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all pr-10"
                    />
                    <Lock className="h-5 w-5 text-muted-foreground absolute right-3 top-3" />
                  </div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 transition-all duration-300"
                      style={{
                        width: `${calculateStrength(newPasswordRef.current?.value || '')}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      ref={confirmPasswordRef}
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-card focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all pr-10"
                    />
                    <Lock className="h-5 w-5 text-muted-foreground absolute right-3 top-3" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Referral Code
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={profile.refecode}
                      disabled
                      className="w-full px-4 py-2.5 rounded-lg border border-input bg-card opacity-75 cursor-not-allowed pr-10"
                    />
                    <Link2 className="h-5 w-5 text-muted-foreground absolute right-3 top-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications Section */}
            <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Bell className="h-5 w-5 text-yellow-500" />
                Notification Preferences
              </h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Email Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-yellow-500 border-input rounded focus:ring-yellow-500"
                      />
                      <span>Task assignment notifications</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-yellow-500 border-input rounded focus:ring-yellow-500"
                      />
                      <span>Project deadline reminders</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-muted-foreground">Push Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-3 hover:bg-accent rounded-lg cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-yellow-500 border-input rounded focus:ring-yellow-500"
                      />
                      <span>Important activity alerts</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-red-50/30 border border-red-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h3>
              <div className="flex flex-col gap-3">
                <p className="text-sm text-red-500">
                  Deleting your account will permanently remove all your data.
                </p>
                <button className="w-fit px-4 py-2.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors flex items-center gap-2">
                  Delete Account
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSaveChanges}
                className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
