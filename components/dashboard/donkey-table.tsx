"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const donkeyData = [
  {
    id: "DB-2023001",
    breed: "德州黑驴",
    status: "健康",
    statusColor: "success" as const,
    lastBreedingDate: "2023-10-12",
    milkYield: "2.8 kg",
  },
  {
    id: "DB-2023002",
    breed: "关中驴",
    status: "观察中",
    statusColor: "warning" as const,
    lastBreedingDate: "2023-09-25",
    milkYield: "2.1 kg",
  },
  {
    id: "DB-2023003",
    breed: "德州黑驴",
    status: "健康",
    statusColor: "success" as const,
    lastBreedingDate: "2023-11-08",
    milkYield: "3.2 kg",
  },
  {
    id: "DB-2023004",
    breed: "广灵驴",
    status: "隔离",
    statusColor: "destructive" as const,
    lastBreedingDate: "2023-08-15",
    milkYield: "0 kg",
  },
  {
    id: "DB-2023005",
    breed: "佳米驴",
    status: "健康",
    statusColor: "success" as const,
    lastBreedingDate: "2023-10-30",
    milkYield: "2.5 kg",
  },
]

const statusConfig = {
  success: { label: "🟢 健康", variant: "default" as const, className: "bg-primary/10 text-primary border-primary/20" },
  warning: { label: "🟡 观察中", variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  destructive: { label: "🔴 隔离", variant: "destructive" as const, className: "bg-destructive/10 text-destructive border-destructive/20" },
}

export function DonkeyTable() {
  return (
    <div className="rounded-lg border border-border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">耳号 ID</TableHead>
            <TableHead className="font-semibold">品种</TableHead>
            <TableHead className="font-semibold">状态</TableHead>
            <TableHead className="font-semibold">最近配种日期</TableHead>
            <TableHead className="font-semibold">最新产奶量</TableHead>
            <TableHead className="text-right font-semibold">操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {donkeyData.map((donkey) => (
            <TableRow key={donkey.id} className="hover:bg-muted/30">
              <TableCell className="font-medium">{donkey.id}</TableCell>
              <TableCell>{donkey.breed}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={statusConfig[donkey.statusColor].className}
                >
                  {statusConfig[donkey.statusColor].label}
                </Badge>
              </TableCell>
              <TableCell>{donkey.lastBreedingDate}</TableCell>
              <TableCell>{donkey.milkYield}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">
                    录入数据
                  </Button>
                  <Button size="sm" variant="ghost">
                    查看详情
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
