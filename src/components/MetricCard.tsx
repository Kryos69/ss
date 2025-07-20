import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: string
  trendUp?: boolean
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive"
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp,
  variant = "default" 
}: MetricCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "primary":
        return "border-primary/20 bg-primary/5"
      case "secondary":
        return "border-secondary/20 bg-secondary/5"
      case "success":
        return "border-success/20 bg-success/5"
      case "warning":
        return "border-warning/20 bg-warning/5"
      case "destructive":
        return "border-destructive/20 bg-destructive/5"
      default:
        return ""
    }
  }

  const getIconColor = () => {
    switch (variant) {
      case "primary":
        return "text-primary"
      case "secondary":
        return "text-secondary"
      case "success":
        return "text-success"
      case "warning":
        return "text-warning"
      case "destructive":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className={`transition-all hover:shadow-lg animate-fade-in ${getVariantClasses()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className={`h-4 w-4 ${getIconColor()}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs ${trendUp ? 'text-success' : 'text-destructive'} mt-1`}>
            {trendUp ? '↗' : '↘'} {trend}
          </p>
        )}
      </CardContent>
    </Card>
  )
}