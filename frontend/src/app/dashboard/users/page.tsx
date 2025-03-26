"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Users, Edit, Trash2, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Toaster } from "@/components/ui/toaster";
import { Toast } from "@/components/ui/toast";

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
    const [refecode, setRefeCode] = useState("")
    const [userInfo, setUserInfo] = useState<any[]>([])
    const [editData, setEditData] = useState<User | null>(null)
    const [users, setUsers] = useState<User[]>([
        {
            id: "1",
            name: "John Doe",
            email: "john@taskmanager.com",
            role: "Developer",
            permissions: ["Edit", "View"],
            projects: [
                { id: "p1", name: "Marketing Campaign" },
                { id: "p2", name: "Product Launch" },
            ],
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@taskmanager.com",
            role: "Manager",
            permissions: ["Edit", "View", "Admin"],
            projects: [
                { id: "p1", name: "Marketing Campaign" },
                { id: "p3", name: "Website Redesign" },
            ],
        },
    ])

    const roles = ["Admin", "Developer", "Manager", "Viewer", "Designer"]
    const permissions = ["Editor", "Viewer", "Maintainer"]
    const projects = ["Marketing Campaign", "Product Launch", "Website Redesign"]

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/userinfo/user-data", {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) {
                    throw new Error("Failed to fetch user data")
                }

                const data = await response.json()
                setUserInfo(data.userData)
            } catch (error) {
                console.error("Error fetching user data:", error)
            }
        }

        fetchUserData()
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const payload = { ...data, isApproved: true }

        try {
            const response = await fetch("http://localhost:5000/api/user/projects/add-user", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.message || "Failed to add user.")
            }

            Toast({
                title: "User added successfully!",
                variant: "default",
            })
        } catch (error: any) {
            console.error("Error:", error.message)
            Toast({
                title: "Failed to add user.",
                variant: "destructive",
            })
        }
    }

    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter((user) => user.id !== userId))
        Toast({
            title: "User deleted successfully!",
            variant: "default",
        })
    }

    const handleReferenceCodeSubmit = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/user/projects/user-access", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refecode }),
            })

            const data = await response.json()

            Toast({
                title: data.message,
                variant: "default",
            })
        } catch (error) {
            Toast({
                title: "Failed to apply reference code.",
                variant: "destructive",
            })
        }
    }

    const handleSaveChanges = () => {
        if (editData) {
            setUsers(users.map((user) => (user.id === editData.id ? editData : user)))
            setEditData(null)
            Toast({
                title: "Changes saved successfully!",
                variant: "default",
            })
        }
    }

    return (
        <div className="space-y-6">
            <Toaster />

            <Card>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                    <div>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            <Users className="h-6 w-6 text-primary" />
                            Team Management
                        </CardTitle>
                        <CardDescription>Manage user access and permissions for your projects</CardDescription>
                    </div>

                    <div className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={refecode}
                            onChange={(e) => setRefeCode(e.target.value)}
                            className="w-48"
                            placeholder="Reference Code"
                        />
                        <Button onClick={handleReferenceCodeSubmit}>Apply</Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="border rounded-lg p-4 mb-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                            <div className="space-y-2">
                                <Label htmlFor="userID">User</Label>
                                <Select name="userID">
                                    <SelectTrigger id="userID">
                                        <SelectValue placeholder="Select User" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="default">Select User</SelectItem>
                                        {userInfo.map((item) => (
                                            <SelectItem key={item._id} value={item._id}>
                                                {item.fullName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select name="role">
                                    <SelectTrigger id="role">
                                        <SelectValue placeholder="Select Role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Select Role</SelectItem>
                                        {roles.map((role) => (
                                            <SelectItem key={role} value={role}>
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="projectID">Project</Label>
                                <Select name="projectID">
                                    <SelectTrigger id="projectID">
                                        <SelectValue placeholder="Select Project" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Select Project</SelectItem>
                                        {userInfo.map((item) => (
                                            <SelectItem key={item._id} value={item._id}>
                                                {item.ProjectTitle}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="permission">Permission</Label>
                                <Select name="permission">
                                    <SelectTrigger id="permission">
                                        <SelectValue placeholder="Select Permission" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="">Select Permission</SelectItem>
                                        {permissions.map((permission) => (
                                            <SelectItem key={permission} value={permission}>
                                                {permission}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Button type="submit" className="w-full gap-2">
                                    <Plus className="h-4 w-4" />
                                    Add User
                                </Button>
                            </div>
                        </div>
                    </form>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>User</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Projects</TableHead>
                                    <TableHead>Permissions</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.projects.map((project) => (
                                                    <Badge
                                                        key={project.id}
                                                        variant="secondary"
                                                        className="bg-primary/10 text-primary hover:bg-primary/20"
                                                    >
                                                        {project.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {user.permissions.map((permission) => (
                                                    <Badge
                                                        key={permission}
                                                        variant="outline"
                                                        className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800"
                                                    >
                                                        {permission}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => setEditData(user)}
                                                    className="h-8 w-8 text-primary"
                                                >
                                                    <Edit className="h-4 w-4" />
                                                    <span className="sr-only">Edit</span>
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDeleteUser(user.id)}
                                                    className="h-8 w-8 text-destructive"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span className="sr-only">Delete</span>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* Edit User Dialog */}
            <Dialog open={!!editData} onOpenChange={(open) => !open && setEditData(null)}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Edit User - {editData?.name}</DialogTitle>
                        <DialogDescription>Make changes to user role, projects, and permissions.</DialogDescription>
                    </DialogHeader>

                    {editData && (
                        <div className="grid gap-6 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-role">Role</Label>
                                <Select value={editData.role} onValueChange={(value) => setEditData({ ...editData, role: value })}>
                                    <SelectTrigger id="edit-role">
                                        <SelectValue placeholder="Select role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roles.map((role) => (
                                            <SelectItem key={role} value={role}>
                                                {role}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Projects</Label>
                                <div className="grid grid-cols-2 gap-3 border rounded-md p-4">
                                    {projects.map((project) => (
                                        <div key={project} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`project-${project}`}
                                                checked={editData.projects.some((p) => p.name === project)}
                                                onCheckedChange={(checked) => {
                                                    const updatedProjects = checked
                                                        ? [...editData.projects, { id: `p${editData.projects.length + 1}`, name: project }]
                                                        : editData.projects.filter((p) => p.name !== project)
                                                    setEditData({ ...editData, projects: updatedProjects })
                                                }}
                                            />
                                            <Label htmlFor={`project-${project}`} className="text-sm font-normal">
                                                {project}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Permissions</Label>
                                <div className="grid grid-cols-2 gap-3 border rounded-md p-4">
                                    {permissions.map((permission) => (
                                        <div key={permission} className="flex items-center space-x-2">
                                            <Checkbox
                                                id={`permission-${permission}`}
                                                checked={editData.permissions.includes(permission)}
                                                onCheckedChange={(checked) => {
                                                    const updatedPermissions = checked
                                                        ? [...editData.permissions, permission]
                                                        : editData.permissions.filter((p) => p !== permission)
                                                    setEditData({ ...editData, permissions: updatedPermissions })
                                                }}
                                            />
                                            <Label htmlFor={`permission-${permission}`} className="text-sm font-normal">
                                                {permission}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditData(null)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

