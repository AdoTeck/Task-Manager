'use client'

import { useState } from 'react'
import { X, Users, Edit, Trash2, Plus } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  role: string
  projects: Project[]
  permissions: string[]
}

interface Project {
  id: string
  name: string
}

export default function UsersComponent() {
  const [refecode, setRefeCode] = useState('')
  const [filters, setFilters] = useState({
    user: '',
    role: '',
    project: '',
    permission: ''
  })
  const [editData, setEditData] = useState<User | null>(null)
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@taskmanager.com',
      role: 'Developer',
      permissions: ['Edit', 'View'],
      projects: [
        { id: 'p1', name: 'Marketing Campaign' },
        { id: 'p2', name: 'Product Launch' },
      ],
    },
    // ... other users
  ])

  const roles = ['Developer', 'Designer', 'Manager', 'Viewer']
  const permissions = ['Edit', 'View', 'Delete', 'Admin']
  const projects = ['Marketing Campaign', 'Product Launch', 'Website Redesign']
 
  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId))
    toast.success('User deleted successfully')
  }
  const handleReferenceCodeSubmit = async () => {
    const response = await fetch(`http://localhost:5000/api/user/projects/user-access`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refecode }),
    })
    const data = await response.json()
    toast.success(`${JSON.stringify(data.message)}`)
  }

  const handleSaveChanges = () => {
    if (editData) {
      setUsers(users.map(user => user.id === editData.id ? editData : user))
      setEditData(null)
      toast.success('Changes saved successfully')
    }
  }

  return (
    <div className="bg-white min-h-screen p-8">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-yellow-500" />
              Team Management
            </h1>
            <p className="text-gray-500 mt-2">Manage user access and permissions</p>
          </div>
          
          {/* Reference Code & Add Button */}
          <div className="flex gap-2">
            <input
              type="text"
              value={refecode}
              onChange={e => setRefeCode(e.target.value)}
              className="w-48 px-3 py-2 border rounded-md focus:ring-2 focus:ring-yellow-500"
              placeholder="Reference Code"
            />
            <button
              onClick={handleReferenceCodeSubmit}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md"
            >
              Apply
            </button>
        </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
          <div className="grid grid-cols-5 gap-4 items-end">
          <div>
              <label className="text-sm font-medium text-gray-700">User</label>
              <select
                value={filters.user}
                onChange={e => setFilters({...filters, user: e.target.value})}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-yellow-500"
              >
                <option value="">All Users</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Role</label>
              <select
                value={filters.role}
                onChange={e => setFilters({...filters, role: e.target.value})}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All Roles</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Project</label>
              <select
                value={filters.project}
                onChange={e => setFilters({...filters, project: e.target.value})}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All Projects</option>
                {projects.map(project => (
                  <option key={project} value={project}>{project}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Permission</label>
              <select
                value={filters.permission}
                onChange={e => setFilters({...filters, permission: e.target.value})}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="">All Permissions</option>
                {permissions.map(permission => (
                  <option key={permission} value={permission}>{permission}</option>
                ))}
              </select>
            </div>
            <div>
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md flex items-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="border rounded-lg shadow-sm">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Permissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {user.projects.map(project => (
                        <span key={project.id} className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                          {project.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {user.permissions.map(permission => (
                        <span key={permission} className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setEditData(user)}
                        className="text-yellow-600 hover:text-yellow-700 flex items-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Edit User Modal */}
        {editData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold">Edit User - {editData.name}</h2>
                <button
                  onClick={() => setEditData(null)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={editData.role}
                    onChange={e => setEditData({...editData, role: e.target.value})}
                    className="w-full px-3 py-2 border rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Projects</label>
                  <div className="grid grid-cols-2 gap-3">
                    {projects.map(project => (
                      <label key={project} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editData.projects.some(p => p.name === project)}
                          onChange={e => {
                            const updatedProjects = e.target.checked
                              ? [...editData.projects, { id: `p${editData.projects.length + 1}`, name: project }]
                              : editData.projects.filter(p => p.name !== project)
                            setEditData({...editData, projects: updatedProjects})
                          }}
                          className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                        />
                        <span className="text-sm">{project}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                  <div className="grid grid-cols-2 gap-3">
                    {permissions.map(permission => (
                      <label key={permission} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editData.permissions.includes(permission)}
                          onChange={e => {
                            const updatedPermissions = e.target.checked
                              ? [...editData.permissions, permission]
                              : editData.permissions.filter(p => p !== permission)
                            setEditData({...editData, permissions: updatedPermissions})
                          }}
                          className="h-4 w-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
                        />
                        <span className="text-sm">{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    onClick={() => setEditData(null)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}