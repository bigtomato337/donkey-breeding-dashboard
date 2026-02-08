"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Download, FileText, FileCheck, FileWarning } from "lucide-react"

// Archive records mock data
const archiveRecords = [
  {
    archiveId: "ARC-2024001",
    earId: "DB-2023001",
    archiveType: "血统证书",
    archiveDate: "2024-01-15",
    status: "正常",
  },
  {
    archiveId: "ARC-2024002",
    earId: "DB-2023002",
    archiveType: "购入合同",
    archiveDate: "2024-01-12",
    status: "正常",
  },
  {
    archiveId: "ARC-2024003",
    earId: "DB-2023003",
    archiveType: "防疫本",
    archiveDate: "2024-01-10",
    status: "正常",
  },
  {
    archiveId: "ARC-2024004",
    earId: "DB-2023004",
    archiveType: "血统证书",
    archiveDate: "2024-01-08",
    status: "缺失",
  },
  {
    archiveId: "ARC-2024005",
    earId: "DB-2023005",
    archiveType: "体检报告",
    archiveDate: "2024-01-05",
    status: "正常",
  },
  {
    archiveId: "ARC-2024006",
    earId: "DB-2023006",
    archiveType: "购入合同",
    archiveDate: "2024-01-03",
    status: "正常",
  },
  {
    archiveId: "ARC-2024007",
    earId: "DB-2023007",
    archiveType: "防疫本",
    archiveDate: "2024-01-02",
    status: "缺失",
  },
  {
    archiveId: "ARC-2024008",
    earId: "DB-2023008",
    archiveType: "血统证书",
    archiveDate: "2024-01-01",
    status: "正常",
  },
  {
    archiveId: "ARC-2024009",
    earId: "DB-2023009",
    archiveType: "配种协议",
    archiveDate: "2023-12-28",
    status: "正常",
  },
  {
    archiveId: "ARC-2024010",
    earId: "DB-2023010",
    archiveType: "体检报告",
    archiveDate: "2023-12-25",
    status: "正常",
  },
]

const statusConfig = {
  "正常": { className: "bg-primary/10 text-primary border-primary/20", icon: FileCheck },
  "缺失": { className: "bg-destructive/10 text-destructive border-destructive/20", icon: FileWarning },
}

const archiveTypeConfig: Record<string, string> = {
  "血统证书": "bg-blue-50 text-blue-700 border-blue-200",
  "购入合同": "bg-purple-50 text-purple-700 border-purple-200",
  "防疫本": "bg-primary/10 text-primary border-primary/20",
  "体检报告": "bg-orange-50 text-orange-700 border-orange-200",
  "配种协议": "bg-pink-50 text-pink-700 border-pink-200",
}

export function ArchiveManagementView() {
  const handleDownload = (archiveId: string) => {
    // Handle download action
    console.log("Downloading:", archiveId)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">档案管理</h2>
          <p className="text-sm text-muted-foreground">电子档案、定期抽查</p>
        </div>
        <Button className="gap-2">
          <FileText className="h-4 w-4" />
          新建档案
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">248</div>
            <p className="text-sm text-muted-foreground">总档案数</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">235</div>
            <p className="text-sm text-muted-foreground">档案完整</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-destructive">13</div>
            <p className="text-sm text-muted-foreground">档案缺失</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">94.8%</div>
            <p className="text-sm text-muted-foreground">完整率</p>
          </CardContent>
        </Card>
      </div>

      {/* Archives Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">电子档案列表</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">档案编号</TableHead>
                <TableHead className="font-semibold">关联耳号</TableHead>
                <TableHead className="font-semibold">档案类型</TableHead>
                <TableHead className="font-semibold">归档日期</TableHead>
                <TableHead className="font-semibold">状态</TableHead>
                <TableHead className="font-semibold text-center">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {archiveRecords.map((record) => {
                const StatusIcon = statusConfig[record.status as keyof typeof statusConfig].icon
                return (
                  <TableRow key={record.archiveId}>
                    <TableCell className="font-medium">{record.archiveId}</TableCell>
                    <TableCell>{record.earId}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={archiveTypeConfig[record.archiveType] || "bg-muted"}
                      >
                        {record.archiveType}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.archiveDate}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`gap-1 ${statusConfig[record.status as keyof typeof statusConfig].className}`}
                      >
                        <StatusIcon className="h-3 w-3" />
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDownload(record.archiveId)}
                        disabled={record.status === "缺失"}
                      >
                        <Download className="h-4 w-4" />
                        <span className="sr-only">下载</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
