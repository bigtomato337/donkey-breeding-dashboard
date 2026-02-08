"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { useNavigation } from "../navigation-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Plus, Trash2, Edit2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock data for milk yield chart
const milkYieldData = [
  { month: "1月", yield: 245 },
  { month: "2月", yield: 268 },
  { month: "3月", yield: 312 },
  { month: "4月", yield: 295 },
  { month: "5月", yield: 340 },
  { month: "6月", yield: 378 },
  { month: "7月", yield: 356 },
  { month: "8月", yield: 390 },
  { month: "9月", yield: 412 },
  { month: "10月", yield: 385 },
  { month: "11月", yield: 368 },
  { month: "12月", yield: 345 },
]

// Mock data for breeding records
const initialBreedingRecords = [
  { id: 1, femaleId: "DB-2023002", maleId: "DB-2022015", method: "人工授精", date: "2024-01-15", operator: "王技术员" },
  { id: 2, femaleId: "DB-2023006", maleId: "DB-2021008", method: "自然交配", date: "2024-01-12", operator: "李技术员" },
  { id: 3, femaleId: "DB-2023009", maleId: "DB-2022015", method: "人工授精", date: "2024-01-08", operator: "王技术员" },
  { id: 4, femaleId: "DB-2022018", maleId: "DB-2021003", method: "人工授精", date: "2024-01-05", operator: "张技术员" },
  { id: 5, femaleId: "DB-2023001", maleId: "DB-2020012", method: "自然交配", date: "2024-01-02", operator: "李技术员" },
]

// Mock data for foaling records
const foalingRecords = [
  { femaleId: "DB-2022008", foalId: "DB-2024001", birthWeight: "28.5", midwife: "陈兽医" },
  { femaleId: "DB-2022015", foalId: "DB-2024002", birthWeight: "31.2", midwife: "王兽医" },
  { femaleId: "DB-2021006", foalId: "DB-2024003", birthWeight: "26.8", midwife: "陈兽医" },
  { femaleId: "DB-2022003", foalId: "DB-2024004", birthWeight: "29.4", midwife: "李兽医" },
  { femaleId: "DB-2021019", foalId: "DB-2024005", birthWeight: "30.1", midwife: "王兽医" },
]

// Mock data for milk records
const milkRecords = [
  { earId: "DB-2022008", yield: "4.2", recordTime: "2024-01-20 08:30" },
  { earId: "DB-2021015", yield: "3.8", recordTime: "2024-01-20 08:25" },
  { earId: "DB-2022003", yield: "4.5", recordTime: "2024-01-20 08:20" },
  { earId: "DB-2021006", yield: "3.6", recordTime: "2024-01-20 08:15" },
  { earId: "DB-2022018", yield: "4.1", recordTime: "2024-01-20 08:10" },
  { earId: "DB-2021019", yield: "3.9", recordTime: "2024-01-19 17:30" },
  { earId: "DB-2022008", yield: "4.0", recordTime: "2024-01-19 17:25" },
]

const chartConfig = {
  yield: {
    label: "产奶量",
    color: "hsl(var(--primary))",
  },
}

export function ProductionView() {
  const { activePage } = useNavigation()
  const { toast } = useToast()
  const [breedingRecords, setBreedingRecords] = useState(initialBreedingRecords)
  const [foalingRecords, setFoalingRecords] = useState([
    { femaleId: "DB-2022008", foalId: "DB-2024001", birthWeight: "28.5", midwife: "陈兽医" },
    { femaleId: "DB-2022015", foalId: "DB-2024002", birthWeight: "31.2", midwife: "王兽医" },
    { femaleId: "DB-2021006", foalId: "DB-2024003", birthWeight: "26.8", midwife: "陈兽医" },
    { femaleId: "DB-2022003", foalId: "DB-2024004", birthWeight: "29.4", midwife: "李兽医" },
    { femaleId: "DB-2021019", foalId: "DB-2024005", birthWeight: "30.1", midwife: "王兽医" },
  ])
  const [milkRecords, setMilkRecords] = useState([
    { earId: "DB-2022008", yield: "4.2", recordTime: "2024-01-20 08:30" },
    { earId: "DB-2021015", yield: "3.8", recordTime: "2024-01-20 08:25" },
    { earId: "DB-2022003", yield: "4.5", recordTime: "2024-01-20 08:20" },
    { earId: "DB-2021006", yield: "3.6", recordTime: "2024-01-20 08:15" },
    { earId: "DB-2022018", yield: "4.1", recordTime: "2024-01-20 08:10" },
    { earId: "DB-2021019", yield: "3.9", recordTime: "2024-01-19 17:30" },
    { earId: "DB-2022008", yield: "4.0", recordTime: "2024-01-19 17:25" },
  ])

  // 配种记录状态
  const [isBreedingModalOpen, setIsBreedingModalOpen] = useState(false)
  const [editingBreedingId, setEditingBreedingId] = useState<number | null>(null)
  const [breedingForm, setBreedingForm] = useState({
    femaleId: "",
    maleId: "",
    method: "人工授精",
    date: "",
    operator: "",
  })
  const [deleteBreedingId, setDeleteBreedingId] = useState<number | null>(null)
  const [deleteBreedingOpen, setDeleteBreedingOpen] = useState(false)

  const handleBreedingAdd = () => {
    if (!breedingForm.femaleId || !breedingForm.maleId || !breedingForm.date || !breedingForm.operator) {
      toast({
        title: "验证失败",
        description: "请填写所有必填项",
        variant: "destructive",
      })
      return
    }

    if (editingBreedingId !== null) {
      // 编辑模式
      setBreedingRecords(prev => prev.map(r => 
        r.id === editingBreedingId 
          ? { ...r, ...breedingForm }
          : r
      ))
      toast({
        title: "成功更新",
        description: "配种记录已更新",
      })
      setEditingBreedingId(null)
    } else {
      // 添加模式
      const newRecord = {
        id: Math.max(...breedingRecords.map(r => r.id), 0) + 1,
        ...breedingForm,
      }
      setBreedingRecords(prev => [...prev, newRecord])
      toast({
        title: "成功添加",
        description: "配种记录已添加",
      })
    }

    setBreedingForm({ femaleId: "", maleId: "", method: "人工授精", date: "", operator: "" })
    setIsBreedingModalOpen(false)
  }

  const handleBreedingEdit = (record: any) => {
    setBreedingForm({
      femaleId: record.femaleId,
      maleId: record.maleId,
      method: record.method,
      date: record.date,
      operator: record.operator,
    })
    setEditingBreedingId(record.id)
    setIsBreedingModalOpen(true)
  }

  const handleBreedingDelete = (id: number) => {
    setDeleteBreedingId(id)
    setDeleteBreedingOpen(true)
  }

  const confirmDeleteBreeding = () => {
    if (deleteBreedingId !== null) {
      setBreedingRecords(prev => prev.filter(r => r.id !== deleteBreedingId))
      toast({
        title: "成功删除",
        description: "配种记录已删除",
      })
      setDeleteBreedingOpen(false)
      setDeleteBreedingId(null)
    }
  }

  // 产驹记录状态
  const [isFoalingModalOpen, setIsFoalingModalOpen] = useState(false)
  const [editingFoalingIndex, setEditingFoalingIndex] = useState<number | null>(null)
  const [foalingForm, setFoalingForm] = useState({
    femaleId: "",
    foalId: "",
    birthWeight: "",
    midwife: "",
  })
  const [deleteFoalingIndex, setDeleteFoalingIndex] = useState<number | null>(null)
  const [deleteFoalingOpen, setDeleteFoalingOpen] = useState(false)

  const handleFoalingAdd = () => {
    if (!foalingForm.femaleId || !foalingForm.foalId || !foalingForm.birthWeight || !foalingForm.midwife) {
      toast({
        title: "验证失败",
        description: "请填写所有必填项",
        variant: "destructive",
      })
      return
    }

    if (editingFoalingIndex !== null) {
      // 编辑模式
      setFoalingRecords(prev => prev.map((r, i) => 
        i === editingFoalingIndex ? foalingForm : r
      ))
      toast({
        title: "成功更新",
        description: "产驹记录已更新",
      })
      setEditingFoalingIndex(null)
    } else {
      // 添加模式
      setFoalingRecords(prev => [...prev, foalingForm])
      toast({
        title: "成功添加",
        description: "产驹记录已添加",
      })
    }

    setFoalingForm({ femaleId: "", foalId: "", birthWeight: "", midwife: "" })
    setIsFoalingModalOpen(false)
  }

  const handleFoalingEdit = (record: any, index: number) => {
    setFoalingForm(record)
    setEditingFoalingIndex(index)
    setIsFoalingModalOpen(true)
  }

  const handleFoalingDelete = (index: number) => {
    setDeleteFoalingIndex(index)
    setDeleteFoalingOpen(true)
  }

  const confirmDeleteFoaling = () => {
    if (deleteFoalingIndex !== null) {
      setFoalingRecords(prev => prev.filter((_, i) => i !== deleteFoalingIndex))
      toast({
        title: "成功删除",
        description: "产驹记录已删除",
      })
      setDeleteFoalingOpen(false)
      setDeleteFoalingIndex(null)
    }
  }

  // 奶量记录状态
  const [isMilkModalOpen, setIsMilkModalOpen] = useState(false)
  const [editingMilkIndex, setEditingMilkIndex] = useState<number | null>(null)
  const [milkForm, setMilkForm] = useState({
    earId: "",
    yield: "",
    recordTime: "",
  })
  const [deleteMilkIndex, setDeleteMilkIndex] = useState<number | null>(null)
  const [deleteMilkOpen, setDeleteMilkOpen] = useState(false)

  const handleMilkAdd = () => {
    if (!milkForm.earId || !milkForm.yield || !milkForm.recordTime) {
      toast({
        title: "验证失败",
        description: "请填写所有必填项",
        variant: "destructive",
      })
      return
    }

    if (editingMilkIndex !== null) {
      // 编辑模式
      setMilkRecords(prev => prev.map((r, i) => 
        i === editingMilkIndex ? milkForm : r
      ))
      toast({
        title: "成功更新",
        description: "奶量记录已更新",
      })
      setEditingMilkIndex(null)
    } else {
      // 添加模式
      setMilkRecords(prev => [...prev, milkForm])
      toast({
        title: "成功添加",
        description: "奶量记录已添加",
      })
    }

    setMilkForm({ earId: "", yield: "", recordTime: "" })
    setIsMilkModalOpen(false)
  }

  const handleMilkEdit = (record: any, index: number) => {
    setMilkForm(record)
    setEditingMilkIndex(index)
    setIsMilkModalOpen(true)
  }

  const handleMilkDelete = (index: number) => {
    setDeleteMilkIndex(index)
    setDeleteMilkOpen(true)
  }

  const confirmDeleteMilk = () => {
    if (deleteMilkIndex !== null) {
      setMilkRecords(prev => prev.filter((_, i) => i !== deleteMilkIndex))
      toast({
        title: "成功删除",
        description: "奶量记录已删除",
      })
      setDeleteMilkOpen(false)
      setDeleteMilkIndex(null)
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          {activePage === "production-overview" ? "概览" : activePage === "production-breeding" ? "配种产驹" : "奶量记录"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {activePage === "production-overview"
            ? "生产性能各模块数据总览"
            : activePage === "production-breeding"
            ? "查看配种和产驹的相关记录"
            : "查看种驴的奶量记录"}
        </p>
      </div>

      {/* Overview Section */}
      {activePage === "production-overview" && (
        <>
          {/* Key Metrics */}
          <div className="grid gap-6 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">本年配种次数</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="text-3xl font-bold">{breedingRecords.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">次</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">本年产驹数</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="text-3xl font-bold">{foalingRecords.length}</div>
                  <p className="text-xs text-muted-foreground mt-1">头</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">平均奶量</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="text-3xl font-bold">
                    {(milkRecords.reduce((sum, r) => sum + parseFloat(r.yield), 0) / milkRecords.length).toFixed(2)}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">kg/次</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">配种方式</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="text-2xl font-bold">
                    {breedingRecords.filter(r => r.method === "人工授精").length} / {breedingRecords.filter(r => r.method === "自然交配").length}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">人工 / 自然</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Milk Yield Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">泌乳量月度趋势图</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={milkYieldData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis 
                      tick={{ fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      label={{ value: '产奶量 (kg)', angle: -90, position: 'insideLeft', fill: 'hsl(var(--muted-foreground))' }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="yield" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </>
      )}

      {/* Breeding & Foaling Records */}
      {activePage === "production-breeding" && (
        <div className="grid gap-6">
          {/* Breeding Records */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">配种记录</CardTitle>
              <Button 
                size="sm" 
                className="gap-2"
                onClick={() => {
                  setBreedingForm({ femaleId: "", maleId: "", method: "人工授精", date: "", operator: "" })
                  setEditingBreedingId(null)
                  setIsBreedingModalOpen(true)
                }}
              >
                <Plus className="h-4 w-4" />
                新增配种
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">母驴 ID</TableHead>
                    <TableHead className="font-semibold">公驴 ID</TableHead>
                    <TableHead className="font-semibold">配种方式</TableHead>
                    <TableHead className="font-semibold">配种日期</TableHead>
                    <TableHead className="font-semibold">操作员</TableHead>
                    <TableHead className="font-semibold">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {breedingRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.femaleId}</TableCell>
                      <TableCell>{record.maleId}</TableCell>
                      <TableCell>{record.method}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>{record.operator}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBreedingEdit(record)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBreedingDelete(record.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Foaling Records */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">产驹记录</CardTitle>
              <Button 
                size="sm" 
                className="gap-2"
                onClick={() => {
                  setFoalingForm({ femaleId: "", foalId: "", birthWeight: "", midwife: "" })
                  setEditingFoalingIndex(null)
                  setIsFoalingModalOpen(true)
                }}
              >
                <Plus className="h-4 w-4" />
                新增产驹
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">母驴 ID</TableHead>
                    <TableHead className="font-semibold">驹号</TableHead>
                    <TableHead className="font-semibold">出生重(kg)</TableHead>
                    <TableHead className="font-semibold">接生员</TableHead>
                    <TableHead className="font-semibold">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {foalingRecords.map((record, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.femaleId}</TableCell>
                      <TableCell>{record.foalId}</TableCell>
                      <TableCell>{record.birthWeight}</TableCell>
                      <TableCell>{record.midwife}</TableCell>
                      <TableCell className="space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFoalingEdit(record, index)}
                          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleFoalingDelete(index)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Milk Records */}
      {activePage === "production-milk" && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">奶量记录</CardTitle>
            <Button 
              size="sm" 
              className="gap-2"
              onClick={() => {
                setMilkForm({ earId: "", yield: "", recordTime: "" })
                setEditingMilkIndex(null)
                setIsMilkModalOpen(true)
              }}
            >
              <Plus className="h-4 w-4" />
              新增奶量
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">耳号</TableHead>
                  <TableHead className="font-semibold">产奶量(kg)</TableHead>
                  <TableHead className="font-semibold">记录时间</TableHead>
                  <TableHead className="font-semibold">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {milkRecords.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{record.earId}</TableCell>
                    <TableCell>{record.yield}</TableCell>
                    <TableCell>{record.recordTime}</TableCell>
                    <TableCell className="space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMilkEdit(record, index)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMilkDelete(index)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Breeding Record Modal */}
      <Dialog open={isBreedingModalOpen} onOpenChange={setIsBreedingModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingBreedingId ? "编辑配种记录" : "新增配种记录"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="female-id">母驴 ID *</Label>
              <Input
                id="female-id"
                placeholder="输入母驴耳号，如 DB-2023002"
                value={breedingForm.femaleId}
                onChange={(e) => setBreedingForm({ ...breedingForm, femaleId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="male-id">公驴 ID *</Label>
              <Input
                id="male-id"
                placeholder="输入公驴耳号，如 DB-2022015"
                value={breedingForm.maleId}
                onChange={(e) => setBreedingForm({ ...breedingForm, maleId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="breed-method">配种方式 *</Label>
              <Select value={breedingForm.method} onValueChange={(value) => setBreedingForm({ ...breedingForm, method: value })}>
                <SelectTrigger id="breed-method">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="人工授精">人工授精</SelectItem>
                  <SelectItem value="自然交配">自然交配</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="breed-date">配种日期 *</Label>
              <Input
                id="breed-date"
                type="date"
                value={breedingForm.date}
                onChange={(e) => setBreedingForm({ ...breedingForm, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operator">操作员 *</Label>
              <Input
                id="operator"
                placeholder="输入操作员名字"
                value={breedingForm.operator}
                onChange={(e) => setBreedingForm({ ...breedingForm, operator: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBreedingModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleBreedingAdd}>
              {editingBreedingId ? "更新" : "添加"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Breeding Dialog */}
      <AlertDialog open={deleteBreedingOpen} onOpenChange={setDeleteBreedingOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除这条配种记录吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteBreeding}
              className="bg-destructive hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Foaling Record Modal */}
      <Dialog open={isFoalingModalOpen} onOpenChange={setIsFoalingModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingFoalingIndex !== null ? "编辑产驹记录" : "新增产驹记录"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="foaling-female-id">母驴 ID *</Label>
              <Input
                id="foaling-female-id"
                placeholder="输入母驴耳号，如 DB-2022008"
                value={foalingForm.femaleId}
                onChange={(e) => setFoalingForm({ ...foalingForm, femaleId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="foal-id">驹号 *</Label>
              <Input
                id="foal-id"
                placeholder="输入驹号，如 DB-2024001"
                value={foalingForm.foalId}
                onChange={(e) => setFoalingForm({ ...foalingForm, foalId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birth-weight">出生重(kg) *</Label>
              <Input
                id="birth-weight"
                placeholder="输入出生重，如 28.5"
                type="number"
                step="0.1"
                value={foalingForm.birthWeight}
                onChange={(e) => setFoalingForm({ ...foalingForm, birthWeight: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="midwife">接生员 *</Label>
              <Input
                id="midwife"
                placeholder="输入接生员名字"
                value={foalingForm.midwife}
                onChange={(e) => setFoalingForm({ ...foalingForm, midwife: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsFoalingModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleFoalingAdd}>
              {editingFoalingIndex !== null ? "更新" : "添加"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Foaling Dialog */}
      <AlertDialog open={deleteFoalingOpen} onOpenChange={setDeleteFoalingOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除这条产驹记录吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteFoaling}
              className="bg-destructive hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {/* Milk Record Modal */}
      <Dialog open={isMilkModalOpen} onOpenChange={setIsMilkModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingMilkIndex !== null ? "编辑奶量记录" : "新增奶量记录"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="milk-ear-id">耳号 *</Label>
              <Input
                id="milk-ear-id"
                placeholder="输入种驴耳号，如 DB-2022008"
                value={milkForm.earId}
                onChange={(e) => setMilkForm({ ...milkForm, earId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="milk-yield">产奶量(kg) *</Label>
              <Input
                id="milk-yield"
                placeholder="输入产奶量，如 4.2"
                type="number"
                step="0.1"
                value={milkForm.yield}
                onChange={(e) => setMilkForm({ ...milkForm, yield: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="milk-time">记录时间 *</Label>
              <Input
                id="milk-time"
                placeholder="输入记录时间，如 2024-01-20 08:30"
                type="datetime-local"
                value={milkForm.recordTime.replace(" ", "T")}
                onChange={(e) => setMilkForm({ ...milkForm, recordTime: e.target.value.replace("T", " ") })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMilkModalOpen(false)}>
              取消
            </Button>
            <Button onClick={handleMilkAdd}>
              {editingMilkIndex !== null ? "更新" : "添加"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Milk Dialog */}
      <AlertDialog open={deleteMilkOpen} onOpenChange={setDeleteMilkOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              确定要删除这条奶量记录吗？此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteMilk}
              className="bg-destructive hover:bg-destructive/90"
            >
              删除
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
