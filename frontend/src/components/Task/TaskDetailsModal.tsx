"use client"

import type { Task } from "@/types"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TaskDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  task: Task | null
}

export default function TaskDetailsModal({ isOpen, onClose, task }: TaskDetailsModalProps) {
  if (!task) return null

  const formatDueTime = (dueTime: string) => {
    const date = new Date(dueTime)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20"
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/40"
      default:
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{task.Title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Description</h4>
            <p className="text-sm text-muted-foreground">{task.Description || "No description provided."}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Status</h4>
            <p className="text-sm text-muted-foreground">{task.Status}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Deadline</h4>
            <p className="text-sm text-muted-foreground">{formatDueTime(task.Deadline)}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Priority</h4>
            <Badge className={getPriorityColor(task.PriorityLevel)}>{task.PriorityLevel}</Badge>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1">Estimated Time</h4>
            <p className="text-sm text-muted-foreground">{task.EstimateTime} hours</p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

