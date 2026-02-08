"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  avgMonthlyProfit: number
  costRatio: number
  perDonkeyProfit: number
}

export function SummaryCard({ avgMonthlyProfit, costRatio, perDonkeyProfit }: Props) {
  return (
    <Card className="bg-gradient-to-r from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="text-lg">年度经营总结</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-3 text-sm">
        <div>
          <span className="text-muted-foreground">平均月利润</span>
          <p className="text-2xl font-bold text-green-600">¥{avgMonthlyProfit.toLocaleString()}</p>
        </div>
        <div>
          <span className="text-muted-foreground">成本占收入比</span>
          <p className="text-2xl font-bold text-orange-600">{costRatio.toFixed(1)}%</p>
        </div>
        <div>
          <span className="text-muted-foreground">年均每头驴利润</span>
          <p className="text-2xl font-bold text-blue-600">¥{Math.round(perDonkeyProfit).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default SummaryCard
