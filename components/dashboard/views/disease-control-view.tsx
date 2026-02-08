"use client"

import { useState } from "react"
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Stethoscope, AlertTriangle, Shield, Syringe, Plus, Edit2, Trash2 } from "lucide-react"
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
import { useToast } from "@/hooks/use-toast"

// Status cards data
const statusCards = [
  {
    title: "本月检测数",
    value: "156",
    icon: Stethoscope,
    description: "较上月增加 12%",
    trend: "up",
  },
  {
    title: "异常检出",
    value: "3",
    icon: AlertTriangle,
    description: "需要隔离处理",
    trend: "alert",
  },
  {
    title: "疫苗覆盖率",
    value: "98.5%",
    icon: Shield,
    description: "达标率优秀",
    trend: "success",
  },
]

// Disease detection chart data
const diseaseData = [
  { name: "布病", count: 45 },
  { name: "马传贫", count: 38 },
  { name: "口蹄疫", count: 32 },
  { name: "狂犬病", count: 41 },
]

// Test result distribution
const resultDistribution = [
  { name: "阴性", value: 145, fill: "#16a34a" },
  { name: "阳性", value: 8, fill: "#dc2626" },
  { name: "可疑", value: 3, fill: "#eab308" },
]

// Health records mock data
const initialHealthRecords = [
  {
    id: 1,
    earId: "DB-2023001",
    testItem: "布病",
    testType: "定期",
    result: "阴性",
    resultStatus: "negative",
    treatment: "无",
    inspector: "李兽医",
    testDate: "2024-01-20",
  },
  {
    id: 2,
    earId: "DB-2023002",
    testItem: "马传贫",
    testType: "定期",
    result: "阴性",
    resultStatus: "negative",
    treatment: "无",
    inspector: "王兽医",
    testDate: "2024-01-20",
  },
  {
    id: 3,
    earId: "DB-2023004",
    testItem: "布病",
    testType: "突发",
    result: "阳性",
    resultStatus: "positive",
    treatment: "隔离观察",
    inspector: "陈兽医",
    testDate: "2024-01-19",
  },
  {
    id: 4,
    earId: "DB-2023005",
    testItem: "口蹄疫",
    testType: "定期",
    result: "阴性",
    resultStatus: "negative",
    treatment: "无",
    inspector: "李兽医",
    testDate: "2024-01-18",
  },
  {
    id: 5,
    earId: "DB-2023006",
    testItem: "马传贫",
    testType: "定期",
    result: "阴性",
    resultStatus: "negative",
    treatment: "无",
    inspector: "王兽医",
    testDate: "2024-01-18",
  },
  {
    id: 6,
    earId: "DB-2023007",
    testItem: "布病",
    testType: "突发",
    result: "可疑",
    resultStatus: "suspect",
    treatment: "复检中",
    inspector: "陈兽医",
    testDate: "2024-01-17",
  },
]

// Vaccination records
const initialVaccinationRecords = [
  {
    id: 1,
    earId: "DB-2023001",
    vaccineType: "布病",
    vaccineName: "布野生菌株疫苗",
    vaccinationDate: "2024-01-15",
    veterinarian: "李兽医",
    nextDue: "2025-01-15",
  },
  {
    id: 2,
    earId: "DB-2023002",
    vaccineType: "马传贫",
    vaccineName: "马传贫灭活疫苗",
    vaccinationDate: "2024-01-10",
    veterinarian: "王兽医",
    nextDue: "2025-01-10",
  },
  {
    id: 3,
    earId: "DB-2023004",
    vaccineType: "口蹄疫",
    vaccineName: "口蹄疫灭活疫苗",
    vaccinationDate: "2024-01-05",
    veterinarian: "陈兽医",
    nextDue: "2024-07-05",
  },
  {
    id: 4,
    earId: "DB-2023005",
    vaccineType: "狂犬病",
    vaccineName: "狂犬病灭活疫苗",
    vaccinationDate: "2024-01-12",
    veterinarian: "李兽医",
    nextDue: "2025-01-12",
  },
]

// Vaccine inventory
const initialVaccineInventory = [
  {
    id: 1,
    vaccineType: "布病",
    vaccineName: "布野生菌株疫苗",
    stock: 250,
    unit: "剂",
    expiryDate: "2025-06-30",
    status: "充足",
  },
  {
    id: 2,
    vaccineType: "马传贫",
    vaccineName: "马传贫灭活疫苗",
    stock: 180,
    unit: "剂",
    expiryDate: "2025-03-31",
    status: "充足",
  },
  {
    id: 3,
    vaccineType: "口蹄疫",
    vaccineName: "口蹄疫灭活疫苗",
    stock: 45,
    unit: "剂",
    expiryDate: "2024-09-30",
    status: "即将不足",
  },
  {
    id: 4,
    vaccineType: "狂犬病",
    vaccineName: "狂犬病灭活疫苗",
    stock: 320,
    unit: "剂",
    expiryDate: "2025-08-31",
    status: "充足",
  },
]

// Quarantine records
const initialQuarantineRecords = [
  {
    id: 1,
    earId: "DB-2023004",
    name: "花花",
    reason: "布病阳性",
    quarantineStartDate: "2024-01-19",
    estimatedEndDate: "2024-02-19",
    status: "隔离中",
    keeper: "王技术员",
  },
  {
    id: 2,
    earId: "DB-2023007",
    name: "点点",
    reason: "布病可疑待复检",
    quarantineStartDate: "2024-01-17",
    estimatedEndDate: "2024-02-01",
    status: "隔离中",
    keeper: "李技术员",
  },
  {
    id: 3,
    earId: "DB-2022018",
    name: "黑子",
    reason: "健康恢复观察",
    quarantineStartDate: "2024-01-01",
    estimatedEndDate: "2024-01-31",
    status: "即将解除",
    keeper: "陈技术员",
  },
]

const resultConfig = {
  negative: { label: "阴性", className: "bg-primary/10 text-primary border-primary/20" },
  positive: { label: "阳性", className: "bg-destructive/10 text-destructive border-destructive/20" },
  suspect: { label: "可疑", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
}

const trendConfig = {
  up: "text-primary",
  alert: "text-destructive",
  success: "text-primary",
}

const chartConfig = {
  count: {
    label: "检测数",
    color: "hsl(var(--primary))",
  },
}

export function DiseaseControlView() {
  const { activePage } = useNavigation()
  const { toast } = useToast()

  // Health Records State
  const [healthRecords, setHealthRecords] = useState(initialHealthRecords)
  const [isTestModalOpen, setIsTestModalOpen] = useState(false)
  const [editingTestId, setEditingTestId] = useState<number | null>(null)
  const [testForm, setTestForm] = useState({
    earId: "",
    testItem: "布病",
    testType: "定期",
    result: "阴性",
    resultStatus: "negative",
    treatment: "",
    inspector: "",
    testDate: "",
  })
  const [deleteTestId, setDeleteTestId] = useState<number | null>(null)
  const [deleteTestOpen, setDeleteTestOpen] = useState(false)

  // Vaccination Records State
  const [vaccinationRecords, setVaccinationRecords] = useState(initialVaccinationRecords)
  const [isVaccineModalOpen, setIsVaccineModalOpen] = useState(false)
  const [editingVaccineId, setEditingVaccineId] = useState<number | null>(null)
  const [vaccineForm, setVaccineForm] = useState({
    earId: "",
    vaccineType: "布病",
    vaccineName: "",
    vaccinationDate: "",
    veterinarian: "",
    nextDue: "",
  })
  const [deleteVaccineId, setDeleteVaccineId] = useState<number | null>(null)
  const [deleteVaccineOpen, setDeleteVaccineOpen] = useState(false)

  // Vaccine Inventory State
  const [vaccineInventory, setVaccineInventory] = useState(initialVaccineInventory)
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false)
  const [editingInventoryId, setEditingInventoryId] = useState<number | null>(null)
  const [inventoryForm, setInventoryForm] = useState({
    vaccineType: "",
    vaccineName: "",
    stock: 0,
    unit: "剂",
    expiryDate: "",
    status: "充足",
  })
  const [deleteInventoryId, setDeleteInventoryId] = useState<number | null>(null)
  const [deleteInventoryOpen, setDeleteInventoryOpen] = useState(false)

  // Quarantine Records State
  const [quarantineRecords, setQuarantineRecords] = useState(initialQuarantineRecords)
  const [isQuarantineModalOpen, setIsQuarantineModalOpen] = useState(false)
  const [editingQuarantineId, setEditingQuarantineId] = useState<number | null>(null)
  const [quarantineForm, setQuarantineForm] = useState({
    earId: "",
    name: "",
    reason: "",
    quarantineStartDate: "",
    estimatedEndDate: "",
    status: "隔离中",
    keeper: "",
  })
  const [deleteQuarantineId, setDeleteQuarantineId] = useState<number | null>(null)
  const [deleteQuarantineOpen, setDeleteQuarantineOpen] = useState(false)

  // Health Records Handlers
  const handleTestAdd = () => {
    if (!testForm.earId || !testForm.testDate || !testForm.inspector) {
      toast({
        title: "验证失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    if (editingTestId !== null) {
      setHealthRecords(
        healthRecords.map((record) =>
          record.id === editingTestId ? { ...record, ...testForm } : record
        )
      )
      toast({
        title: "更新成功",
        description: "检测记录已更新",
      })
    } else {
      const newRecord = {
        id: Math.max(...healthRecords.map((r) => r.id as number), 0) + 1,
        ...testForm,
      }
      setHealthRecords([...healthRecords, newRecord])
      toast({
        title: "添加成功",
        description: "新检测记录已添加",
      })
    }

    setIsTestModalOpen(false)
    setEditingTestId(null)
    setTestForm({
      earId: "",
      testItem: "布病",
      testType: "定期",
      result: "阴性",
      resultStatus: "negative",
      treatment: "",
      inspector: "",
      testDate: "",
    })
  }

  const handleTestEdit = (record: any) => {
    setEditingTestId(record.id)
    setTestForm(record)
    setIsTestModalOpen(true)
  }

  const handleTestDelete = (id: number) => {
    setDeleteTestId(id)
    setDeleteTestOpen(true)
  }

  const confirmDeleteTest = () => {
    setHealthRecords(healthRecords.filter((record) => record.id !== deleteTestId))
    setDeleteTestOpen(false)
    setDeleteTestId(null)
    toast({
      title: "删除成功",
      description: "检测记录已删除",
    })
  }

  // Vaccination Records Handlers
  const handleVaccineAdd = () => {
    if (!vaccineForm.earId || !vaccineForm.vaccineType || !vaccineForm.vaccineName || !vaccineForm.vaccinationDate || !vaccineForm.veterinarian) {
      toast({
        title: "验证失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    if (editingVaccineId !== null) {
      setVaccinationRecords(
        vaccinationRecords.map((record) =>
          record.id === editingVaccineId ? { ...record, ...vaccineForm } : record
        )
      )
      toast({
        title: "更新成功",
        description: "疫苗接种记录已更新",
      })
    } else {
      const newRecord = {
        id: Math.max(...vaccinationRecords.map((r) => r.id as number), 0) + 1,
        ...vaccineForm,
      }
      setVaccinationRecords([...vaccinationRecords, newRecord])
      toast({
        title: "添加成功",
        description: "新疫苗接种记录已添加",
      })
    }

    setIsVaccineModalOpen(false)
    setEditingVaccineId(null)
    setVaccineForm({
      earId: "",
      vaccineType: "布病",
      vaccineName: "",
      vaccinationDate: "",
      veterinarian: "",
      nextDue: "",
    })
  }

  const handleVaccineEdit = (record: any) => {
    setEditingVaccineId(record.id)
    setVaccineForm(record)
    setIsVaccineModalOpen(true)
  }

  const handleVaccineDelete = (id: number) => {
    setDeleteVaccineId(id)
    setDeleteVaccineOpen(true)
  }

  const confirmDeleteVaccine = () => {
    setVaccinationRecords(vaccinationRecords.filter((record) => record.id !== deleteVaccineId))
    setDeleteVaccineOpen(false)
    setDeleteVaccineId(null)
    toast({
      title: "删除成功",
      description: "疫苗接种记录已删除",
    })
  }

  // Vaccine Inventory Handlers
  const handleInventoryAdd = () => {
    if (!inventoryForm.vaccineType || !inventoryForm.vaccineName || !inventoryForm.stock || !inventoryForm.expiryDate) {
      toast({
        title: "验证失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    if (editingInventoryId !== null) {
      setVaccineInventory(
        vaccineInventory.map((record) =>
          record.id === editingInventoryId ? { ...record, ...inventoryForm } : record
        )
      )
      toast({
        title: "更新成功",
        description: "疫苗库存已更新",
      })
    } else {
      const newRecord = {
        id: Math.max(...vaccineInventory.map((r) => r.id as number), 0) + 1,
        ...inventoryForm,
      }
      setVaccineInventory([...vaccineInventory, newRecord])
      toast({
        title: "添加成功",
        description: "新疫苗库存已添加",
      })
    }

    setIsInventoryModalOpen(false)
    setEditingInventoryId(null)
    setInventoryForm({
      vaccineType: "",
      vaccineName: "",
      stock: 0,
      unit: "剂",
      expiryDate: "",
      status: "充足",
    })
  }

  const handleInventoryEdit = (record: any) => {
    setEditingInventoryId(record.id)
    setInventoryForm(record)
    setIsInventoryModalOpen(true)
  }

  const handleInventoryDelete = (id: number) => {
    setDeleteInventoryId(id)
    setDeleteInventoryOpen(true)
  }

  const confirmDeleteInventory = () => {
    setVaccineInventory(vaccineInventory.filter((record) => record.id !== deleteInventoryId))
    setDeleteInventoryOpen(false)
    setDeleteInventoryId(null)
    toast({
      title: "删除成功",
      description: "疫苗库存已删除",
    })
  }

  // Quarantine Records Handlers
  const handleQuarantineAdd = () => {
    if (!quarantineForm.earId || !quarantineForm.name || !quarantineForm.reason || !quarantineForm.quarantineStartDate || !quarantineForm.keeper) {
      toast({
        title: "验证失败",
        description: "请填写所有必填字段",
        variant: "destructive",
      })
      return
    }

    if (editingQuarantineId !== null) {
      setQuarantineRecords(
        quarantineRecords.map((record) =>
          record.id === editingQuarantineId ? { ...record, ...quarantineForm } : record
        )
      )
      toast({
        title: "更新成功",
        description: "隔离记录已更新",
      })
    } else {
      const newRecord = {
        id: Math.max(...quarantineRecords.map((r) => r.id as number), 0) + 1,
        ...quarantineForm,
      }
      setQuarantineRecords([...quarantineRecords, newRecord])
      toast({
        title: "添加成功",
        description: "新隔离记录已添加",
      })
    }

    setIsQuarantineModalOpen(false)
    setEditingQuarantineId(null)
    setQuarantineForm({
      earId: "",
      name: "",
      reason: "",
      quarantineStartDate: "",
      estimatedEndDate: "",
      status: "隔离中",
      keeper: "",
    })
  }

  const handleQuarantineEdit = (record: any) => {
    setEditingQuarantineId(record.id)
    setQuarantineForm(record)
    setIsQuarantineModalOpen(true)
  }

  const handleQuarantineDelete = (id: number) => {
    setDeleteQuarantineId(id)
    setDeleteQuarantineOpen(true)
  }

  const confirmDeleteQuarantine = () => {
    setQuarantineRecords(quarantineRecords.filter((record) => record.id !== deleteQuarantineId))
    setDeleteQuarantineOpen(false)
    setDeleteQuarantineId(null)
    toast({
      title: "删除成功",
      description: "隔离记录已删除",
    })
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          {activePage === "disease-overview" ? "概览" : activePage === "disease-test-records" ? "检测记录" : activePage === "disease-vaccination" ? "疫苗管理" : "隔离管理"}
        </h2>
        <p className="text-sm text-muted-foreground">
          {activePage === "disease-overview"
            ? "疫病防治各模块数据总览"
            : activePage === "disease-test-records"
            ? "查看各项检测的详细记录"
            : activePage === "disease-vaccination"
            ? "管理疫苗接种和库存信息"
            : "查看和管理隔离驴只"}
        </p>
      </div>

      {/* Overview Section */}
      {activePage === "disease-overview" && (
        <>
          {/* Status Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            {statusCards.map((card) => (
              <Card key={card.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {card.title}
                  </CardTitle>
                  <card.icon className={`h-5 w-5 ${trendConfig[card.trend as keyof typeof trendConfig]}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Disease Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">疫病种类检出统计</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={diseaseData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                      />
                      <YAxis 
                        tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        axisLine={{ stroke: 'hsl(var(--border))' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Test Result Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">检测结果分布</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Pie
                        data={resultDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name} ${value}`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {resultDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Test Records Section */}
      {activePage === "disease-test-records" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">健康检测记录</h3>
            <Button onClick={() => {
              setEditingTestId(null)
              setTestForm({
                earId: "",
                testItem: "布病",
                testType: "定期",
                result: "阴性",
                resultStatus: "negative",
                treatment: "",
                inspector: "",
                testDate: "",
              })
              setIsTestModalOpen(true)
            }} className="gap-2">
              <Plus className="h-4 w-4" />
              新增检测
            </Button>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">检测记录列表</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">检测对象 ID</TableHead>
                    <TableHead className="font-semibold">检测项目</TableHead>
                    <TableHead className="font-semibold">检测类型</TableHead>
                    <TableHead className="font-semibold">检测日期</TableHead>
                    <TableHead className="font-semibold">结果</TableHead>
                    <TableHead className="font-semibold">处理措施</TableHead>
                    <TableHead className="font-semibold">检疫员</TableHead>
                    <TableHead className="font-semibold">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {healthRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.earId}</TableCell>
                      <TableCell>{record.testItem}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={record.testType === "突发" 
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200" 
                            : "bg-muted text-muted-foreground border-border"
                          }
                        >
                          {record.testType}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.testDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={resultConfig[record.resultStatus as keyof typeof resultConfig].className}
                        >
                          {record.resultStatus === "negative" && "○ "}
                          {record.resultStatus === "positive" && "● "}
                          {resultConfig[record.resultStatus as keyof typeof resultConfig].label}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.treatment}</TableCell>
                      <TableCell>{record.inspector}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTestEdit(record)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTestDelete(record.id as number)}
                          className="text-red-600 hover:text-red-800"
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

          {/* Health Test Dialog */}
          <Dialog open={isTestModalOpen} onOpenChange={setIsTestModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingTestId !== null ? "编辑检测记录" : "添加检测记录"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="earId">检测对象 ID</Label>
                  <Input
                    id="earId"
                    value={testForm.earId}
                    onChange={(e) => setTestForm({ ...testForm, earId: e.target.value })}
                    placeholder="例: DB-2023001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testItem">检测项目</Label>
                  <Select value={testForm.testItem} onValueChange={(value) => setTestForm({ ...testForm, testItem: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="布病">布病</SelectItem>
                      <SelectItem value="马传贫">马传贫</SelectItem>
                      <SelectItem value="口蹄疫">口蹄疫</SelectItem>
                      <SelectItem value="狂犬病">狂犬病</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testType">检测类型</Label>
                  <Select value={testForm.testType} onValueChange={(value) => setTestForm({ ...testForm, testType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="定期">定期</SelectItem>
                      <SelectItem value="突发">突发</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="result">检测结果</Label>
                  <Select value={testForm.result} onValueChange={(value) => {
                    let resultStatus = "negative"
                    if (value === "阳性") resultStatus = "positive"
                    if (value === "可疑") resultStatus = "suspect"
                    setTestForm({ ...testForm, result: value, resultStatus: resultStatus as any })
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="阴性">阴性</SelectItem>
                      <SelectItem value="阳性">阳性</SelectItem>
                      <SelectItem value="可疑">可疑</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="treatment">处理措施</Label>
                  <Input
                    id="treatment"
                    value={testForm.treatment}
                    onChange={(e) => setTestForm({ ...testForm, treatment: e.target.value })}
                    placeholder="例: 隔离观察"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspector">检疫员</Label>
                  <Input
                    id="inspector"
                    value={testForm.inspector}
                    onChange={(e) => setTestForm({ ...testForm, inspector: e.target.value })}
                    placeholder="例: 李兽医"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testDate">检测日期</Label>
                  <Input
                    id="testDate"
                    type="date"
                    value={testForm.testDate}
                    onChange={(e) => setTestForm({ ...testForm, testDate: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsTestModalOpen(false)}>取消</Button>
                <Button onClick={handleTestAdd}>{editingTestId !== null ? "更新" : "添加"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Test Dialog */}
          <AlertDialog open={deleteTestOpen} onOpenChange={setDeleteTestOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除</AlertDialogTitle>
                <AlertDialogDescription>
                  删除此检测记录将无法恢复，是否继续？
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialog>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeleteTest} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  删除
                </AlertDialogAction>
              </AlertDialog>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      {/* Vaccination Section */}
      {activePage === "disease-vaccination" && (
        <>
          {/* Vaccine Inventory Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            {vaccineInventory.map((vaccine) => (
              <Card key={vaccine.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Syringe className="h-4 w-4" />
                      {vaccine.vaccineType}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleInventoryEdit(vaccine)}
                      className="h-6 w-6 p-0"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{vaccine.stock}</div>
                  <p className="text-xs text-muted-foreground mt-1">{vaccine.unit}</p>
                  <div className="mt-2">
                    <Badge 
                      variant="outline"
                      className={vaccine.status === "充足" 
                        ? "bg-green-50 text-green-700 border-green-200" 
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {vaccine.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Vaccination Records */}
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">疫苗接种记录</h3>
            <Button onClick={() => {
              setEditingVaccineId(null)
              setVaccineForm({
                earId: "",
                vaccineType: "布病",
                vaccineName: "",
                vaccinationDate: "",
                veterinarian: "",
                nextDue: "",
              })
              setIsVaccineModalOpen(true)
            }} className="gap-2">
              <Plus className="h-4 w-4" />
              新增接种
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">驴号</TableHead>
                    <TableHead className="font-semibold">疫苗种类</TableHead>
                    <TableHead className="font-semibold">疫苗名称</TableHead>
                    <TableHead className="font-semibold">接种日期</TableHead>
                    <TableHead className="font-semibold">下次应接种日期</TableHead>
                    <TableHead className="font-semibold">接种员</TableHead>
                    <TableHead className="font-semibold">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vaccinationRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.earId}</TableCell>
                      <TableCell>{record.vaccineType}</TableCell>
                      <TableCell>{record.vaccineName}</TableCell>
                      <TableCell>{record.vaccinationDate}</TableCell>
                      <TableCell>{record.nextDue}</TableCell>
                      <TableCell>{record.veterinarian}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVaccineEdit(record)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleVaccineDelete(record.id as number)}
                          className="text-red-600 hover:text-red-800"
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

          {/* Vaccine Dialog */}
          <Dialog open={isVaccineModalOpen} onOpenChange={setIsVaccineModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingVaccineId !== null ? "编辑接种记录" : "添加接种记录"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="vacEarId">驴号</Label>
                  <Input
                    id="vacEarId"
                    value={vaccineForm.earId}
                    onChange={(e) => setVaccineForm({ ...vaccineForm, earId: e.target.value })}
                    placeholder="例: DB-2023001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vaccineType">疫苗种类</Label>
                  <Select value={vaccineForm.vaccineType} onValueChange={(value) => setVaccineForm({ ...vaccineForm, vaccineType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="布病">布病</SelectItem>
                      <SelectItem value="马传贫">马传贫</SelectItem>
                      <SelectItem value="口蹄疫">口蹄疫</SelectItem>
                      <SelectItem value="狂犬病">狂犬病</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vaccineName">疫苗名称</Label>
                  <Input
                    id="vaccineName"
                    value={vaccineForm.vaccineName}
                    onChange={(e) => setVaccineForm({ ...vaccineForm, vaccineName: e.target.value })}
                    placeholder="例: 布野生菌株疫苗"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vaccinationDate">接种日期</Label>
                  <Input
                    id="vaccinationDate"
                    type="date"
                    value={vaccineForm.vaccinationDate}
                    onChange={(e) => setVaccineForm({ ...vaccineForm, vaccinationDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nextDue">下次应接种日期</Label>
                  <Input
                    id="nextDue"
                    type="date"
                    value={vaccineForm.nextDue}
                    onChange={(e) => setVaccineForm({ ...vaccineForm, nextDue: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="veterinarian">接种员</Label>
                  <Input
                    id="veterinarian"
                    value={vaccineForm.veterinarian}
                    onChange={(e) => setVaccineForm({ ...vaccineForm, veterinarian: e.target.value })}
                    placeholder="例: 李兽医"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsVaccineModalOpen(false)}>取消</Button>
                <Button onClick={handleVaccineAdd}>{editingVaccineId !== null ? "更新" : "添加"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Vaccine Dialog */}
          <AlertDialog open={deleteVaccineOpen} onOpenChange={setDeleteVaccineOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除</AlertDialogTitle>
                <AlertDialogDescription>
                  删除此疫苗接种记录将无法恢复，是否继续？
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialog>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeleteVaccine} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  删除
                </AlertDialogAction>
              </AlertDialog>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}

      {/* Quarantine Section */}
      {activePage === "disease-quarantine" && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">隔离管理记录</h3>
            <Button onClick={() => {
              setEditingQuarantineId(null)
              setQuarantineForm({
                earId: "",
                name: "",
                reason: "",
                quarantineStartDate: "",
                estimatedEndDate: "",
                status: "隔离中",
                keeper: "",
              })
              setIsQuarantineModalOpen(true)
            }} className="gap-2">
              <Plus className="h-4 w-4" />
              新增隔离
            </Button>
          </div>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">驴号</TableHead>
                    <TableHead className="font-semibold">驴名</TableHead>
                    <TableHead className="font-semibold">隔离原因</TableHead>
                    <TableHead className="font-semibold">隔离开始日期</TableHead>
                    <TableHead className="font-semibold">预计解除日期</TableHead>
                    <TableHead className="font-semibold">隔离状态</TableHead>
                    <TableHead className="font-semibold">饲养员</TableHead>
                    <TableHead className="font-semibold">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quarantineRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.earId}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.reason}</TableCell>
                      <TableCell>{record.quarantineStartDate}</TableCell>
                      <TableCell>{record.estimatedEndDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={record.status === "隔离中" 
                            ? "bg-yellow-50 text-yellow-700 border-yellow-200" 
                            : "bg-orange-50 text-orange-700 border-orange-200"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{record.keeper}</TableCell>
                      <TableCell className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuarantineEdit(record)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleQuarantineDelete(record.id as number)}
                          className="text-red-600 hover:text-red-800"
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

          {/* Quarantine Dialog */}
          <Dialog open={isQuarantineModalOpen} onOpenChange={setIsQuarantineModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingQuarantineId !== null ? "编辑隔离记录" : "添加隔离记录"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qEarId">驴号</Label>
                  <Input
                    id="qEarId"
                    value={quarantineForm.earId}
                    onChange={(e) => setQuarantineForm({ ...quarantineForm, earId: e.target.value })}
                    placeholder="例: DB-2023004"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qName">驴名</Label>
                  <Input
                    id="qName"
                    value={quarantineForm.name}
                    onChange={(e) => setQuarantineForm({ ...quarantineForm, name: e.target.value })}
                    placeholder="例: 花花"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qReason">隔离原因</Label>
                  <Input
                    id="qReason"
                    value={quarantineForm.reason}
                    onChange={(e) => setQuarantineForm({ ...quarantineForm, reason: e.target.value })}
                    placeholder="例: 布病阳性"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qStartDate">隔离开始日期</Label>
                  <Input
                    id="qStartDate"
                    type="date"
                    value={quarantineForm.quarantineStartDate}
                    onChange={(e) => setQuarantineForm({ ...quarantineForm, quarantineStartDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qEndDate">预计解除日期</Label>
                  <Input
                    id="qEndDate"
                    type="date"
                    value={quarantineForm.estimatedEndDate}
                    onChange={(e) => setQuarantineForm({ ...quarantineForm, estimatedEndDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qStatus">隔离状态</Label>
                  <Select value={quarantineForm.status} onValueChange={(value) => setQuarantineForm({ ...quarantineForm, status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="隔离中">隔离中</SelectItem>
                      <SelectItem value="即将解除">即将解除</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qKeeper">饲养员</Label>
                  <Input
                    id="qKeeper"
                    value={quarantineForm.keeper}
                    onChange={(e) => setQuarantineForm({ ...quarantineForm, keeper: e.target.value })}
                    placeholder="例: 王技术员"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsQuarantineModalOpen(false)}>取消</Button>
                <Button onClick={handleQuarantineAdd}>{editingQuarantineId !== null ? "更新" : "添加"}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Quarantine Dialog */}
          <AlertDialog open={deleteQuarantineOpen} onOpenChange={setDeleteQuarantineOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>确认删除</AlertDialogTitle>
                <AlertDialogDescription>
                  删除此隔离记录将无法恢复，是否继续？
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialog>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={confirmDeleteQuarantine} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  删除
                </AlertDialogAction>
              </AlertDialog>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  )
}
