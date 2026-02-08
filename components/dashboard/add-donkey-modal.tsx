"use client"

import { useState } from "react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { CalendarIcon, Upload } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { BreedingRecords } from "./donkey-details/BreedingRecords"
import { GrowthRecords } from "./donkey-details/GrowthRecords"
import { TreatmentTimeline } from "./donkey-details/TreatmentTimeline"
import { useToast } from "@/hooks/use-toast"

interface AddDonkeyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddDonkeyModal({ open, onOpenChange }: AddDonkeyModalProps) {
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    earId: "",
    breed: "",
    gender: "公",
    source: "",
  })
  const [breedingRecords, setBreedingRecords] = useState<any[]>([])
  const [growthEntries, setGrowthEntries] = useState<Array<{ date: string; weight: number }>>([])
  const [treatmentEvents, setTreatmentEvents] = useState<any[]>([])
  const { toast } = useToast()
  const [errors, setErrors] = useState<{ earId?: string; breed?: string }>({})
  const earIdRegex = /^DB-\d{7}$/
  const isValidISODate = (s?: string | null) => {
    if (!s) return false
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
    const d = new Date(s)
    return !isNaN(d.getTime())
  }

  const generateEarId = () => {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, "0")
    return `DB-${year}${random}`
  }

  const handleSubmit = () => {
    const nextErrors: { earId?: string; breed?: string } = {}
    if (!formData.earId) nextErrors.earId = "耳号为必填项"
    else if (!earIdRegex.test(formData.earId)) nextErrors.earId = "耳号格式应为 DB-YYYYXXX，例如 DB-2024001"
    if (!formData.breed) nextErrors.breed = "请选择品种"
    if (date && !isValidISODate(format(date, "yyyy-MM-dd"))) nextErrors.earId = nextErrors.earId || "出生日期格式错误"
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      toast({ title: "验证失败", description: "请补全表单中的必填项" })
      return
    }

    const payload = {
      ...formData,
      birthDate: date ? format(date, "yyyy-MM-dd") : null,
      breedingRecords,
      growthEntries,
      treatmentEvents,
      createdAt: new Date().toISOString(),
    }

    try {
      const existing = JSON.parse(localStorage.getItem("donkeys") || "[]")
      existing.push(payload)
      localStorage.setItem("donkeys", JSON.stringify(existing))
      toast({ title: "保存成功", description: "已保存到本地草稿" })
    } catch (err) {
      toast({ title: "保存失败", description: "本地保存出现错误" })
      console.error(err)
    }

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">录入种驴基础信息</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            {/* 耳号 ID */}
            <div className="space-y-2">
              <Label htmlFor="earId">耳号 ID</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="earId"
                  placeholder={generateEarId()}
                  value={formData.earId}
                  onChange={(e) => {
                    let v = e.target.value.toUpperCase().trim()
                    if (!v.startsWith("DB-")) {
                      // 如果用户输入的是纯数字或年份后缀，自动补上前缀
                      if (/^\d+$/.test(v)) v = `DB-${v}`
                      else v = v
                    }
                    setFormData({ ...formData, earId: v })
                  }}
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, earId: generateEarId() })}
                  className="rounded-md border px-3 py-1 text-sm hover:bg-muted"
                >
                  生成耳号
                </button>
              </div>
              <p className="text-xs text-muted-foreground">示例格式：DB-2024001，或点击“生成耳号”快速填充</p>
              {errors.earId && <p className="text-xs text-red-600 mt-1">{errors.earId}</p>}
            </div>

            {/* 品种 */}
            <div className="space-y-2">
              <Label>品种</Label>
              <Select
                value={formData.breed}
                onValueChange={(value) => setFormData({ ...formData, breed: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择品种" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="德州黑驴">德州黑驴</SelectItem>
                  <SelectItem value="关中驴">关中驴</SelectItem>
                  <SelectItem value="广灵驴">广灵驴</SelectItem>
                </SelectContent>
              </Select>
              {errors.breed && <p className="text-xs text-red-600 mt-1">{errors.breed}</p>}
            </div>

            {/* 性别 */}
            <div className="space-y-2">
              <Label>性别</Label>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData({ ...formData, gender: value })}
                className="flex gap-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="公" id="male" />
                  <Label htmlFor="male" className="font-normal cursor-pointer">公</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="母" id="female" />
                  <Label htmlFor="female" className="font-normal cursor-pointer">母</Label>
                </div>
              </RadioGroup>
            </div>

            {/* 出生日期 */}
            <div className="space-y-2">
              <Label>出生日期</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-transparent",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "yyyy-MM-dd", { locale: zhCN }) : "选择日期"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    autoFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* 来源 */}
            <div className="space-y-2">
              <Label>来源</Label>
              <Select
                value={formData.source}
                onValueChange={(value) => setFormData({ ...formData, source: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="请选择来源" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="自繁">自繁</SelectItem>
                  <SelectItem value="购入">购入</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* 照片上传 */}
            <div className="space-y-2">
              <Label>照片上传</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">点击或拖拽上传</p>
              </div>
            </div>
          </div>

          {/* 详细信息标签页 */}
          <div className="pt-4">
            <Tabs defaultValue="breeding">
              <TabsList>
                <TabsTrigger value="breeding">繁殖记录</TabsTrigger>
                <TabsTrigger value="growth">体重/生长</TabsTrigger>
                <TabsTrigger value="treatment">疾病/治疗</TabsTrigger>
              </TabsList>

              <TabsContent value="breeding">
                <BreedingRecords
                  records={breedingRecords}
                  onAdd={(r) => setBreedingRecords((s) => [...s, r])}
                  onRemove={(i) => setBreedingRecords((s) => s.filter((_, idx) => idx !== i))}
                />
              </TabsContent>

              <TabsContent value="growth">
                <GrowthRecords
                  entries={growthEntries}
                  onAdd={(e) => setGrowthEntries((s) => [...s, e])}
                  onRemove={(i) => setGrowthEntries((s) => s.filter((_, idx) => idx !== i))}
                />
              </TabsContent>

              <TabsContent value="treatment">
                <TreatmentTimeline
                  events={treatmentEvents}
                  onAdd={(ev) => setTreatmentEvents((s) => [...s, ev])}
                  onRemove={(i) => setTreatmentEvents((s) => s.filter((_, idx) => idx !== i))}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="bg-transparent">
            取消
          </Button>
          <Button onClick={handleSubmit} disabled={!formData.earId || !formData.breed}>
            确认录入
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
