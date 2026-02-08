"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Bell, ChevronDown, Settings } from "lucide-react"
import { useNavigation } from "./navigation-context"
import { AddDonkeyModal } from "./add-donkey-modal"
import { AuthDialog } from "./auth-dialog"
import { useAuth } from "./auth-context"

export function DashboardHeader() {
  const { setActivePage } = useNavigation()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      {/* Left: Title */}
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          毛驴育种精细化管理平台
        </h1>
      </div>

      {/* Center: Search */}
      <div className="flex flex-1 items-center justify-center px-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="请输入耳号或品种进行查询..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <Button className="gap-2" onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4" />
          新增种驴档案
        </Button>

        <AddDonkeyModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />

        <Button variant="ghost" size="icon" className="relative" onClick={() => setActivePage("user-admin")}>
          <Settings className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
            3
          </span>
        </Button>

        {!user ? (
          <>
            <AuthDialog defaultTab="login" triggerText="登录" />
            <AuthDialog defaultTab="register" triggerText="注册" />
          </>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.account.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{user.account}</span>
                  <Badge
                    variant="outline"
                    className="text-[10px] px-1 py-0 h-4 bg-primary/10 text-primary border-primary/20"
                  >
                    已登录
                  </Badge>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>个人设置</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setActivePage("user-admin")}>
                系统配置
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={logout}>
                退出登录
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
