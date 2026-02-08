import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"

const diseaseRecords = [
  {
    testItem: "布病检测",
    result: "阴性",
    isNegative: true,
    tester: "张兽医",
    date: "2024-01-15",
  },
  {
    testItem: "马传染性贫血检测",
    result: "阴性",
    isNegative: true,
    tester: "李兽医",
    date: "2024-01-14",
  },
  {
    testItem: "口蹄疫抗体检测",
    result: "阳性",
    isNegative: false,
    tester: "张兽医",
    date: "2024-01-13",
  },
  {
    testItem: "结核病检测",
    result: "阴性",
    isNegative: true,
    tester: "王兽医",
    date: "2024-01-12",
  },
  {
    testItem: "寄生虫检测",
    result: "阴性",
    isNegative: true,
    tester: "李兽医",
    date: "2024-01-10",
  },
]

export function DiseaseRecords() {
  return (
    <div className="space-y-3">
      {diseaseRecords.map((record, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted/30"
        >
          <div className="flex items-center gap-4">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full ${
                record.isNegative
                  ? "bg-primary/10 text-primary"
                  : "bg-destructive/10 text-destructive"
              }`}
            >
              {record.isNegative ? (
                <CheckCircle2 className="h-5 w-5" />
              ) : (
                <XCircle className="h-5 w-5" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-foreground">
                {record.testItem}
              </span>
              <span className="text-sm text-muted-foreground">
                检测人: {record.tester}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge
              variant={record.isNegative ? "outline" : "destructive"}
              className={
                record.isNegative
                  ? "bg-primary/10 text-primary border-primary/20"
                  : ""
              }
            >
              {record.result}
            </Badge>
            <span className="text-sm text-muted-foreground">{record.date}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
