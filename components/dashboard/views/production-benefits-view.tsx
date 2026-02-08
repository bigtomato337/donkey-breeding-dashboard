"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, DollarSign, ShoppingCart, PieChart as PieChartIcon } from "lucide-react"

import {
  monthlyData,
  costBreakdown,
  revenueBreakdown,
  costDetails,
  revenueDetails,
  calcTotals,
} from "@/lib/data/production-benefits"
import { KeyMetrics } from "@/components/dashboard/benefits/KeyMetrics"
import { MonthlyTrendChart } from "@/components/dashboard/benefits/MonthlyTrendChart"
import { BreakdownPies } from "@/components/dashboard/benefits/BreakdownPies"
import { DetailsTables } from "@/components/dashboard/benefits/DetailsTables"
import { SummaryCard } from "@/components/dashboard/benefits/SummaryCard"

const { totalFeedingCost, totalRevenue, totalProfit, profitMargin, avgMonthlyProfit } = calcTotals()

export function ProductionBenefitsView() {
  const perDonkeyProfit = (totalProfit / monthlyData.length / 6) * 1000

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">生产效益概览</h2>
        <p className="text-sm text-muted-foreground">汇总年度成本、收入、收益与构成</p>
      </div>

      <KeyMetrics
        totalCost={totalFeedingCost}
        totalRevenue={totalRevenue}
        totalProfit={totalProfit}
        profitMargin={profitMargin}
      />

      <MonthlyTrendChart data={monthlyData as any} />

      <BreakdownPies costData={costBreakdown as any} revenueData={revenueBreakdown as any} />

      <DetailsTables costs={costDetails as any} revenues={revenueDetails as any} />

      <SummaryCard avgMonthlyProfit={avgMonthlyProfit} costRatio={(totalFeedingCost / totalRevenue) * 100} perDonkeyProfit={perDonkeyProfit} />
    </div>
  )
}
