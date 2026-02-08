"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCountAnimation } from "@/hooks/use-count-animation"

interface Props {
  totalCost: number
  totalRevenue: number
  totalProfit: number
  profitMargin: number
}

export function KeyMetrics({ totalCost, totalRevenue, totalProfit, profitMargin }: Props) {
  const animCost = useCountAnimation(Math.round(totalCost / 10000), 1200)
  const animRevenue = useCountAnimation(Math.round(totalRevenue / 10000), 1200)
  const animProfit = useCountAnimation(Math.round(totalProfit / 10000), 1200)
  const animMargin = useCountAnimation(Math.round(profitMargin), 1200)

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">年度成本</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">¥{animCost}</div>
          <p className="text-xs text-muted-foreground mt-1">万元</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">年度收入</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">¥{animRevenue}</div>
          <p className="text-xs text-muted-foreground mt-1">万元</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">年度收益</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">¥{animProfit}</div>
          <p className="text-xs text-muted-foreground mt-1">万元</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">利润率</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600">{animMargin}%</div>
          <p className="text-xs text-muted-foreground mt-1">年均利润率</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default KeyMetrics
