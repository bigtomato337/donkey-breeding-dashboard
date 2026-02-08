"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface Entry {
  date: string
  weight: number
}

interface Props {
  entries: Entry[]
  onAdd: (e: Entry) => void
  onRemove: (index: number) => void
}

export function GrowthRecords({ entries, onAdd, onRemove }: Props) {
  const [form, setForm] = useState({ date: "", weight: "" })
  const { toast } = useToast()
  const [fieldError, setFieldError] = useState<{ date?: string; weight?: string }>({})
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
      setFieldError({ date: "记录日期为必填项" })
      toast({ title: "验证失败", description: "请填写记录日期" })
      return
    }
    if (!isValidISODate(form.date)) {
      setFieldError({ date: "日期格式应为 YYYY-MM-DD" })
      toast({ title: "验证失败", description: "日期格式错误" })
      return
    }
    const w = Number(form.weight)
    if (!form.weight || isNaN(w) || w <= 0) {
      setFieldError({ weight: "请输入有效体重" })
      toast({ title: "验证失败", description: "请输入有效体重" })
      return
    }
    onAdd({ date: form.date, weight: w })
    setForm({ date: "", weight: "" })
  }

  const chartData = entries.map((e) => ({ date: e.date, weight: e.weight }))

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>记录日期</Label>
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
          <Label>体重(kg)</Label>
          <Input value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} />
          {fieldError.weight && <p className="text-xs text-red-600 mt-1">{fieldError.weight}</p>}
        </div>
        <div className="flex items-end">
          <Button onClick={add}>添加</Button>
        </div>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <ScrollArea className="border rounded-md w-full max-h-64">
        <div className="w-full">
          {entries.length === 0 && (
            <div className="p-4 text-center text-sm text-muted-foreground">暂无体重记录，添加后将显示在图表和表格中。</div>
          )}
          <table className="w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground sticky top-0 bg-background">
            <tr>
              <th className="py-2 px-4">日期</th>
              <th className="py-2 px-4">体重(kg)</th>
              <th className="py-2 px-4">操作</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-4">{e.date}</td>
                <td className="py-2 px-4">{e.weight}</td>
                <td className="py-2 px-4"><Button variant="ghost" size="sm" onClick={() => onRemove(i)}>删除</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </ScrollArea>
    </div>
  )
}
