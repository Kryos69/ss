import { Play, Pause, RotateCcw, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/StatusBadge"
import { Progress } from "@/components/ui/progress"

export default function BotMonitor() {
  // Mock data
  const bots = [
    {
      id: "1",
      name: "Main Account Bot",
      status: "online" as const,
      uptime: "15d 8h 42m",
      lastRestart: "2024-01-05 14:30",
      tasksCompleted: 15420,
      errors: 2,
      cpu: 23,
      memory: 67
    },
    {
      id: "2",
      name: "Backup Bot",
      status: "offline" as const,
      uptime: "0d 0h 0m",
      lastRestart: "2024-01-20 09:15",
      tasksCompleted: 0,
      errors: 0,
      cpu: 0,
      memory: 0
    },
    {
      id: "3",
      name: "Monitoring Bot",
      status: "maintenance" as const,
      uptime: "2d 4h 15m",
      lastRestart: "2024-01-18 10:00",
      tasksCompleted: 890,
      errors: 1,
      cpu: 15,
      memory: 42
    }
  ]

  const logs = [
    { id: 1, timestamp: "2024-01-20 15:30:25", level: "info", message: "Account bot started successfully" },
    { id: 2, timestamp: "2024-01-20 15:28:42", level: "error", message: "Failed to connect to Discord API" },
    { id: 3, timestamp: "2024-01-20 15:25:10", level: "info", message: "Task queue processed: 50 items" },
    { id: 4, timestamp: "2024-01-20 15:20:05", level: "warning", message: "High memory usage detected" },
  ]

  const getLogIcon = (level: string) => {
    switch (level) {
      case "error":
        return <AlertCircle className="h-4 w-4 text-destructive" />
      case "warning":
        return <Clock className="h-4 w-4 text-warning" />
      default:
        return <CheckCircle className="h-4 w-4 text-success" />
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bot Monitor</h1>
          <p className="text-muted-foreground">Monitor and control your bot instances.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <RotateCcw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Play className="mr-2 h-4 w-4" />
            Start All
          </Button>
        </div>
      </div>

      {/* Bot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bots.map((bot) => (
          <Card key={bot.id} className="animate-fade-in">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{bot.name}</CardTitle>
                <StatusBadge status={bot.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Uptime</p>
                  <p className="font-mono">{bot.uptime}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tasks</p>
                  <p className="font-mono">{bot.tasksCompleted.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Errors</p>
                  <p className="font-mono text-destructive">{bot.errors}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Last Restart</p>
                  <p className="font-mono text-xs">{bot.lastRestart}</p>
                </div>
              </div>

              {/* Resource Usage */}
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CPU</span>
                    <span>{bot.cpu}%</span>
                  </div>
                  <Progress value={bot.cpu} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Memory</span>
                    <span>{bot.memory}%</span>
                  </div>
                  <Progress value={bot.memory} className="h-2" />
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex space-x-2 pt-2">
                {bot.status === "online" ? (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Pause className="mr-1 h-3 w-3" />
                    Stop
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="flex-1">
                    <Play className="mr-1 h-3 w-3" />
                    Start
                  </Button>
                )}
                <Button variant="outline" size="sm" className="flex-1">
                  <RotateCcw className="mr-1 h-3 w-3" />
                  Restart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg border bg-muted/20">
                {getLogIcon(log.level)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{log.message}</p>
                    <span className="text-xs text-muted-foreground font-mono">{log.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full">
              View Full Logs
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}