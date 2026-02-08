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
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, DollarSign, Plus, Edit2, Trash2 } from "lucide-react"

// Initial monthly revenue data
const initialMonthlyRevenueData = [
  { month: "1月", meatSales: 11000, breederSales: 6000, dairyProducts: 1500, other: 1500 },
  { month: "2月", meatSales: 12000, breederSales: 8000, dairyProducts: 2000, other: 2000 },
  { month: "3月", meatSales: 14000, breederSales: 6000, dairyProducts: 2000, other: 2000 },
  { month: "4月", meatSales: 12000, breederSales: 5000, dairyProducts: 2000, other: 2000 },
  { month: "5月", meatSales: 14500, breederSales: 7000, dairyProducts: 2500, other: 2000 },
  { month: "6月", meatSales: 15000, breederSales: 8500, dairyProducts: 2500, other: 2000 },
  { month: "7月", meatSales: 16000, breederSales: 7000, dairyProducts: 3000, other: 2000 },
  { month: "8月", meatSales: 15000, breederSales: 6000, dairyProducts: 2500, other: 2000 },
  { month: "9月", meatSales: 15500, breederSales: 8000, dairyProducts: 2500, other: 2000 },
  { month: "10月", meatSales: 14000, breederSales: 6000, dairyProducts: 2500, other: 2000 },
  { month: "11月", meatSales: 14500, breederSales: 9000, dairyProducts: 2500, other: 2000 },
  { month: "12月", meatSales: 17000, breederSales: 7000, dairyProducts: 3500, other: 2000 },
]

interface MonthlyRevenueData {
  month: string
  meatSales: number
  breederSales: number
  dairyProducts: number
  other: number
}

// Revenue by source
const revenueSources = [
  { source: "驴肉销售", total: 172500, percentage: 53, trend: 2.8, units: 60, color: "bg-blue-100 text-blue-800" },
  { source: "种驴销售", total: 88000, percentage: 27, trend: -1.5, units: 12, color: "bg-purple-100 text-purple-800" },
  { source: "奶制品销售", total: 30500, percentage: 9, trend: 4.2, units: 305, color: "bg-pink-100 text-pink-800" },
  { source: "其他收入", total: 23000, percentage: 7, trend: 1.1, units: 230, color: "bg-cyan-100 text-cyan-800" },
]

// Initial sales records data
const initialSalesRecords = [
  { id: 1, date: "2024-12-15", source: "驴肉销售", product: "完成驴", quantity: 3, unitPrice: 2800, total: 8400, customer: "地方肉类加工厂", status: "已结清" },
  { id: 2, date: "2024-12-10", source: "种驴销售", product: "优质公驴", quantity: 1, unitPrice: 8500, total: 8500, customer: "养殖户李先生", status: "已结清" },
  { id: 3, date: "2024-12-08", source: "奶制品销售", product: "驴奶", quantity: 50, unitPrice: 65, total: 3250, customer: "乳制品公司", status: "已结清" },
  { id: 4, date: "2024-12-01", source: "驴肉销售", product: "完成驴", quantity: 2, unitPrice: 2750, total: 5500, customer: "地方肉类加工厂", status: "已结清" },
  { id: 5, date: "2024-11-28", source: "种驴销售", product: "优质母驴", quantity: 1, unitPrice: 7500, total: 7500, customer: "合作养殖场", status: "已结清" },
  { id: 6, date: "2024-11-20", source: "其他收入", product: "驴毛、皮张", quantity: 18, unitPrice: 65, total: 1170, customer: "皮毛收购商", status: "已结清" },
]

interface SalesRecord {
  id: number
  date: string
  source: string
  product: string
  quantity: number
  unitPrice: number
  total: number
  customer: string
  status: string
}


// Revenue breakdown distribution
const revenueBreakdown = [
  { name: "驴肉销售", value: 53, fill: "#3b82f6" },
  { name: "种驴销售", value: 27, fill: "#8b5cf6" },
  { name: "奶制品销售", value: 9, fill: "#ec4899" },
  { name: "其他收入", value: 7, fill: "#06b6d4" },
]

const totalRevenue = revenueSources.reduce((sum, r) => sum + r.total, 0)

export function ProductionBenefitsIncomeView() {
  const [salesRecords, setSalesRecords] = useState<SalesRecord[]>(initialSalesRecords)
  const [monthlyRevenueData, setMonthlyRevenueData] = useState<MonthlyRevenueData[]>(initialMonthlyRevenueData)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [monthlyEditDialogOpen, setMonthlyEditDialogOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<SalesRecord | null>(null)
  const [deletingRecord, setDeletingRecord] = useState<SalesRecord | null>(null)
  const [editingMonth, setEditingMonth] = useState<MonthlyRevenueData | null>(null)
  const [formData, setFormData] = useState<Omit<SalesRecord, 'id' | 'total'>>({
    date: "",
    source: "驴肉销售",
    product: "",
    quantity: 0,
    unitPrice: 0,
    customer: "",
    status: "已结清",
  })
  const [monthlyFormData, setMonthlyFormData] = useState<MonthlyRevenueData>({
    month: "1月",
    meatSales: 0,
    breederSales: 0,
    dairyProducts: 0,
    other: 0,
  })

  const handleOpenDialog = (record?: SalesRecord) => {
    if (record) {
      setEditingRecord(record)
      setFormData({
        date: record.date,
        source: record.source,
        product: record.product,
        quantity: record.quantity,
        unitPrice: record.unitPrice,
        customer: record.customer,
        status: record.status,
      })
    } else {
      setEditingRecord(null)
      setFormData({
        date: new Date().toISOString().split('T')[0],
        source: "驴肉销售",
        product: "",
        quantity: 0,
        unitPrice: 0,
        customer: "",
        status: "已结清",
      })
    }
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
    setEditingRecord(null)
    setFormData({
      date: "",
      source: "驴肉销售",
      product: "",
      quantity: 0,
      unitPrice: 0,
      customer: "",
      status: "已结清",
    })
  }

  const handleSave = () => {
    const total = formData.quantity * formData.unitPrice
    if (editingRecord) {
      // 更新记录
      setSalesRecords(salesRecords.map(record =>
        record.id === editingRecord.id
          ? { ...formData, id: editingRecord.id, total }
          : record
      ))
    } else {
      // 添加新记录
      const newId = Math.max(...salesRecords.map(r => r.id), 0) + 1
      setSalesRecords([...salesRecords, { ...formData, id: newId, total }])
    }
    handleCloseDialog()
  }

  const handleDelete = () => {
    if (deletingRecord) {
      setSalesRecords(salesRecords.filter(record => record.id !== deletingRecord.id))
      setDeletingRecord(null)
    }
    setDeleteDialogOpen(false)
  }

  const handleQuantityOrPriceChange = (field: 'quantity' | 'unitPrice', value: string) => {
    const numValue = parseFloat(value) || 0
    setFormData({ ...formData, [field]: numValue })
  }

  const handleOpenMonthlyDialog = (monthData?: MonthlyRevenueData) => {
    if (monthData) {
      setEditingMonth(monthData)
      setMonthlyFormData(monthData)
    } else {
      setEditingMonth(null)
      setMonthlyFormData({
        month: "1月",
        meatSales: 0,
        breederSales: 0,
        dairyProducts: 0,
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
      meatSales: 0,
      breederSales: 0,
      dairyProducts: 0,
      other: 0,
    })
  }

  const handleSaveMonthly = () => {
    if (editingMonth) {
      setMonthlyRevenueData(monthlyRevenueData.map(data =>
        data.month === editingMonth.month ? monthlyFormData : data
      ))
    }
    handleCloseMonthlyDialog()
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-foreground">收入管理</h2>
        <p className="text-sm text-muted-foreground">各类销售收入统计、价格趋势和收入分析</p>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              年度总收入
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">¥{(totalRevenue / 10000).toFixed(2)}万</div>
            <p className="text-xs text-muted-foreground mt-1">全年累计</p>
          </CardContent>
        </Card>

        {revenueSources.map((src, idx) => (
          <Card key={idx} className="border-0 shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{src.source}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">¥{(src.total / 10000).toFixed(1)}万</div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground">{src.percentage}%</span>
                <Badge className={`${src.color} text-xs`}>
                  {src.trend > 0 ? "↑" : "↓"} {Math.abs(src.trend)}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Distribution Pie Chart */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">收入来源分布</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={revenueBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {revenueBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Monthly Revenue Trend */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">月度收入趋势</CardTitle>
              <Button onClick={() => handleOpenMonthlyDialog()} size="sm" variant="outline">
                <Edit2 className="h-4 w-4 mr-2" />
                编辑月度数据
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `¥${value}`} />
                <Legend />
                <Line type="monotone" dataKey="meatSales" stroke="#3b82f6" name="驴肉销售" strokeWidth={2} />
                <Line type="monotone" dataKey="breederSales" stroke="#8b5cf6" name="种驴销售" strokeWidth={2} />
                <Line type="monotone" dataKey="dairyProducts" stroke="#ec4899" name="奶制品销售" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 价格趋势 已移除 */}

      {/* Sales Records */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">近期销售记录</CardTitle>
            <Button onClick={() => handleOpenDialog()} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              添加记录
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>日期</TableHead>
                  <TableHead>收入来源</TableHead>
                  <TableHead>产品</TableHead>
                  <TableHead className="text-right">数量</TableHead>
                  <TableHead className="text-right">单价</TableHead>
                  <TableHead className="text-right">总额</TableHead>
                  <TableHead>客户</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="text-sm">{record.date}</TableCell>
                    <TableCell><Badge variant="outline">{record.source}</Badge></TableCell>
                    <TableCell className="font-medium text-sm">{record.product}</TableCell>
                    <TableCell className="text-right">{record.quantity}</TableCell>
                    <TableCell className="text-right">¥{record.unitPrice}</TableCell>
                    <TableCell className="text-right font-semibold">¥{record.total.toLocaleString()}</TableCell>
                    <TableCell className="text-sm">{record.customer}</TableCell>
                    <TableCell><Badge variant="secondary">{record.status}</Badge></TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleOpenDialog(record)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setDeletingRecord(record)
                            setDeleteDialogOpen(true)
                          }}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Revenue Insights */}
      <Card className="border-l-4 border-l-green-500 bg-green-50">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            收入分析与建议
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>• 驴肉销售占比53%，是主要收入来源，价格呈上升趋势，12月达到3000元/斤</p>
          <p>• 种驴销售占比27%，11月销售额突破9000元，建议继续加大高品质种驴育种</p>
          <p>• 奶制品销售占比9%，增长率4.2%，有上升空间，可加强与乳制品企业合作</p>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRecord ? '编辑销售记录' : '添加销售记录'}</DialogTitle>
            <DialogDescription>
              {editingRecord ? '修改销售记录信息' : '填写新的销售记录信息'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">日期</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="source">收入来源</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => setFormData({ ...formData, source: value })}
                >
                  <SelectTrigger id="source">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="驴肉销售">驴肉销售</SelectItem>
                    <SelectItem value="种驴销售">种驴销售</SelectItem>
                    <SelectItem value="奶制品销售">奶制品销售</SelectItem>
                    <SelectItem value="其他收入">其他收入</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product">产品</Label>
              <Input
                id="product"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                placeholder="请输入产品名称"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">数量</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleQuantityOrPriceChange('quantity', e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitPrice">单价 (¥)</Label>
                <Input
                  id="unitPrice"
                  type="number"
                  value={formData.unitPrice}
                  onChange={(e) => handleQuantityOrPriceChange('unitPrice', e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label>总额 (¥)</Label>
                <div className="h-10 px-3 py-2 rounded-md border bg-muted flex items-center">
                  <span className="font-semibold">
                    {(formData.quantity * formData.unitPrice).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customer">客户</Label>
              <Input
                id="customer"
                value={formData.customer}
                onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                placeholder="请输入客户名称"
              />
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
                  <SelectItem value="已结清">已结清</SelectItem>
                  <SelectItem value="待结清">待结清</SelectItem>
                  <SelectItem value="部分结清">部分结清</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>取消</Button>
            <Button onClick={handleSave} disabled={!formData.date || !formData.product || !formData.customer}>
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
              确定要删除这条销售记录吗？此操作无法撤销。
              {deletingRecord && (
                <div className="mt-2 p-2 bg-muted rounded text-sm">
                  <p><strong>日期：</strong>{deletingRecord.date}</p>
                  <p><strong>产品：</strong>{deletingRecord.product}</p>
                  <p><strong>总额：</strong>¥{deletingRecord.total.toLocaleString()}</p>
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

      {/* Monthly Revenue Data Edit Dialog */}
      <Dialog open={monthlyEditDialogOpen} onOpenChange={setMonthlyEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>编辑月度收入数据</DialogTitle>
            <DialogDescription>
              选择月份并编辑各项收入数据
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="month-select-revenue">选择月份</Label>
              <Select
                value={monthlyFormData.month}
                onValueChange={(value) => {
                  const selectedMonth = monthlyRevenueData.find(m => m.month === value)
                  if (selectedMonth) {
                    setMonthlyFormData(selectedMonth)
                    setEditingMonth(selectedMonth)
                  } else {
                    setMonthlyFormData({ ...monthlyFormData, month: value })
                    setEditingMonth(null)
                  }
                }}
              >
                <SelectTrigger id="month-select-revenue">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthlyRevenueData.map((m) => (
                    <SelectItem key={m.month} value={m.month}>{m.month}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meatSales">驴肉销售 (¥)</Label>
                <Input
                  id="meatSales"
                  type="number"
                  value={monthlyFormData.meatSales}
                  onChange={(e) => setMonthlyFormData({ ...monthlyFormData, meatSales: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breederSales">种驴销售 (¥)</Label>
                <Input
                  id="breederSales"
                  type="number"
                  value={monthlyFormData.breederSales}
                  onChange={(e) => setMonthlyFormData({ ...monthlyFormData, breederSales: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dairyProducts">奶制品销售 (¥)</Label>
                <Input
                  id="dairyProducts"
                  type="number"
                  value={monthlyFormData.dairyProducts}
                  onChange={(e) => setMonthlyFormData({ ...monthlyFormData, dairyProducts: parseFloat(e.target.value) || 0 })}
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="other">其他收入 (¥)</Label>
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
                    {(monthlyFormData.meatSales + monthlyFormData.breederSales + monthlyFormData.dairyProducts + monthlyFormData.other).toLocaleString()}
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
