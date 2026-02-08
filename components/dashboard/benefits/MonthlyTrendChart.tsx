"use client"

import React from "react"
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"

interface Props {
  data: Array<{ month: string; feedingCost: number; revenue: number; profit: number }>
}

export function MonthlyTrendChart({ data }: Props) {
  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v: number) => `¥${v}`} />
          <Legend />
          <Line type="monotone" dataKey="feedingCost" stroke="#ef4444" name="喂养成本" strokeWidth={2} />
          <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="销售收入" strokeWidth={2} />
          <Line type="monotone" dataKey="profit" stroke="#22c55e" name="净利润" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyTrendChart
