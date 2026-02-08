"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Plus, Syringe, ArrowRightLeft, Heart, Trash2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useNavigation } from "../navigation-context"
import { AddDonkeyModal } from "../add-donkey-modal"
import { useCountAnimation } from "@/hooks/use-count-animation"
import { useStaggerAnimation } from "@/hooks/use-stagger-animation"
import { useToast } from "@/hooks/use-toast"

const initialDonkeyRegistry = [
  {
    id: "DB-2023001",
    breed: "德州黑驴",
    age: 4,
    gender: "公",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2019-03-15",
    fatherId: "DB-2018005",
    motherId: "DB-2017012",
    photo: null,
  },
  {
    id: "DB-2023002",
    breed: "关中驴",
    age: 3,
    gender: "母",
    status: "观察中",
    statusColor: "warning" as const,
    birthDate: "2020-06-22",
    fatherId: "DB-2017008",
    motherId: "DB-2016003",
    photo: null,
  },
  {
    id: "DB-2023003",
    breed: "德州黑驴",
    age: 5,
    gender: "公",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2018-11-10",
    fatherId: "DB-2015002",
    motherId: "DB-2016007",
    photo: null,
  },
  {
    id: "DB-2023004",
    breed: "广灵驴",
    age: 2,
    gender: "母",
    status: "隔离",
    statusColor: "destructive" as const,
    birthDate: "2021-08-05",
    fatherId: "DB-2018011",
    motherId: "DB-2019004",
    photo: null,
  },
  {
    id: "DB-2023005",
    breed: "佳米驴",
    age: 4,
    gender: "公",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2019-12-18",
    fatherId: "DB-2016009",
    motherId: "DB-2017001",
    photo: null,
  },
  {
    id: "DB-2023006",
    breed: "德州黑驴",
    age: 6,
    gender: "母",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2017-04-20",
    fatherId: "DB-2014006",
    motherId: "DB-2015010",
    photo: null,
  },
  {
    id: "DB-2023007",
    breed: "关中驴",
    age: 3,
    gender: "公",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2020-02-11",
    fatherId: "DB-2017002",
    motherId: "DB-2016006",
    photo: null,
  },
  {
    id: "DB-2023008",
    breed: "广灵驴",
    age: 4,
    gender: "母",
    status: "观察中",
    statusColor: "warning" as const,
    birthDate: "2019-07-03",
    fatherId: "DB-2017005",
    motherId: "DB-2016007",
    photo: null,
  },
  {
    id: "DB-2023009",
    breed: "佳米驴",
    age: 5,
    gender: "公",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2018-05-19",
    fatherId: "DB-2017003",
    motherId: "DB-2016004",
    photo: null,
  },
  {
    id: "DB-2023010",
    breed: "德州黑驴",
    age: 2,
    gender: "母",
    status: "隔离",
    statusColor: "destructive" as const,
    birthDate: "2021-09-14",
    fatherId: "DB-2017006",
    motherId: "DB-2016008",
    photo: null,
  },
  {
    id: "DB-2022001",
    breed: "德州黑驴",
    age: 3,
    gender: "公",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2020-12-08",
    fatherId: "DB-2016009",
    motherId: "DB-2015001",
    photo: null,
  },
  {
    id: "DB-2022002",
    breed: "关中驴",
    age: 3,
    gender: "母",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2020-08-26",
    fatherId: "DB-2017005",
    motherId: "DB-2016006",
    photo: null,
  },
  {
    id: "DB-2022003",
    breed: "广灵驴",
    age: 4,
    gender: "公",
    status: "观察中",
    statusColor: "warning" as const,
    birthDate: "2019-10-30",
    fatherId: "DB-2017004",
    motherId: "DB-2016007",
    photo: null,
  },
  {
    id: "DB-2021001",
    breed: "佳米驴",
    age: 5,
    gender: "母",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2018-03-21",
    fatherId: "DB-2015002",
    motherId: "DB-2016004",
    photo: null,
  },
  {
    id: "DB-2021002",
    breed: "关中驴",
    age: 4,
    gender: "公",
    status: "健康",
    statusColor: "success" as const,
    birthDate: "2019-01-17",
    fatherId: "DB-2017006",
    motherId: "DB-2016002",
    photo: null,
  },
]

const timelineEvents = [
  { date: "2023-12-01", type: "vaccination", label: "疫苗接种", description: "完成口蹄疫疫苗接种" },
  { date: "2023-10-15", type: "breeding", label: "配种记录", description: "与 DB-2020003 完成配种" },
  { date: "2023-08-22", type: "transfer", label: "圈舍调动", description: "从 A 区转移至 B 区" },
  { date: "2023-06-10", type: "vaccination", label: "疫苗接种", description: "完成狂犬病疫苗接种" },
  { date: "2023-04-05", type: "breeding", label: "配种记录", description: "与 DB-2019008 完成配种" },
]

const statusConfig = {
  success: { label: "健康", className: "bg-primary/10 text-primary border-primary/20" },
  warning: { label: "观察中", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
  destructive: { label: "隔离", className: "bg-destructive/10 text-destructive border-destructive/20" },
}

const eventIcons = {
  vaccination: <Syringe className="h-4 w-4" />,
  transfer: <ArrowRightLeft className="h-4 w-4" />,
  breeding: <Heart className="h-4 w-4" />,
}

export function HerdRegistryView() {
  const { activePage } = useNavigation()
  const { toast } = useToast()
  const [registry, setRegistry] = useState(initialDonkeyRegistry)
  const [selectedDonkey, setSelectedDonkey] = useState<typeof initialDonkeyRegistry[0] | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [breedFilter, setBreedFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [donkeyToDelete, setDonkeyToDelete] = useState<typeof initialDonkeyRegistry[0] | null>(null)

  // Animation hooks
  const totalCount = useCountAnimation(registry.length, 2000)
  const maleCount = useCountAnimation(registry.filter(d => d.gender === "公").length, 2000)
  const femaleCount = useCountAnimation(registry.filter(d => d.gender === "母").length, 2000)
  const healthyCount = useCountAnimation(registry.filter(d => d.status === "健康").length, 2000)
  const avgAge = useCountAnimation(
    Math.round((registry.reduce((sum, d) => sum + d.age, 0) / registry.length) * 10),
    2000
  )
  
  // Stagger animation for breed and health status items
  const breedVisibleIndices = useStaggerAnimation(
    Array.from(new Set(registry.map(d => d.breed))).length,
    250
  )
  const healthVisibleIndices = useStaggerAnimation(3, 250)

  // Close drawer when leaving herd registry module
  useEffect(() => {
    // 如果不是种驴档案页面，关闭抽屉
    if (activePage !== "herd-registry" && 
        activePage !== "herd-registry-overview" && 
        activePage !== "herd-registry-basic" && 
        activePage !== "herd-registry-pedigree") {
      setIsDrawerOpen(false)
      setSelectedDonkey(null)
    }
  }, [activePage])

  // 清理：组件卸载时关闭抽屉
  useEffect(() => {
    return () => {
      setIsDrawerOpen(false)
      setSelectedDonkey(null)
    }
  }, [])

  const handleRowClick = (donkey: typeof initialDonkeyRegistry[0]) => {
    setSelectedDonkey(donkey)
    setIsDrawerOpen(true)
  }

  const filteredData = registry.filter((donkey) => {
    const matchesBreed = breedFilter === "all" || donkey.breed === breedFilter
    const matchesStatus = statusFilter === "all" || donkey.status === statusFilter
    const matchesSearch = donkey.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donkey.breed.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesBreed && matchesStatus && matchesSearch
  })

  const handleDeleteClick = (donkey: typeof initialDonkeyRegistry[0]) => {
    setDonkeyToDelete(donkey)
    setDeleteDialogOpen(true)
  }

  const handleConfirmDelete = () => {
    if (donkeyToDelete) {
      // 从列表中删除
      const updatedRegistry = registry.filter(d => d.id !== donkeyToDelete.id)
      setRegistry(updatedRegistry)
      
      // 从 localStorage 中删除新增档案数据
      const savedDonkeys = JSON.parse(localStorage.getItem("addedDonkeys") || "[]")
      const filteredSavedDonkeys = savedDonkeys.filter((d: any) => d.earId !== donkeyToDelete.id)
      localStorage.setItem("addedDonkeys", JSON.stringify(filteredSavedDonkeys))
      
      // 关闭 drawer 和对话框
      setIsDrawerOpen(false)
      setSelectedDonkey(null)
      setDeleteDialogOpen(false)
      setDonkeyToDelete(null)
      
      toast({
        title: "成功删除",
        description: `种驴档案 ${donkeyToDelete.id} 已删除`,
      })
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-foreground">
            {activePage === "herd-registry-overview" ? "概览" : activePage === "herd-registry-pedigree" ? "品种血缘" : "基础信息"}
          </h2>
          <p className="text-sm text-muted-foreground">
            {activePage === "herd-registry-overview"
              ? "种驴档案各模块数据总览"
              : activePage === "herd-registry-pedigree" 
              ? "查看种驴的血缘关系、父本和母本信息"
              : "管理所有种驴的基础信息、年龄、性别和状态"}
          </p>
        </div>
        <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" />
          新增档案
        </Button>
        <AddDonkeyModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      </div>

      {/* Overview Section */}
      {activePage === "herd-registry-overview" && (
        <div className="grid gap-6 md:grid-cols-4">
          {/* Total Donkeys Card */}
          <Card className="animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-0 shadow-sm hover:shadow-md" style={{ animationDelay: "0ms" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">种驴总数</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="text-3xl font-bold">{totalCount}</div>
                <p className="text-xs text-muted-foreground mt-1">近期无变化</p>
              </div>
            </CardContent>
          </Card>

          {/* Male/Female Distribution */}
          <Card className="animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-0 shadow-sm hover:shadow-md" style={{ animationDelay: "100ms" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">性别分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="text-2xl font-bold">
                  {maleCount} / {femaleCount}
                </div>
                <p className="text-xs text-muted-foreground mt-1">公 / 母</p>
              </div>
            </CardContent>
          </Card>

          {/* Healthy Count */}
          <Card className="animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-0 shadow-sm hover:shadow-md" style={{ animationDelay: "200ms" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">健康种驴</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="text-3xl font-bold">{healthyCount}</div>
                <p className="text-xs text-muted-foreground mt-1">占比 {registry.length > 0 ? Math.round((healthyCount / registry.length) * 100) : 0}%</p>
              </div>
            </CardContent>
          </Card>

          {/* Average Age */}
          <Card className="animate-fade-in-up transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer border-0 shadow-sm hover:shadow-md" style={{ animationDelay: "300ms" }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">平均年龄</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <div className="text-3xl font-bold">{(avgAge / 10).toFixed(1)}</div>
                <p className="text-xs text-muted-foreground mt-1">岁</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Breed Distribution Chart */}
      {activePage === "herd-registry-overview" && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">品种分布统计</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from(new Set(registry.map(d => d.breed))).map((breed, index) => {
                  const count = registry.filter(d => d.breed === breed).length
                  const percentage = Math.round((count / registry.length) * 100)
                  const isVisible = breedVisibleIndices.has(index)
                  return (
                    <div 
                      key={breed} 
                      className={`flex items-center justify-between transition-all duration-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm text-muted-foreground">{breed}</span>
                        <div className={`flex-1 h-3 bg-muted/50 rounded-full overflow-hidden border border-muted transition-all duration-700 ${
                          isVisible ? "border-primary/20 bg-primary/5" : ""
                        }`}>
                          <div 
                            className={`h-full bg-gradient-to-r from-primary via-primary to-primary/80 rounded-full shadow-md ${
                              isVisible ? "animate-progress-fill" : ""
                            }`}
                            style={{ 
                              "--progress-width": `${percentage}%`,
                            } as React.CSSProperties}
                          />
                        </div>
                      </div>
                      <span className={`text-sm font-medium ml-2 transition-all duration-700 ${
                        isVisible ? "text-primary" : "text-muted-foreground"
                      }`}>{count}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">健康状态分布</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {["健康", "观察中", "隔离"].map((status, index) => {
                  const count = registry.filter(d => d.status === status).length
                  const percentage = count > 0 ? Math.round((count / registry.length) * 100) : 0
                  const colors = {
                    "健康": "bg-green-500",
                    "观察中": "bg-yellow-500",
                    "隔离": "bg-red-500"
                  }
                  const isVisible = healthVisibleIndices.has(index)
                  return (
                    <div 
                      key={status} 
                      className={`flex items-center justify-between transition-all duration-500 ${
                        isVisible ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        <span className="text-sm text-muted-foreground">{status}</span>
                        <div className={`flex-1 h-3 bg-muted/50 rounded-full overflow-hidden border transition-all duration-700 ${
                          isVisible ? `border-${colors[status as keyof typeof colors].split('-')[1]}-200 bg-opacity-5` : "border-transparent"
                        }`}>
                          <div 
                            className={`h-full rounded-full shadow-md ${colors[status as keyof typeof colors]} ${
                              isVisible ? "animate-progress-fill" : ""
                            }`}
                            style={{ 
                              "--progress-width": `${percentage}%`,
                            } as React.CSSProperties}
                          />
                        </div>
                      </div>
                      <span className="text-sm font-medium ml-2 text-muted-foreground">{count}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activePage !== "herd-registry-overview" && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="搜索耳号或品种..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={breedFilter} onValueChange={setBreedFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="品种筛选" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部品种</SelectItem>
                    <SelectItem value="德州黑驴">德州黑驴</SelectItem>
                    <SelectItem value="关中驴">关中驴</SelectItem>
                    <SelectItem value="广灵驴">广灵驴</SelectItem>
                    <SelectItem value="佳米驴">佳米驴</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="状态筛选" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部状态</SelectItem>
                    <SelectItem value="健康">健康</SelectItem>
                    <SelectItem value="观察中">观察中</SelectItem>
                    <SelectItem value="隔离">隔离</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activePage !== "herd-registry-overview" && (
      <Card>
        <CardContent className="p-0">
          <div className="rounded-lg border-0">
            {/* Basic Info Table */}
            {activePage === "herd-registry-basic" && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">耳号 ID</TableHead>
                    <TableHead className="font-semibold">品种</TableHead>
                    <TableHead className="font-semibold">性别</TableHead>
                    <TableHead className="font-semibold">年龄</TableHead>
                    <TableHead className="font-semibold">状态</TableHead>
                    <TableHead className="font-semibold">出生日期</TableHead>
                    <TableHead className="font-semibold">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((donkey) => (
                    <TableRow 
                      key={donkey.id} 
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => handleRowClick(donkey)}
                    >
                      <TableCell className="font-medium">{donkey.id}</TableCell>
                      <TableCell>{donkey.breed}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {donkey.gender === "公" ? "♂ 公" : "♀ 母"}
                        </Badge>
                      </TableCell>
                      <TableCell>{donkey.age} 岁</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={statusConfig[donkey.statusColor].className}
                        >
                          {statusConfig[donkey.statusColor].label}
                        </Badge>
                      </TableCell>
                      <TableCell>{donkey.birthDate}</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteClick(donkey)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}

            {/* Pedigree Table */}
            {activePage === "herd-registry-pedigree" && (
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead className="font-semibold">耳号 ID</TableHead>
                    <TableHead className="font-semibold">品种</TableHead>
                    <TableHead className="font-semibold">父本 ID</TableHead>
                    <TableHead className="font-semibold">母本 ID</TableHead>
                    <TableHead className="font-semibold">年龄</TableHead>
                    <TableHead className="font-semibold">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((donkey) => (
                    <TableRow 
                      key={donkey.id} 
                      className="cursor-pointer hover:bg-muted/30"
                      onClick={() => handleRowClick(donkey)}
                    >
                      <TableCell className="font-medium">{donkey.id}</TableCell>
                      <TableCell>{donkey.breed}</TableCell>
                      <TableCell className="text-muted-foreground">{donkey.fatherId}</TableCell>
                      <TableCell className="text-muted-foreground">{donkey.motherId}</TableCell>
                      <TableCell>{donkey.age} 岁</TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteClick(donkey)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
      )}

      {/* Detail Drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-[480px] sm:max-w-[480px] overflow-y-auto">
          {selectedDonkey && (
            <>
              <SheetHeader className="pb-6">
                <SheetTitle className="text-xl">种驴详细档案</SheetTitle>
              </SheetHeader>

              {/* Basic Info Section */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20 rounded-lg">
                    <AvatarImage src={selectedDonkey.photo || undefined} />
                    <AvatarFallback className="rounded-lg bg-primary/10 text-primary text-2xl">
                      {selectedDonkey.breed.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <h3 className="text-lg font-semibold">{selectedDonkey.id}</h3>
                    <p className="text-sm text-muted-foreground">{selectedDonkey.breed}</p>
                    <Badge
                      variant="outline"
                      className={statusConfig[selectedDonkey.statusColor].className}
                    >
                      {statusConfig[selectedDonkey.statusColor].label}
                    </Badge>
                  </div>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">基本信息</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">性别</span>
                      <p className="font-medium">{selectedDonkey.gender === "公" ? "♂ 公驴" : "♀ 母驴"}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">出生日期</span>
                      <p className="font-medium">{selectedDonkey.birthDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">年龄</span>
                      <p className="font-medium">{selectedDonkey.age} 岁</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">品种</span>
                      <p className="font-medium">{selectedDonkey.breed}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">血缘信息</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">父本 ID</span>
                      <p className="font-medium">{selectedDonkey.fatherId}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">母本 ID</span>
                      <p className="font-medium">{selectedDonkey.motherId}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline Section */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">事件记录</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative space-y-4">
                      {timelineEvents.map((event, index) => (
                        <div key={index} className="flex gap-3">
                          <div className="flex flex-col items-center">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                              {eventIcons[event.type as keyof typeof eventIcons]}
                            </div>
                            {index < timelineEvents.length - 1 && (
                              <div className="w-px flex-1 bg-border my-1" />
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{event.label}</span>
                              <span className="text-xs text-muted-foreground">{event.date}</span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="flex gap-2 pt-4">
                  <Button className="flex-1">编辑档案</Button>
                  <Button variant="outline" className="flex-1 bg-transparent">打印档案</Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 bg-transparent border-destructive/20 text-destructive hover:bg-destructive/10"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteClick(selectedDonkey!)
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    删除档案
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除</AlertDialogTitle>
            <AlertDialogDescription>
              即将删除种驴档案 <span className="font-semibold text-foreground">{donkeyToDelete?.id}</span>（{donkeyToDelete?.breed}），此操作不可撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="bg-destructive/5 border border-destructive/20 rounded-md p-3 text-sm text-destructive">
            ⚠️ 删除后将彻底移除所有相关档案数据，包括配种记录、体重记录等。
          </div>
          <div className="flex gap-2 justify-end">
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              确认删除
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
