"use client"

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface CostItem { item: string; amount: number; percentage: number }
interface RevenueItem { item: string; amount: number; units: number; unitPrice: number }

interface Props {
  costs: CostItem[]
  revenues: RevenueItem[]
}

export function DetailsTables({ costs, revenues }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">年度成本明细</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>项目</TableHead>
                <TableHead className="text-right">总费用</TableHead>
                <TableHead className="text-right">占比</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {costs.map((c, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{c.item}</TableCell>
                  <TableCell className="text-right">¥{c.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right"><Badge variant="outline">{c.percentage}%</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">年度收入明细</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>项目</TableHead>
                <TableHead className="text-right">销售数量</TableHead>
                <TableHead className="text-right">单价</TableHead>
                <TableHead className="text-right">总收入</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {revenues.map((r, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{r.item}</TableCell>
                  <TableCell className="text-right">{r.units}</TableCell>
                  <TableCell className="text-right">¥{r.unitPrice.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium">¥{r.amount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default DetailsTables
