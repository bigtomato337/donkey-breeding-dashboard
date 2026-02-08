"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
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
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingDown, AlertCircle, Plus, Edit2, Trash2 } from "lucide-react"

// Initial monthly cost data
const initialMonthlyCostData = [
  { month: "1月", feedCost: 6000, vaccineDisease: 2000, labor: 2000, facility: 2000, other: 1000 },
  { month: "2月", feedCost: 6200, vaccineDisease: 2100, labor: 2050, facility: 1900, other: 1150 },
  { month: "3月", feedCost: 6500, vaccineDisease: 1800, labor: 2100, facility: 2000, other: 1600 },
  { month: "4月", feedCost: 6400, vaccineDisease: 2200, labor: 1950, facility: 2000, other: 1250 },
  { month: "5月", feedCost: 6600, vaccineDisease: 2000, labor: 2100, facility: 2050, other: 1450 },
  { month: "6月", feedCost: 6750, vaccineDisease: 1900, labor: 2050, facility: 2100, other: 1200 },
  { month: "7月", feedCost: 7000, vaccineDisease: 2300, labor: 2200, facility: 2000, other: 1500 },
  { month: "8月", feedCost: 6900, vaccineDisease: 2100, labor: 2050, facility: 2050, other: 1700 },
  { month: "9月", feedCost: 6600, vaccineDisease: 2000, labor: 2100, facility: 1900, other: 1600 },
  { month: "10月", feedCost: 6450, vaccineDisease: 1900, labor: 2000, facility: 2000, other: 1550 },
  { month: "11月", feedCost: 6700, vaccineDisease: 2100, labor: 2100, facility: 2000, other: 1500 },
  { month: "12月", feedCost: 7100, vaccineDisease: 2200, labor: 2200, facility: 2100, other: 1600 },
]

// Cost per category
const costCategories = [
  { category: "饲料成本", total: 79200, percentage: 43, trend: -2.5, color: "bg-red-100 text-red-800" },
  { category: "防疫医疗", total: 24400, percentage: 13, trend: 1.2, color: "bg-orange-100 text-orange-800" },
  { category: "人工管理", total: 24850, percentage: 13, trend: 0.8, color: "bg-yellow-100 text-yellow-800" },
  { category: "设施维护", total: 24300, percentage: 13, trend: -1.5, color: "bg-green-100 text-green-800" },
  { category: "其他费用", total: 15250, percentage: 8, trend: 5.3, color: "bg-blue-100 text-blue-800" },
]

// Initial cost items data
const initialCostItems = [
  { id: 1, item: "粗饲料", cost: 32000, percentage: 17, month: "10月", status: "正常" },
  { id: 2, item: "精饲料", cost: 37200, percentage: 20, month: "10月", status: "正常" },
  { id: 3, item: "矿物质补充", cost: 10000, percentage: 5, month: "10月", status: "正常" },
  { id: 4, item: "疫苗接种", cost: 12200, percentage: 7, month: "12月", status: "已完成" },
  { id: 5, item: "医疗用药", cost: 12200, percentage: 7, month: "10月", status: "按需" },
  { id: 6, item: "人工费用", cost: 24850, percentage: 13, month: "持续", status: "正常" },
  { id: 7, item: "电费水费", cost: 8700, percentage: 5, month: "每月", status: "正常" },
  { id: 8, item: "维修费用", cost: 9000, percentage: 5, month: "按需", status: "正常" },
  { id: 9, item: "其他费用", cost: 7650, percentage: 4, month: "10月", status: "正常" },
]

interface CostItem {
  id: number
  item: string
  cost: number
  percentage: number
  month: string
  status: string
}


interface MonthlyCostData {
  month: string
  feedCost: number
  vaccineDisease: number
  labor: number
  facility: number
  other: number
}

export function ProductionBenefitsCostView() {
  const [costItems, setCostItems] = useState<CostItem[]>(initialCostItems)
  const [monthlyCostData, setMonthlyCostData] = useState<MonthlyCostData[]>(initialMonthlyCostData)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [monthlyEditDialogOpen, setMonthlyEditDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<CostItem | null>(null)
  const [deletingItem, setDeletingItem] = useState<CostItem | null>(null)
  const [editingMonth, setEditingMonth] = useState<MonthlyCostData | null>(null)
  const [formData, setFormData] = useState<Omit<CostItem, 'id' | 'percentage'>>({
    item: "",
    cost: 0,
    month: "1月",
    status: "正常",
  })
  const [monthlyFormData, setMonthlyFormData] = useState<MonthlyCostData>({
    month: "1月",
    feedCost: 0,
    vaccineDisease: 0,
    labor: 0,
    facility: 0,
    other: 0,
  })

  const handleOpenDialog = (item?: CostItem) => {
    if (item) {
      setEditingItem(item)
      setFormData({
        item: item.item,
        cost: item.cost,
        month: item.month,
        status: item.status,
      })
    } else {
      setEditingItem(null)
      setFormData({
        item: "",
        cost: 0,
        month: "1月",
        status: "正常",
      })
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingItem(null)
    setFormData({
      item: "",
      cost: 0,
      month: "1月",
      status: "正常",
    })
  }

  const handleSave = () => {
    if (editingItem) {
      // 更新项目
      setCostItems(costItems.map(item =>
        item.id === editingItem.id
          ? { ...formData, id: editingItem.id, percentage: 0 } // percentage will be calculated dynamically
          : item
      ))
    } else {
      // 添加新项目
      const newId = Math.max(...costItems.map(i => i.id), 0) + 1
      setCostItems([...costItems, { ...formData, id: newId, percentage: 0 }])
    }
    handleCloseDialog()
  }

  const handleDelete = () => {
    if (deletingItem) {
      setCostItems(costItems.filter(item => item.id !== deletingItem.id))
      setDeletingItem(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleOpenMonthlyDialog = (monthData?: MonthlyCostData) => {
    if (monthData) {
      setEditingMonth(monthData)
      setMonthlyFormData(monthData)
    } else {
      setEditingMonth(null)
      setMonthlyFormData({
        month: "1月",
        feedCost: 0,
        vaccineDisease: 0,
        labor: 0,
        facility: 0,
        other: 0,
      })
    }
    setMonthlyEditDialogOpen(true)
  }

  const handleCloseMonthlyDialog = () => {
    setMonthlyEditDialogOpen(false)
    setEditingMonth(null)
    setMonthlyFormData({
      month: "1月",
      feedCost: 0,
      vaccineDisease: 0,
      labor: 0,
      facility: 0,
      other: 0,
    })
  }

  const handleSaveMonthly = () => {
    if (editingMonth) {
      setMonthlyCostData(monthlyCostData.map(data =>
        data.month === editingMonth.month ? monthlyFormData : data
      ))
    }
    handleCloseMonthlyDialog()
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">成本管理</h2>
        <p className="text-sm text-muted-foreground">详细的成本分析、成本对标和成本预测</p>
      </div>

      {/* Cost Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        {costCategories.map((cat, idx) => (
          <Card key={idx} className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{cat.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥{(cat.total / 10000).toFixed(1)}万</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{cat.percentage}%</span>
                <Badge className={`${cat.color} text-xs`}>
                  {cat.trend > 0 ? "↑" : "↓"} {Math.abs(cat.trend)}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Cost Trend */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">月度费用构成趋势</CardTitle>
              <Button onClick={() => handleOpenMonthlyDialog()} size="sm" variant="outline">
                <Edit2 className="h-4 w-4 mr-2" />
                编辑月度数据
              </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyCostData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `¥${value}`} />
              <Legend />
              <Bar dataKey="feedCost" stackId="a" fill="#ef4444" name="饲料成本" />
              <Bar dataKey="vaccineDisease" stackId="a" fill="#f97316" name="防疫医疗" />
              <Bar dataKey="labor" stackId="a" fill="#eab308" name="人工管理" />
              <Bar dataKey="facility" stackId="a" fill="#84cc16" name="设施维护" />
              <Bar dataKey="other" stackId="a" fill="#06b6d4" name="其他费用" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Cost by Category */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingDown className="h-5 w-5" />
              成本分类统计
            </CardTitle>
            <Button onClick={() => handleOpenDialog()} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              添加项目
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>成本项目</TableHead>
                  <TableHead className="text-right">年度总额</TableHead>
                  <TableHead className="text-right">占比</TableHead>
                  <TableHead className="text-right">环比变化</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {costItems.map((item) => {
                  const totalCost = costItems.reduce((sum, i) => sum + i.cost, 0)
                  const calculatedPercentage = totalCost > 0 ? Math.round((item.cost / totalCost) * 100) : 0
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell className="text-right">¥{item.cost.toLocaleString()}</TableCell>
                      <TableCell className="text-right"><Badge variant="outline">{calculatedPercentage}%</Badge></TableCell>
                      <TableCell className="text-right text-sm">{item.month}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{item.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(item)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setDeletingItem(item)
                              setDeleteDialogOpen(true)
                            }}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* 成本预测 已移除 */}

      {/* Cost Control Tips */}
      <Card className="border-l-4 border-l-yellow-500 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            成本控制建议
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• 饲料成本占比43%，建议通过批量采购或更换饲料供应商降低成本</p>
          <p>• 11月防疫医疗费用比预期高，需核实疫苗采购与疾病防控情况</p>
          <p>• 人工管理成本保持稳定，目前人员配置合理</p>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? '编辑成本项目' : '添加成本项目'}</DialogTitle>
            <DialogDescription>
              {editingItem ? '修改成本项目信息' : '填写新的成本项目信息'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="item">成本项目</Label>
              <Input
                id="item"
                value={formData.item}
                onChange={(e) => setFormData({ ...formData, item: e.target.value })}
                placeholder="请输入成本项目名称"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">年度总额 (¥)</Label>
              <Input
                id="cost"
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) || 0 })}
                min="0"
                step="0.01"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="month">月份</Label>
                <Select
                  value={formData.month}
                  onValueChange={(value) => setFormData({ ...formData, month: value })}
                >
                  <SelectTrigger id="month">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1月">1月</SelectItem>
                    <SelectItem value="2月">2月</SelectItem>
                    <SelectItem value="3月">3月</SelectItem>
                    <SelectItem value="4月">4月</SelectItem>
                    <SelectItem value="5月">5月</SelectItem>
                    <SelectItem value="6月">6月</SelectItem>
                    <SelectItem value="7月">7月</SelectItem>
                    <SelectItem value="8月">8月</SelectItem>
                    <SelectItem value="9月">9月</SelectItem>
                    <SelectItem value="10月">10月</SelectItem>
                    <SelectItem value="11月">11月</SelectItem>
                    <SelectItem value="12月">12月</SelectItem>
                    <SelectItem value="持续">持续</SelectItem>
                    <SelectItem value="每月">每月</SelectItem>
                    <SelectItem value="按需">按需</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">状态</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="正常">正常</SelectItem>
                    <SelectItem value="已完成">已完成</SelectItem>
                    <SelectItem value="按需">按需</SelectItem>
                    <SelectItem value="异常">异常</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>取消</Button>
            <Button onClick={handleSave} disabled={!formData.item || formData.cost <= 0}>
              保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除这个成本项目吗？此操作无法撤销。
              {deletingItem && (
                <div className="mt-2 p-2 bg-muted rounded text-sm">
                  <p><strong>项目：</strong>{deletingItem.item}</p>
                  <p><strong>年度总额：</strong>¥{deletingItem.cost.toLocaleString()}</p>
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              删除
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Monthly Data Edit Dialog */}
      <Dialog open={monthlyEditDialogOpen} onOpenChange={setMonthlyEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑月度成本数据</DialogTitle>
            <DialogDescription>
              选择月份并编辑各项成本数据
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="month-select">选择月份</Label>
              <Select
                value={monthlyFormData.month}
                onValueChange={(value) => {
                  const selectedMonth = monthlyCostData.find(m => m.month === value)
                  if (selectedMonth) {
                    setMonthlyFormData(selectedMonth)
                    setEditingMonth(selectedMonth)
                  } else {
                    setMonthlyFormData({ ...monthlyFormData, month: value })
                    setEditingMonth(null)
                  }
                }}
              >
                <SelectTrigger id="month-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthlyCostData.map((m) => (
                    <SelectItem key={m.month} value={m.month}>{m.month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="feedCost">饲料成本 (¥)</Label>
                <Input
                  id="feedCost"
                  type="number"
                  value={monthlyFormData.feedCost}
                  onChange={(e) => setMonthlyFormData({ ...monthlyFormData, feedCost: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vaccineDisease">防疫医疗 (¥)</Label>
                <Input
                  id="vaccineDisease"
                  type="number"
                  value={monthlyFormData.vaccineDisease}
                  onChange={(e) => setMonthlyFormData({ ...monthlyFormData, vaccineDisease: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="labor">人工管理 (¥)</Label>
                <Input
                  id="labor"
                  type="number"
                  value={monthlyFormData.labor}
                  onChange={(e) => setMonthlyFormData({ ...monthlyFormData, labor: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facility">设施维护 (¥)</Label>
                <Input
                  id="facility"
                  type="number"
                  value={monthlyFormData.facility}
                  onChange={(e) => setMonthlyFormData({ ...monthlyFormData, facility: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other">其他费用 (¥)</Label>
                <Input
                  id="other"
                  type="number"
                  value={monthlyFormData.other}
                  onChange={(e) => setMonthlyFormData({ ...monthlyFormData, other: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label>月度总计 (¥)</Label>
                <div className="h-10 px-3 py-2 rounded-md border bg-muted flex items-center">
                  <span className="font-semibold">
                    {(monthlyFormData.feedCost + monthlyFormData.vaccineDisease + monthlyFormData.labor + monthlyFormData.facility + monthlyFormData.other).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseMonthlyDialog}>取消</Button>
            <Button onClick={handleSaveMonthly}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
