'use client'

import { ChevronLeft, ChevronRight, Plus, Clock } from 'lucide-react'
import { useState } from 'react'

export default function Timesheet() {
  const [currentWeek, setCurrentWeek] = useState(new Date())
  const [entries, setEntries] = useState([
    { id: 1, task: 'Project Research', hours: [4, 6, 5, 7, 3, 0, 0] },
    { id: 2, task: 'UI Development', hours: [2, 8, 6, 4, 5, 0, 0] },
  ])

  // Date handling utilities
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const getWeekDates = (date: Date) => {
    const start = new Date(date)
    start.setDate(date.getDate() - date.getDay())
    return Array.from({ length: 7 }, (_, i) => {
      const day = new Date(start)
      day.setDate(start.getDate() + i)
      return day
    })
  }

  const handleHourChange = (entryId: number, dayIndex: number, value: string) => {
    const newEntries = entries.map(entry => {
      if (entry.id === entryId) {
        const newHours = [...entry.hours]
        newHours[dayIndex] = Math.min(24, Math.max(0, parseInt(value) || 0))
        return { ...entry, hours: newHours }
      }
      return entry
    })
    setEntries(newEntries)
  }

  return (
    <div className="bg-background text-foreground p-6 rounded-xl border border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Clock className="h-6 w-6 text-yellow-500" />
          Weekly Timesheet
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentWeek(new Date())}
            className="px-4 py-2 bg-card hover:bg-accent text-foreground rounded-lg border border-border"
          >
            Current Week
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() - 7)))
              }
              className="p-2 hover:bg-accent rounded-lg"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                setCurrentWeek(new Date(currentWeek.setDate(currentWeek.getDate() + 7)))
              }
              className="p-2 hover:bg-accent rounded-lg"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Week Dates */}
      <div className="grid grid-cols-8 gap-2 mb-4">
        <div className="col-span-2"></div>
        {getWeekDates(currentWeek).map((date, index) => (
          <div
            key={index}
            className={`text-center p-2 rounded-lg ${
              date.toDateString() === new Date().toDateString()
                ? 'bg-yellow-500/20 border border-yellow-500'
                : 'bg-card'
            }`}
          >
            <div className="text-sm font-medium text-muted-foreground">{daysOfWeek[index]}</div>
            <div className="text-foreground">{date.getDate()}</div>
          </div>
        ))}
      </div>

      {/* Timesheet Entries */}
      <div className="space-y-4">
        {entries.map(entry => (
          <div
            key={entry.id}
            className="grid grid-cols-8 gap-2 items-center bg-card p-3 rounded-lg border border-border"
          >
            <div className="col-span-2 font-medium">{entry.task}</div>
            {entry.hours.map((hours, dayIndex) => (
              <input
                key={dayIndex}
                type="number"
                min="0"
                max="24"
                value={hours}
                onChange={e => handleHourChange(entry.id, dayIndex, e.target.value)}
                className="w-full px-2 py-1 text-center border border-input rounded-md focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Total Hours */}
      <div className="mt-6 grid grid-cols-8 gap-2 items-center bg-card p-3 rounded-lg border border-yellow-500/30">
        <div className="col-span-2 font-medium text-yellow-500">Total Hours</div>
        {Array.from({ length: 7 }).map((_, dayIndex) => (
          <div key={dayIndex} className="text-center font-medium">
            {entries.reduce((sum, entry) => sum + entry.hours[dayIndex], 0)}
          </div>
        ))}
      </div>

      {/* Add Entry Button */}
      <button className="mt-6 w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg flex items-center justify-center gap-2">
        <Plus className="h-4 w-4" />
        Add New Entry
      </button>
    </div>
  )
}
