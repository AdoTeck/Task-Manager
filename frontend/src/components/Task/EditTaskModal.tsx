"use client"

import { useState, useEffect } from "react"
import { useUpdateTaskMutation } from "@/redux/slices/TaskSlice"
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

interface EditTaskModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
  projectId: string
  onTaskUpdated?: () => void
}

export default function EditTaskModal({ isOpen, onClose, task, projectId, onTaskUpdated }: EditTaskModalProps) {
  const [editedTask, setEditedTask] = useState(task)
  const [updateTask, { isLoading }] = useUpdateTaskMutation()

  useEffect(() => {
    setEditedTask(task)
  }, [task])

  const handleSubmit = async () => {
    if (editedTask && editedTask.Title && editedTask.Deadline) {
      try {
        const taskData = {
          Title: editedTask.Title,
          Description: editedTask.Description,
          Status: editedTask.Status,
          Deadline: editedTask.Deadline,
          PriorityLevel: editedTask.PriorityLevel,
          EstimateTime: editedTask.EstimateTime.toString(),
        }
        await updateTask({ projectId, taskId: editedTask.id, taskData }).unwrap()
        onClose()
        if (onTaskUpdated) {
          onTaskUpdated()
        }
      } catch (error) {
        console.error("Failed to update task:", error)
      }
    }
  }

  if (!editedTask) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
          <DialogDescription>Make changes to your task here.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={editedTask.Title}
              onChange={(e) => setEditedTask({ ...editedTask, Title: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Task Description</Label>
            <Textarea
              id="description"
              value={editedTask.Description}
              onChange={(e) => setEditedTask({ ...editedTask, Description: e.target.value })}
              rows={4}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="status">Task Status</Label>
            <Select
              value={editedTask.Status}
              onValueChange={(value) => setEditedTask({ ...editedTask, Status: value })}
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
              value={editedTask.Deadline}
              onChange={(e) => setEditedTask({ ...editedTask, Deadline: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select
              value={editedTask.PriorityLevel}
              onValueChange={(value) => setEditedTask({ ...editedTask, PriorityLevel: value })}
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
              value={editedTask.EstimateTime}
              onChange={(e) => setEditedTask({ ...editedTask, EstimateTime: Number.parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Task"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

