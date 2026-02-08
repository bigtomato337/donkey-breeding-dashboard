"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import {
  buildPedigreeIndex,
  checkKinshipWithinDepth,
  donkeyPedigreeRecords,
  getDescendantsUpToDepth,
  type DonkeyPedigreeRecord,
} from "@/lib/data/pedigree"

function formatDonkeyLabel(record: DonkeyPedigreeRecord | undefined) {
  if (!record) return "未知"
  return record.id
}

function PedigreeNode({ record }: { record: DonkeyPedigreeRecord | undefined }) {
  return (
    <div className="rounded-md border border-border bg-card p-2">
      <div className="truncate text-sm font-medium">{record?.id ?? "未知"}</div>
    </div>
  )
}

function AncestorsChart({ targetId }: { targetId: string }) {
  const { byId } = useMemo(() => buildPedigreeIndex(donkeyPedigreeRecords), [])
  const target = byId.get(targetId)

  // 四代列：0=本体，1=父母，2=祖父母，3=曾祖父母
  const maxDepth = 3
  const rows = 2 ** maxDepth // 8

  const cells = useMemo(() => {
    type Cell = {
      key: string
      generation: number
      index: number
      rowStart: number
      rowSpan: number
      donkeyId?: string
    }

    const result: Cell[] = []

    const getIdAt = (generation: number, index: number): string | undefined => {
      if (generation === 0) return targetId

      // 沿着二叉树走：index 的二进制表示路径（0=父系，1=母系）
      let currentId: string | undefined = targetId
      for (let g = 1; g <= generation; g++) {
        const bit = (index >> (generation - g)) & 1
        const current = currentId ? byId.get(currentId) : undefined
        currentId = bit === 0 ? current?.fatherId : current?.motherId
        if (!currentId) return undefined
      }
      return currentId
    }

    for (let gen = 0; gen <= maxDepth; gen++) {
      const count = 2 ** gen
      const rowSpan = 2 ** (maxDepth - gen)
      for (let i = 0; i < count; i++) {
        result.push({
          key: `g${gen}-i${i}`,
          generation: gen,
          index: i,
          rowStart: i * rowSpan + 1,
          rowSpan,
          donkeyId: getIdAt(gen, i),
        })
      }
    }

    return result
  }, [byId, targetId])

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-medium">上三代血统（共4列）</div>
          <div className="text-xs text-muted-foreground">缺失血缘信息会显示为“未知/暂无记录”</div>
        </div>
        <div className="text-xs text-muted-foreground truncate">当前：{formatDonkeyLabel(target)}</div>
      </div>

      <div className="relative overflow-x-auto">
        <div
          className="grid gap-3"
          style={{
            gridTemplateColumns: "repeat(4, minmax(220px, 1fr))",
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
            minHeight: 420,
          }}
        >
          {cells.map((cell) => {
            const record = cell.donkeyId ? byId.get(cell.donkeyId) : undefined
            return (
              <div
                key={cell.key}
                className="flex items-center"
                style={{
                  gridColumnStart: cell.generation + 1,
                  gridRow: `${cell.rowStart} / span ${cell.rowSpan}`,
                }}
              >
                <PedigreeNode record={record} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function DescendantsTree({ targetId }: { targetId: string }) {
  const { byId, childrenByParent } = useMemo(() => buildPedigreeIndex(donkeyPedigreeRecords), [])
  const target = byId.get(targetId)

  const maxDepth = 3
  const descendants = useMemo(
    () => getDescendantsUpToDepth({ startId: targetId, childrenByParent, maxDepth }),
    [childrenByParent, targetId]
  )

  const grouped = useMemo(() => {
    const map = new Map<number, string[]>()
    for (const hit of descendants) {
      const arr = map.get(hit.depth) ?? []
      arr.push(hit.descendantId)
      map.set(hit.depth, arr)
    }
    return map
  }, [descendants])

  return (
    <div className="rounded-lg border border-border p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-sm font-medium">下三代血统（后代树）</div>
          <div className="text-xs text-muted-foreground">基于已录入父母字段反推子代关系</div>
        </div>
        <div className="text-xs text-muted-foreground truncate">当前：{formatDonkeyLabel(target)}</div>
      </div>

      <div className="space-y-3">
        {[1, 2, 3].map((depth) => (
          <div key={depth} className="rounded-md border border-border p-3">
            <div className="text-sm font-medium">{depth === 1 ? "子代" : depth === 2 ? "孙代" : "曾孙代"}</div>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {(grouped.get(depth) ?? []).length === 0 ? (
                <div className="text-sm text-muted-foreground">暂无记录</div>
              ) : (
                (grouped.get(depth) ?? []).map((id) => (
                  <PedigreeNode key={id} record={byId.get(id)} />
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function KinshipChecker({ defaultA, defaultB }: { defaultA: string; defaultB: string }) {
  const { byId } = useMemo(() => buildPedigreeIndex(donkeyPedigreeRecords), [])
  const [aId, setAId] = useState(defaultA)
  const [bId, setBId] = useState(defaultB)

  const result = useMemo(() => {
    return checkKinshipWithinDepth({ aId, bId, byId, maxDepth: 3 })
  }, [aId, bId, byId])

  const a = byId.get(aId)
  const b = byId.get(bId)

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <div className="text-sm font-medium">查询对象 A</div>
          <Select value={aId} onValueChange={setAId}>
            <SelectTrigger>
              <SelectValue placeholder="选择驴只" />
            </SelectTrigger>
            <SelectContent>
              {donkeyPedigreeRecords
                .slice()
                .sort((x, y) => x.id.localeCompare(y.id))
                .map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.id}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">查询对象 B</div>
          <Select value={bId} onValueChange={setBId}>
            <SelectTrigger>
              <SelectValue placeholder="选择驴只" />
            </SelectTrigger>
            <SelectContent>
              {donkeyPedigreeRecords
                .slice()
                .sort((x, y) => x.id.localeCompare(y.id))
                .map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.id}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Alert variant={result.related ? "default" : "destructive"}>
        <AlertTitle>{result.related ? "存在三代内血缘关系" : "未发现三代内血缘关系"}</AlertTitle>
        <AlertDescription className="space-y-2">
          <div className="text-sm text-muted-foreground">
            基于已录入血缘信息判断（父母→祖父母→曾祖父母）。数据不完整时，可能出现“实际有关但记录中未体现”。
          </div>
          <div className="text-sm">
            A：{formatDonkeyLabel(a)}
            <br />
            B：{formatDonkeyLabel(b)}
          </div>
          {result.related ? (
            <div className="text-sm">
              <div className="font-medium">共同祖先（按接近程度排序）</div>
              <div className="mt-2 space-y-1">
                {result.commonAncestors.slice(0, 8).map((x) => (
                  <div key={x.id} className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{x.id}</span>
                    <span className="text-muted-foreground">
                      A 距离：{x.depthA} 代；B 距离：{x.depthB} 代
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function ProductionBenefitsKinshipView() {
  const allIds = useMemo(
    () => donkeyPedigreeRecords.map((r) => r.id).slice().sort((a, b) => a.localeCompare(b)),
    []
  )

  const [selectedId, setSelectedId] = useState(allIds[0] ?? "")

  if (!selectedId) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">血缘关系</h2>
          <p className="text-muted-foreground">暂无驴只数据</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">血缘关系</h2>
        <p className="text-sm text-muted-foreground">查询单驴上下三代血统，并判断两驴三代内是否存在共同祖先</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">单驴血统查询</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium">选择驴只</div>
              <Select value={selectedId} onValueChange={setSelectedId}>
                <SelectTrigger>
                  <SelectValue placeholder="选择驴只" />
                </SelectTrigger>
                <SelectContent>
                  {allIds.map((id) => (
                    <SelectItem key={id} value={id}>
                      {id}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="ancestors" className="w-full">
            <TabsList>
              <TabsTrigger value="ancestors">上三代（祖先）</TabsTrigger>
              <TabsTrigger value="descendants">下三代（后代）</TabsTrigger>
            </TabsList>
            <TabsContent value="ancestors" className="mt-4">
              <AncestorsChart targetId={selectedId} />
            </TabsContent>
            <TabsContent value="descendants" className="mt-4">
              <DescendantsTree targetId={selectedId} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">两驴三代内血缘关系查询</CardTitle>
        </CardHeader>
        <CardContent>
          <KinshipChecker defaultA={allIds[0]} defaultB={allIds[1] ?? allIds[0]} />
        </CardContent>
      </Card>
    </div>
  )
}
