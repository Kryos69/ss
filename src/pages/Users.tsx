import { useState } from "react"
import { Crown, Shield, Search, Filter, UserPlus, MoreHorizontal } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatusBadge } from "@/components/StatusBadge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface User {
  id: string
  username: string
  email: string
  role: "premium" | "blacklisted" | "regular"
  accountsOwned: number
  joinDate: string
  lastActive: string
}

export default function Users() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data
  const users: User[] = [
    {
      id: "1",
      username: "poweruser123",
      email: "power@example.com",
      role: "premium",
      accountsOwned: 25,
      joinDate: "2023-12-01",
      lastActive: "2024-01-20"
    },
    {
      id: "2",
      username: "regularjoe",
      email: "joe@example.com",
      role: "regular",
      accountsOwned: 5,
      joinDate: "2024-01-10",
      lastActive: "2024-01-19"
    },
    {
      id: "3",
      username: "troublemaker",
      email: "trouble@example.com",
      role: "blacklisted",
      accountsOwned: 0,
      joinDate: "2024-01-15",
      lastActive: "2024-01-16"
    }
  ]

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const userStats = {
    total: users.length,
    premium: users.filter(u => u.role === "premium").length,
    regular: users.filter(u => u.role === "regular").length,
    blacklisted: users.filter(u => u.role === "blacklisted").length
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage users and their access levels.</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Crown className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.total}</p>
                <p className="text-sm text-muted-foreground">Total Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Crown className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.premium}</p>
                <p className="text-sm text-muted-foreground">Premium</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-success/10 rounded-lg">
                <Crown className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.regular}</p>
                <p className="text-sm text-muted-foreground">Regular</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <Shield className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userStats.blacklisted}</p>
                <p className="text-sm text-muted-foreground">Blacklisted</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Accounts</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.username}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={user.role} />
                  </TableCell>
                  <TableCell className="font-mono">{user.accountsOwned}</TableCell>
                  <TableCell className="text-muted-foreground">{user.joinDate}</TableCell>
                  <TableCell className="text-muted-foreground">{user.lastActive}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Promote to Premium</DropdownMenuItem>
                        <DropdownMenuItem>View Activity</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Blacklist User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}