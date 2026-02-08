import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Baby, Milk, AlertTriangle, TrendingUp } from "lucide-react"

const metrics = [
  {
    title: "存栏总数",
    value: "1,240",
    unit: "头",
    change: "较上月 +5%",
    changeType: "positive" as const,
    icon: Users,
  },
  {
    title: "本月产驹",
    value: "32",
    unit: "头",
    change: null,
    icon: Baby,
  },
  {
    title: "平均泌乳量",
    value: "2.4",
    unit: "kg/日",
    change: null,
    icon: Milk,
  },
  {
    title: "健康预警",
    value: "3",
    unit: "条",
    change: null,
    icon: AlertTriangle,
    isAlert: true,
  },
]

export function MetricsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.title} className="relative overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  {metric.title}
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {metric.unit}
                  </span>
                </div>
                {metric.change && (
                  <div className="mt-1 flex items-center gap-1 text-xs text-primary">
                    <TrendingUp className="h-3 w-3" />
                    {metric.change}
                  </div>
                )}
              </div>
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                  metric.isAlert
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <metric.icon className="h-6 w-6" />
              </div>
            </div>
            {metric.isAlert && (
              <Badge
                variant="destructive"
                className="absolute right-3 top-3"
              >
                需关注
              </Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
