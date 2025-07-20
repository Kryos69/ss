import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface StatusBadgeProps {
  status: "online" | "offline" | "error" | "maintenance" | "active" | "inactive" | "premium" | "blacklisted" | "regular"
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "online":
      case "active":
        return {
          label: status.charAt(0).toUpperCase() + status.slice(1),
          className: "bg-success text-success-foreground"
        }
      case "offline":
      case "inactive":
        return {
          label: status.charAt(0).toUpperCase() + status.slice(1),
          className: "bg-muted text-muted-foreground"
        }
      case "error":
        return {
          label: "Error",
          className: "bg-destructive text-destructive-foreground"
        }
      case "maintenance":
        return {
          label: "Maintenance",
          className: "bg-warning text-warning-foreground"
        }
      case "premium":
        return {
          label: "Premium",
          className: "bg-primary text-primary-foreground"
        }
      case "blacklisted":
        return {
          label: "Blacklisted",
          className: "bg-destructive text-destructive-foreground"
        }
      case "regular":
        return {
          label: "Regular",
          className: "bg-accent text-accent-foreground"
        }
      default:
        return {
          label: "Unknown",
          className: "bg-muted text-muted-foreground"
        }
    }
  }

  const config = getStatusConfig()

  return (
    <Badge className={cn(config.className, className)}>
      {config.label}
    </Badge>
  )
}