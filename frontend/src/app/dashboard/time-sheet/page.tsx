"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock, Calendar, BarChart4, Trash2, Save, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface TimeEntry {
  id: number
  task: string
  project: string
  description: string
  hours: number[]
  billable: boolean
}

export default function Timesheet() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [entries, setEntries] = useState<TimeEntry[]>([
    {
      id: 1,
      task: "Project Research",
      project: "Marketing Campaign",
      description: "Initial research and competitor analysis",
      hours: [4, 6, 5, 7, 3, 0, 0],
      billable: true,
    },
    {
      id: 2,
      task: "UI Development",
      project: "Website Redesign",
      description: "Building responsive components",
      hours: [2, 8, 6, 4, 5, 0, 0],
      billable: true,
    },
    {
      id: 3,
      task: "Team Meeting",
      project: "Internal",
      description: "Weekly sync with team members",
      hours: [1, 1, 1, 1, 1, 0, 0],
      billable: false,
    },
  ])
  const [isAddEntryOpen, setIsAddEntryOpen] = useState(false)
  const [newEntry, setNewEntry] = useState<Omit<TimeEntry, "id">>({
    task: "",
    project: "",
    description: "",
    hours: [0, 0, 0, 0, 0, 0, 0],
    billable: true,
  })
  // const [activeView, setActiveView] = useState("week")

  // Date handling utilities
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const getWeekDates = (date: Date) => {
    const start = new Date(date)
    start.setDate(date.getDate() - date.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start)
      day.setDate(start.getDate() + i)
      return day
    })
  }

  const weekDates = getWeekDates(currentWeek)
  const weekStart = weekDates[0]
  const weekEnd = weekDates[6]
  const formattedWeekRange = `${monthNames[weekStart.getMonth()]} ${weekStart.getDate()} - ${weekStart.getMonth() !== weekEnd.getMonth() ? monthNames[weekEnd.getMonth()] + " " : ""
    }${weekEnd.getDate()}, ${weekEnd.getFullYear()}`

  const handlePreviousWeek = () => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() - 7)
    setCurrentWeek(newDate)
  }

  const handleNextWeek = () => {
    const newDate = new Date(currentWeek)
    newDate.setDate(currentWeek.getDate() + 7)
    setCurrentWeek(newDate)
  }

  const handleCurrentWeek = () => {
    setCurrentWeek(new Date())
  }

  const handleHourChange = (entryId: number, dayIndex: number, value: string) => {
    const newEntries = entries.map((entry) => {
      if (entry.id === entryId) {
        const newHours = [...entry.hours]
        newHours[dayIndex] = Math.min(24, Math.max(0, Number.parseInt(value) || 0))
        return { ...entry, hours: newHours }
      }
      return entry
    })
    setEntries(newEntries)
  }

  const handleAddEntry = () => {
    if (newEntry.task && newEntry.project) {
      setEntries([
        ...entries,
        {
          id: Math.max(0, ...entries.map((e) => e.id)) + 1,
          ...newEntry,
        },
      ])
      setNewEntry({
        task: "",
        project: "",
        description: "",
        hours: [0, 0, 0, 0, 0, 0, 0],
        billable: true,
      })
      setIsAddEntryOpen(false)
    }
  }

  const handleDeleteEntry = (id: number) => {
    setEntries(entries.filter((entry) => entry.id !== id))
  }

  const getTotalHours = () => {
    return entries.reduce((total, entry) => total + entry.hours.reduce((sum, h) => sum + h, 0), 0)
  }

  const getDailyTotals = () => {
    return Array.from({ length: 7 }, (_, dayIndex) => entries.reduce((sum, entry) => sum + entry.hours[dayIndex], 0))
  }

  const getBillableHours = () => {
    return entries
      .filter((entry) => entry.billable)
      .reduce((total, entry) => total + entry.hours.reduce((sum, h) => sum + h, 0), 0)
  }

  const dailyTotals = getDailyTotals()
  const totalHours = getTotalHours()
  const billableHours = getBillableHours()
  const billablePercentage = totalHours > 0 ? Math.round((billableHours / totalHours) * 100) : 0

  // Sample projects and tasks for the demo
  const projects = ["Marketing Campaign", "Website Redesign", "Mobile App", "Internal", "Client Meeting"]
  const tasks = ["Development", "Design", "Research", "Meeting", "Documentation", "Testing", "Planning"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0 pb-2">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary" />
              Time Tracking
            </CardTitle>
            <CardDescription>{formattedWeekRange}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Button variant="outline" size="icon" onClick={handlePreviousWeek} title="Previous week">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={handleCurrentWeek}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextWeek} title="Next week">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Week View */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  <th className="text-left font-medium text-muted-foreground p-2 w-[200px]">Task</th>
                  <th className="text-left font-medium text-muted-foreground p-2 w-[150px]">Project</th>
                  {weekDates.map((date, index) => (
                    <th
                      key={index}
                      className={`text-center p-2 w-[80px] ${date.toDateString() === new Date().toDateString() ? "bg-primary/10 dark:bg-primary/20" : ""
                        }`}
                    >
                      <div className="text-sm font-medium">{daysOfWeek[index]}</div>
                      <div className="text-sm">{date.getDate()}</div>
                    </th>
                  ))}
                  <th className="text-center font-medium text-muted-foreground p-2 w-[80px]">Total</th>
                  <th className="w-[50px]"></th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry.id} className="border-t border-border hover:bg-muted/50 group">
                    <td className="p-2">
                      <div className="font-medium">{entry.task}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[180px]">{entry.description}</div>
                    </td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <span className="text-sm">{entry.project}</span>
                        {entry.billable && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800"
                          >
                            Billable
                          </Badge>
                        )}
                      </div>
                    </td>
                    {entry.hours.map((hours, dayIndex) => (
                      <td
                        key={dayIndex}
                        className={`p-1 text-center ${weekDates[dayIndex].toDateString() === new Date().toDateString()
                          ? "bg-primary/10 dark:bg-primary/20"
                          : ""
                          }`}
                      >
                        <Input
                          type="number"
                          min="0"
                          max="24"
                          value={hours}
                          onChange={(e) => handleHourChange(entry.id, dayIndex, e.target.value)}
                          className="w-full h-9 text-center"
                        />
                      </td>
                    ))}
                    <td className="p-2 text-center font-medium">{entry.hours.reduce((sum, h) => sum + h, 0)}</td>
                    <td className="p-2 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteEntry(entry.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-border bg-muted/50">
                  <td colSpan={2} className="p-2 font-medium">
                    Daily Totals
                  </td>
                  {dailyTotals.map((total, index) => (
                    <td
                      key={index}
                      className={`p-2 text-center font-medium ${weekDates[index].toDateString() === new Date().toDateString()
                        ? "bg-primary/10 dark:bg-primary/20"
                        : ""
                        }`}
                    >
                      {total}
                    </td>
                  ))}
                  <td className="p-2 text-center font-medium">{totalHours}</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-t pt-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Total Hours:</span>
              <span className="text-lg font-bold">{totalHours}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Billable:</span>
              <span className="text-sm font-medium">
                {billableHours} hours ({billablePercentage}%)
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Dialog open={isAddEntryOpen} onOpenChange={setIsAddEntryOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Time Entry
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Time Entry</DialogTitle>
                  <DialogDescription>Create a new time entry for your timesheet.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="task">Task</Label>
                    <Select value={newEntry.task} onValueChange={(value) => setNewEntry({ ...newEntry, task: value })}>
                      <SelectTrigger id="task">
                        <SelectValue placeholder="Select task" />
                      </SelectTrigger>
                      <SelectContent>
                        {tasks.map((task) => (
                          <SelectItem key={task} value={task}>
                            {task}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="project">Project</Label>
                    <Select
                      value={newEntry.project}
                      onValueChange={(value) => setNewEntry({ ...newEntry, project: value })}
                    >
                      <SelectTrigger id="project">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project} value={project}>
                            {project}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newEntry.description}
                      onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                      placeholder="Brief description of work done"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor="billable" className="flex items-center gap-2 cursor-pointer">
                      <input
                        id="billable"
                        type="checkbox"
                        checked={newEntry.billable}
                        onChange={(e) => setNewEntry({ ...newEntry, billable: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span>Billable</span>
                    </Label>
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddEntryOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddEntry}>Add Entry</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              Save Timesheet
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Time Summary Card */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <BarChart4 className="h-5 w-5 text-primary" />
              Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Hours by Project</h4>
                <div className="space-y-2">
                  {projects
                    .filter((project) => entries.some((entry) => entry.project === project))
                    .map((project) => {
                      const projectHours = entries
                        .filter((entry) => entry.project === project)
                        .reduce((sum, entry) => sum + entry.hours.reduce((h, curr) => h + curr, 0), 0)

                      const percentage = totalHours > 0 ? (projectHours / totalHours) * 100 : 0

                      return (
                        <div key={project}>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-sm">{project}</span>
                            <span className="text-sm font-medium">{projectHours}h</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Daily Distribution</h4>
                <div className="grid grid-cols-7 gap-1 mt-2">
                  {dailyTotals.map((hours, index) => {
                    const maxHeight = Math.max(...dailyTotals) > 0 ? Math.max(...dailyTotals) : 8
                    const height = hours > 0 ? (hours / maxHeight) * 100 : 0

                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-full flex justify-center items-end h-24">
                          <div
                            className={`w-full max-w-[30px] rounded-t-sm ${weekDates[index].toDateString() === new Date().toDateString()
                              ? "bg-primary"
                              : "bg-primary/60"
                              }`}
                            style={{ height: `${height}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-muted-foreground mt-1">{daysOfWeek[index][0]}</span>
                        <span className="text-xs font-medium">{hours}h</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              Quick Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Filter by Project</h4>
                <div className="flex flex-wrap gap-2">
                  {projects
                    .filter((project) => entries.some((entry) => entry.project === project))
                    .map((project) => (
                      <Badge key={project} variant="outline" className="cursor-pointer hover:bg-primary/10">
                        {project}
                      </Badge>
                    ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Export Timesheet
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <BarChart4 className="h-4 w-4 mr-2" />
                    View Reports
                  </Button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Time Tracking Tips</h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg leading-none">•</span>
                    <span>Track time daily for more accurate reporting</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg leading-none">•</span>
                    <span>Use descriptions to provide context for your entries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary text-lg leading-none">•</span>
                    <span>Mark billable time to track client-related work</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

