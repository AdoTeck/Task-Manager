'use client'
// components/Users.tsx
import { useState } from 'react'
import {
  X,
  Users,
  Plus,
  ClipboardList,
  ChevronRight,
  User,
  Briefcase,
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'


interface User {
  id: string
  name: string
  email: string
  projects: Project[]
  role: string
}

interface Project {
  id: string
  name: string
}

export default function UsersComponent() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [showAddUserPopup, setShowAddUserPopup] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [selectedProjects, setSelectedProjects] = useState<string[]>([])
  const [referenceCode, setReferenceCode] = useState('')
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@taskmanager.com',
      role: 'Developer',
      projects: [
        { id: 'p1', name: 'Marketing Campaign' },
        { id: 'p2', name: 'Product Launch' },
      ],
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@company.com',
      role: 'Designer',
      projects: [
        { id: 'p3', name: 'Website Redesign' },
      ],
    },
    // Add more mock users as needed
  ])
  const [availableUsers] = useState([
    { id: '2', name: 'Sarah Smith', email: 'sarah@company.com' },
    { id: '3', name: 'Mike Johnson', email: 'mike@company.com' },
  ])

  const [availableProjects] = useState([
    { id: 'p3', name: 'Website Redesign' },
    { id: 'p4', name: 'Mobile App Development' },
  ])

  const handleAddUserSubmit = () => {
    console.log('Adding users:', selectedUsers)
    console.log('With projects:', selectedProjects)
    setShowAddUserPopup(false)
    // Reset selections
    setSelectedUsers([])
    setSelectedProjects([])
  }

  const handleReferenceCodeSubmit = async () => {
    // Simulate API call
    const response = await fetch(`http://localhost:5000/api/user/projects/user-access`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ referenceCode }),
    })
    const data = await response.json()
    toast.success(`${JSON.stringify(data.message)}`)
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        {/* Modified Header with Add Button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-yellow-500" />
              Team Members
            </h1>
            <p className="text-muted-foreground mt-2">Manage and view team member activities</p>
          </div>
          <button
            onClick={() => setShowAddUserPopup(true)}
            className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add User
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-8">
          {/* Left Section - Reference Code Input */}
          <div className="w-1/3">
            <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Add Reference Code</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={referenceCode}
                  onChange={(e) => setReferenceCode(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter reference code"
                />
                <button
                  onClick={handleReferenceCodeSubmit}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Users List */}
          <div className="w-2/3">
            <div className="bg-white border border-border rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Team Members</h2>
              <div className="space-y-4">
                {users.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-medium">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                      <p className="text-sm text-muted-foreground">
                        Projects: {user.projects.map(p => p.name).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Details Popup */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Popup Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Users className="h-6 w-6 text-yellow-500" />
                  {selectedUser.name}'s Projects
                </h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Projects List */}
              <div className="p-6 space-y-4">
                {selectedUser.projects.map(project => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ClipboardList className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">{project.name}</span>
                    </div>
                    <button
                      className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2"
                      onClick={() => {
                        // Add navigation logic here
                        console.log('Navigate to project tasks:', project.id)
                      }}
                    >
                      View Tasks
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}

                {/* Empty State */}
                {selectedUser.projects.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No projects assigned to this user
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Add User Popup */}
        {showAddUserPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Popup Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <User className="h-6 w-6 text-yellow-500" />
                  Add New Team Member
                </h2>
                <button
                  onClick={() => setShowAddUserPopup(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {/* Popup Content */}
              <div className="p-6 space-y-8">
                {/* Available Users Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-yellow-500" />
                    Select Users
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {availableUsers.map(user => (
                      <label
                        key={user.id}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedUsers([...selectedUsers, user.id])
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                            }
                          }}
                          className="h-4 w-4 text-yellow-500 border-input rounded focus:ring-yellow-500"
                        />
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Available Projects Section */}
                <div>
                  <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-yellow-500" />
                    Assign Projects
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {availableProjects.map(project => (
                      <label
                        key={project.id}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(project.id)}
                          onChange={e => {
                            if (e.target.checked) {
                              setSelectedProjects([...selectedProjects, project.id])
                            } else {
                              setSelectedProjects(selectedProjects.filter(id => id !== project.id))
                            }
                          }}
                          className="h-4 w-4 text-yellow-500 border-input rounded focus:ring-yellow-500"
                        />
                        <span className="font-medium">{project.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {/* Popup Footer */}
              <div className="flex justify-end gap-4 p-6 border-t border-border">
                <button
                  onClick={() => setShowAddUserPopup(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUserSubmit}
                  className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2"
                >
                  <Plus className="h-5 w-5" />
                  Add Selected Users
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}