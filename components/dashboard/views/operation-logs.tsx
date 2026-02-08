"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter } from "lucide-react"

const logsData = [
  {
    id: 1,
    timestamp: "2024-01-15 14:32:15",
    user: "张伟",
    action: "新增",
    module: "种驴档案",
    description: "新增种驴档案 DB-2024001",
    ip: "192.168.1.100",
  },
  {
    id: 2,
    timestamp: "2024-01-15 14:28:00",
    user: "李医生",
    action: "修改",
    module: "疫病防治",
    description: "更新 DB-2023004 检测记录",
    ip: "192.168.1.105",
  },
  {
    id: 3,
    timestamp: "2024-01-15 13:45:30",
    user: "王养殖员",
    action: "录入",
    module: "生产性能",
    description: "录入 DB-2023001 产奶数据 2.8kg",
    ip: "192.168.1.110",
  },
  {
    id: 4,
    timestamp: "2024-01-15 11:20:00",
    user: "张伟",
    action: "删除",
    module: "用户管理",
    description: "删除用户 test_user",
    ip: "192.168.1.100",
  },
  {
    id: 5,
    timestamp: "2024-01-15 10:15:45",
    user: "李医生",
    action: "新增",
    module: "疫病防治",
    description: "新增检测记录 布病检测",
    ip: "192.168.1.105",
  },
  {
    id: 6,
    timestamp: "2024-01-15 09:30:00",
    user: "刘养殖员",
    action: "修改",
    module: "种驴档案",
    description: "修改 DB-2023002 圈舍信息",
    ip: "192.168.1.115",
  },
  {
    id: 7,
    timestamp: "2024-01-14 16:45:20",
    user: "王养殖员",
    action: "录入",
    module: "生产性能",
    description: "录入配种记录 DB-2023003",
    ip: "192.168.1.110",
  },
  {
    id: 8,
    timestamp: "2024-01-14 15:00:00",
    user: "张伟",
    action: "修改",
    module: "用户管理",
    description: "修改用户 vet_chen 角色为禁用",
    ip: "192.168.1.100",
  },
]

const actionConfig = {
  "新增": { className: "bg-primary/10 text-primary border-primary/20" },
  "修改": { className: "bg-blue-100 text-blue-800 border-blue-200" },
  "删除": { className: "bg-destructive/10 text-destructive border-destructive/20" },
  "录入": { className: "bg-orange-100 text-orange-800 border-orange-200" },
}

export function OperationLogsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [moduleFilter, setModuleFilter] = useState<string>("all")
  const [actionFilter, setActionFilter] = useState<string>("all")

  const filteredLogs = logsData.filter((log) => {
    const matchesModule = moduleFilter === "all" || log.module === moduleFilter
    const matchesAction = actionFilter === "all" || log.action === actionFilter
    const matchesSearch = 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesModule && matchesAction && matchesSearch
  })

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">数据操作日志</h2>
        <p className="text-sm text-muted-foreground">查看系统所有用户的操作记录和审计日志</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="搜索用户或操作描述..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="模块筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部模块</SelectItem>
                  <SelectItem value="种驴档案">种驴档案</SelectItem>
                  <SelectItem value="生产性能">生产性能</SelectItem>
                  <SelectItem value="疫病防治">疫病防治</SelectItem>
                  <SelectItem value="用户管理">用户管理</SelectItem>
                </SelectContent>
              </Select>
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="操作筛选" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部操作</SelectItem>
                  <SelectItem value="新增">新增</SelectItem>
                  <SelectItem value="修改">修改</SelectItem>
                  <SelectItem value="删除">删除</SelectItem>
                  <SelectItem value="录入">录入</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">时间</TableHead>
                <TableHead className="font-semibold">操作用户</TableHead>
                <TableHead className="font-semibold">操作类型</TableHead>
                <TableHead className="font-semibold">功能模块</TableHead>
                <TableHead className="font-semibold">操作描述</TableHead>
                <TableHead className="font-semibold">IP 地址</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id} className="hover:bg-muted/30">
                  <TableCell className="text-muted-foreground font-mono text-sm">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={actionConfig[log.action as keyof typeof actionConfig]?.className}
                    >
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.module}</TableCell>
                  <TableCell className="max-w-[300px] truncate">{log.description}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">
                    {log.ip}
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
