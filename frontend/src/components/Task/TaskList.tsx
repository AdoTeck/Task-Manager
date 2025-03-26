"use client"

import { Eye, Trash2, Edit, CheckCircle, XCircle } from "lucide-react"
import type { Task } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface TaskListProps {
  title: string
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onViewDetails: (task: Task) => void
  onEdit: (task: Task) => void
}

export default function TaskList({ title, tasks, onToggle, onDelete, onViewDetails, onEdit }: TaskListProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20"
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-900/40"
      default:
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-900/40"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">No tasks found</p>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="group relative flex flex-col space-y-2 rounded-md border border-border p-4 hover:border-primary/50 transition-colors duration-200"
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`font-medium ${task.Status === "Completed" ? "line-through text-muted-foreground" : ""}`}
                >
                  {task.Title}
                </h3>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(task)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View details</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(task)}
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit task</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(task.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete task</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Badge className={getPriorityColor(task.PriorityLevel)}>{task.PriorityLevel}</Badge>
                <span className="text-muted-foreground">Due {formatDate(task.Deadline)}</span>
                <span className="text-muted-foreground">{task.EstimateTime}h</span>
              </div>

              {/* Status Toggle Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onToggle(task.id)}
                className="absolute bottom-3 right-3 h-8 w-8"
                title={task.Status === "Completed" ? "Mark as pending" : "Mark as completed"}
              >
                {task.Status === "Completed" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="sr-only">{task.Status === "Completed" ? "Mark as pending" : "Mark as completed"}</span>
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

