// 集中 mock 数据，便于未来替换为真实 API
export const monthlyData = [
  { month: "1月", feedingCost: 12000, revenue: 28000, profit: 16000 },
  { month: "2月", feedingCost: 12500, revenue: 32000, profit: 19500 },
  { month: "3月", feedingCost: 13000, revenue: 35000, profit: 22000 },
  { month: "4月", feedingCost: 12800, revenue: 31000, profit: 18200 },
  { month: "5月", feedingCost: 13200, revenue: 36500, profit: 23300 },
  { month: "6月", feedingCost: 13500, revenue: 38000, profit: 24500 },
  { month: "7月", feedingCost: 14000, revenue: 40000, profit: 26000 },
  { month: "8月", feedingCost: 13800, revenue: 37500, profit: 23700 },
  { month: "9月", feedingCost: 13200, revenue: 39000, profit: 25800 },
  { month: "10月", feedingCost: 12900, revenue: 36000, profit: 23100 },
  { month: "11月", feedingCost: 13400, revenue: 38500, profit: 25100 },
  { month: "12月", feedingCost: 14200, revenue: 42000, profit: 27800 },
]

export const costBreakdown = [
  { name: "饲料成本", value: 45, fill: "#ef4444" },
  { name: "防疫医疗", value: 20, fill: "#f97316" },
  { name: "人工管理", value: 18, fill: "#eab308" },
  { name: "设施维护", value: 12, fill: "#84cc16" },
  { name: "其他费用", value: 5, fill: "#22c55e" },
]

export const revenueBreakdown = [
  { name: "驴肉销售", value: 55, fill: "#3b82f6" },
  { name: "种驴销售", value: 30, fill: "#8b5cf6" },
  { name: "奶制品销售", value: 10, fill: "#ec4899" },
  { name: "其他收入", value: 5, fill: "#06b6d4" },
]

export const costDetails = [
  { item: "粗饲料", amount: 8500, percentage: 18 },
  { item: "精饲料", amount: 12000, percentage: 26 },
  { item: "矿物质补充", amount: 3200, percentage: 7 },
  { item: "疫苗接种", amount: 4500, percentage: 10 },
  { item: "医疗用药", amount: 4000, percentage: 9 },
  { item: "人工费用", amount: 6800, percentage: 15 },
  { item: "电费水费", amount: 2000, percentage: 4 },
  { item: "维修费用", amount: 1500, percentage: 3 },
  { item: "其他费用", amount: 1200, percentage: 3 },
]

export const revenueDetails = [
  { item: "驴肉销售", amount: 22000, units: 8, unitPrice: 2750 },
  { item: "种驴销售", amount: 12000, units: 2, unitPrice: 6000 },
  { item: "奶制品销售", amount: 4000, units: 50, unitPrice: 80 },
  { item: "驴毛、皮", amount: 2000, units: 150, unitPrice: 13 },
]

export function calcTotals() {
  const totalFeedingCost = monthlyData.reduce((s, d) => s + d.feedingCost, 0)
  const totalRevenue = monthlyData.reduce((s, d) => s + d.revenue, 0)
  const totalProfit = totalRevenue - totalFeedingCost
  const profitMargin = totalRevenue ? ((totalProfit / totalRevenue) * 100) : 0
  const avgMonthlyProfit = Math.round(totalProfit / monthlyData.length)
  return { totalFeedingCost, totalRevenue, totalProfit, profitMargin, avgMonthlyProfit }
}
