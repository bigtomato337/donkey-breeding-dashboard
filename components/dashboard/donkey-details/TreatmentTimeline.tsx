"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface EventItem {
  date: string
  type: string
  diagnosis?: string
  meds?: string
}

interface Props {
  events: EventItem[]
  onAdd: (ev: EventItem) => void
  onRemove: (index: number) => void
}

export function TreatmentTimeline({ events, onAdd, onRemove }: Props) {
  const [form, setForm] = useState<EventItem>({ date: "", type: "检测", diagnosis: "", meds: "" })
  const { toast } = useToast()
  const [fieldError, setFieldError] = useState<{ date?: string; type?: string }>({})
  const [selectedDate, setSelectedDate] = useState<Date>()
  const isValidISODate = (s?: string) => {
    if (!s) return false
    if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false
    const d = new Date(s)
    return !isNaN(d.getTime())
  }

  const add = () => {
    setFieldError({})
    if (!form.date) {
      setFieldError({ date: "事件日期为必填项" })
      toast({ title: "验证失败", description: "请填写事件日期" })
      return
    }
    if (!isValidISODate(form.date)) {
      setFieldError({ date: "日期格式应为 YYYY-MM-DD" })
      toast({ title: "验证失败", description: "日期格式错误" })
      return
    }
    if (!form.type) {
      setFieldError({ type: "事件类型为必填项" })
      toast({ title: "验证失败", description: "请填写事件类型" })
      return
    }
    onAdd(form)
    setForm({ date: "", type: "检测", diagnosis: "", meds: "" })
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div>
          <Label>日期</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !form.date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {form.date || "选择日期"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={selectedDate} onSelect={(d) => {
                if (d) {
                  const dateStr = format(d, "yyyy-MM-dd")
                  setForm({ ...form, date: dateStr })
                  setSelectedDate(d)
                }
              }} />
            </PopoverContent>
          </Popover>
          {fieldError.date && <p className="text-xs text-red-600 mt-1">{fieldError.date}</p>}
        </div>
        <div>
          <Label>类型</Label>
          <Input value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
          {fieldError.type && <p className="text-xs text-red-600 mt-1">{fieldError.type}</p>}
        </div>
        <div>
          <Label>诊断</Label>
          <Input value={form.diagnosis} onChange={(e) => setForm({ ...form, diagnosis: e.target.value })} />
        </div>
        <div>
          <Label>用药/处理</Label>
          <Input value={form.meds} onChange={(e) => setForm({ ...form, meds: e.target.value })} />
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={add}>添加事件</Button>
      </div>

      <ScrollArea className="border rounded-md w-full max-h-64">
        {events.length === 0 && (
          <div className="p-4 text-center text-sm text-muted-foreground">暂无疾病/治疗事件，使用上方表单添加。</div>
        )}
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>日期</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>诊断</TableHead>
                <TableHead>用药/处理</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {events.map((e, idx) => (
                <TableRow key={idx}>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>{e.type}</TableCell>
                  <TableCell>{e.diagnosis}</TableCell>
                  <TableCell>{e.meds}</TableCell>
                  <TableCell><Button variant="ghost" size="sm" onClick={() => onRemove(idx)}>删除</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </div>
  )
}
