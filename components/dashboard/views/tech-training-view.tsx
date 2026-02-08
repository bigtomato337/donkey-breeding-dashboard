"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { trainingStaffLearning, trainingVideos } from "@/lib/data/tech-training"

export function TechTrainingView() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">科技培训</h2>
        <p className="text-sm text-muted-foreground">展示培训视频与培训人员学习情况</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">培训视频</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {trainingVideos.map((video) => (
              <div key={video.id} className="rounded-lg border border-border overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover"
                    priority={false}
                  />
                </AspectRatio>
                <div className="p-4 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-foreground">{video.title}</div>
                      <div className="mt-1 text-xs text-muted-foreground">专家：{video.expertName}</div>
                      <div className="text-xs text-muted-foreground truncate">单位：{video.organization}</div>
                    </div>
                    <Badge variant="outline" className="shrink-0">
                      学习人数 {video.learnerCount}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span>视频编号：{video.id}</span>
                    <span>发布：{video.publishedAt}</span>
                  </div>

                  {video.videoUrl ? (
                    <div className="pt-2">
                      <video className="w-full rounded-md" controls src={video.videoUrl} />
                    </div>
                  ) : (
                    <div className="pt-2 text-xs text-muted-foreground">暂无视频文件（可后续对接真实视频地址）</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">培训人员学习情况</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="font-semibold">姓名</TableHead>
                  <TableHead className="font-semibold">岗位</TableHead>
                  <TableHead className="font-semibold">单位/小组</TableHead>
                  <TableHead className="font-semibold">已学习</TableHead>
                  <TableHead className="font-semibold">已完成</TableHead>
                  <TableHead className="font-semibold">最近学习</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingStaffLearning.map((s) => (
                  <TableRow key={s.id} className="hover:bg-muted/30">
                    <TableCell className="font-medium">{s.name}</TableCell>
                    <TableCell>{s.role}</TableCell>
                    <TableCell>{s.organization}</TableCell>
                    <TableCell>{s.learnedCount}</TableCell>
                    <TableCell>{s.completedCount}</TableCell>
                    <TableCell>{s.lastLearningAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
