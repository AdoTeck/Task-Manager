"use client"

import { useState } from "react"
import { useCreateTaskMutation } from "@/redux/slices/TaskSlice"
import type { Task } from "@/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface AddTaskModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  refetchTasks?: () => void
}

export default function AddTaskModal({ isOpen, onClose, projectId, refetchTasks }: AddTaskModalProps) {
  const [newTask, setNewTask] = useState<Omit<Task, "id">>({
    Title: "",
    Description: "",
    Status: "Pending",
    Deadline: "",
    PriorityLevel: "Medium",
    EstimateTime: 0,
  })

  const [createTask, { isLoading }] = useCreateTaskMutation()

  const handleSubmit = async () => {
    if (newTask.Title && newTask.Deadline) {
      try {
        const taskData = { ...newTask, EstimateTime: newTask.EstimateTime.toString() }
        await createTask({ projectId, taskId: "", taskData }).unwrap()
        setNewTask({
          Title: "",
          Description: "",
          Status: "Pending",
          Deadline: "",
          PriorityLevel: "Medium",
          EstimateTime: 0,
        })
        onClose()
        // Trigger refetch/reload after task addition.
        if (refetchTasks) {
          refetchTasks()
        }
      } catch (error) {
        console.error("Failed to create task:", error)
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogDescription>Fill in the details to create a new task.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={newTask.Title}
              onChange={(e) => setNewTask({ ...newTask, Title: e.target.value })}
              placeholder="Enter task title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Task Description</Label>
            <Textarea
              id="description"
              value={newTask.Description}
              onChange={(e) => setNewTask({ ...newTask, Description: e.target.value })}
              placeholder="Enter task description"
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Task Status</Label>
            <Select
              value={newTask.Status}
              onValueChange={(value) =>
                setNewTask({ ...newTask, Status: value as "Pending" | "In Progress" | "Completed" })
              }
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="datetime-local"
              value={newTask.Deadline}
              onChange={(e) => setNewTask({ ...newTask, Deadline: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select
              value={newTask.PriorityLevel}
              onValueChange={(value) => setNewTask({ ...newTask, PriorityLevel: value as "Low" | "Medium" | "High" })}
            >
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="estimate">Estimate Time (in hours)</Label>
            <Input
              id="estimate"
              type="number"
              value={newTask.EstimateTime}
              onChange={(e) => setNewTask({ ...newTask, EstimateTime: Number.parseInt(e.target.value) || 0 })}
              placeholder="Enter estimate time"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

