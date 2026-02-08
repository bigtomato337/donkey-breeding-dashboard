"use client"

import React from "react"
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts"

interface Entry {
  name: string
  value: number
  fill?: string
}

interface Props {
  costData: Entry[]
  revenueData: Entry[]
}

export function BreakdownPies({ costData, revenueData }: Props) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">成本构成</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={costData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label line={false}>
              {costData.map((entry, idx) => (
                <Cell key={idx} fill={entry.fill || "#8884d8"} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground mb-2">收入构成</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={revenueData} dataKey="value" cx="50%" cy="50%" outerRadius={80} label line={false}>
              {revenueData.map((entry, idx) => (
                <Cell key={idx} fill={entry.fill || "#8884d8"} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => `${v}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default BreakdownPies
