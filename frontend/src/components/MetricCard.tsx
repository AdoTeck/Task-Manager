import { MoreVertical } from "lucide-react"

export default function MetricCard({
  title,
  value,
  icon: Icon,
  className = "",
}: {
  title: string
  value: string
  icon: any
  className?: string
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <div className={`p-3 rounded-lg ${className}`}>
          <Icon className="h-6 w-6 text-yellow-500" />
        </div>
      </div>
    </div>
  )
}