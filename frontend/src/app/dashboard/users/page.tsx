"use client"
// components/Users.tsx
import { useState } from "react";
import { Eye, X, Users, Plus, ClipboardList, ChevronRight ,User, Check, Briefcase} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  projects: Project[];
}

interface Project {
  id: string;
  name: string;
}

export default function UsersComponent() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [users] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@taskmanager.com",
      projects: [
        { id: "p1", name: "Marketing Campaign" },
        { id: "p2", name: "Product Launch" },
      ],
    },
    // Add more mock users as needed
  ]);
  const [availableUsers] = useState([
    { id: "2", name: "Sarah Smith", email: "sarah@company.com" },
    { id: "3", name: "Mike Johnson", email: "mike@company.com" },
  ]);

  const [availableProjects] = useState([
    { id: "p3", name: "Website Redesign" },
    { id: "p4", name: "Mobile App Development" },
  ]);

  const handleAddUserSubmit = () => {
    console.log("Adding users:", selectedUsers);
    console.log("With projects:", selectedProjects);
    setShowAddUserPopup(false);
    // Reset selections
    setSelectedUsers([]);
    setSelectedProjects([]);
  };

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Modified Header with Add Button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Users className="h-8 w-8 text-yellow-500" />
              Team Members
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage and view team member activities
            </p>
          </div>
          <button 
            onClick={() => setShowAddUserPopup(true)}
            className="px-4 py-2.5 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add User
          </button>
        </div>

        {/* Users List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{user.name}</h3>
                  <p className="text-muted-foreground text-sm">{user.email}</p>
                </div>
                <button
                  onClick={() => setSelectedUser(user)}
                  className="p-2 text-muted-foreground hover:text-yellow-600 rounded-lg hover:bg-yellow-50"
                >
                  <Eye className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
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
                {selectedUser.projects.map((project) => (
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
                        console.log("Navigate to project tasks:", project.id);
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
                    {availableUsers.map((user) => (
                      <label 
                        key={user.id}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers([...selectedUsers, user.id]);
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user.id));
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
                    {availableProjects.map((project) => (
                      <label
                        key={project.id}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(project.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProjects([...selectedProjects, project.id]);
                            } else {
                              setSelectedProjects(selectedProjects.filter(id => id !== project.id));
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
  );
}