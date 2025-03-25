import type { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  className?: string
}

export default function MetricCard({ title, value, icon: Icon, className }: MetricCardProps) {
  return (
    <Card className={`transition-colors duration-300 ${className}`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="text-2xl font-bold">{value}</div>
        <Icon className="h-8 w-8 text-primary" />
      </CardContent>
    </Card>
  )
}

