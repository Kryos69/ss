import { Users, Bot, Crown, Shield, Activity, TrendingUp } from "lucide-react"
import { MetricCard } from "@/components/MetricCard"
import { StatusBadge } from "@/components/StatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
  // Mock data - in real app this would come from API
  const metrics = {
    totalAccounts: 2547,
    activeAccounts: 1823,
    premiumUsers: 156,
    blacklistedUsers: 23,
    botStatus: "online" as const,
    uptime: "99.2%"
  }

  const recentActivity = [
    { id: 1, action: "New account created", user: "user_1234", time: "2 minutes ago" },
    { id: 2, action: "Bot restarted", user: "system", time: "15 minutes ago" },
    { id: 3, action: "User promoted to premium", user: "user_5678", time: "1 hour ago" },
    { id: 4, action: "Account blacklisted", user: "user_9999", time: "2 hours ago" },
  ]

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your alt account overview.</p>
        </div>
        <div className="flex items-center space-x-2">
          <StatusBadge status={metrics.botStatus} />
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Activity className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Accounts"
          value={metrics.totalAccounts.toLocaleString()}
          icon={Users}
          trend="+12% from last month"
          trendUp={true}
          variant="primary"
        />
        <MetricCard
          title="Active Accounts"
          value={metrics.activeAccounts.toLocaleString()}
          icon={Activity}
          trend="+8% from last month"
          trendUp={true}
          variant="success"
        />
        <MetricCard
          title="Premium Users"
          value={metrics.premiumUsers}
          icon={Crown}
          trend="+23% from last month"
          trendUp={true}
          variant="warning"
        />
        <MetricCard
          title="Blacklisted Users"
          value={metrics.blacklistedUsers}
          icon={Shield}
          trend="-5% from last month"
          trendUp={false}
          variant="destructive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bot Status Card */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              Bot Status Monitor
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Main Bot</span>
              <StatusBadge status="online" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Backup Bot</span>
              <StatusBadge status="offline" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Uptime</span>
              <span className="text-sm font-mono">{metrics.uptime}</span>
            </div>
            <div className="pt-2 border-t">
              <div className="flex space-x-2">
                <Button size="sm" className="flex-1" variant="outline">
                  <Bot className="mr-2 h-4 w-4" />
                  Restart
                </Button>
                <Button size="sm" className="flex-1" variant="outline">
                  View Logs
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 border-t">
              <Button variant="outline" className="w-full">
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}