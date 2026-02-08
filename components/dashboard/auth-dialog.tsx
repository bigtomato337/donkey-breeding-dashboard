"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "./auth-context"

type AuthTab = "login" | "register"

export function AuthDialog({ defaultTab, triggerText }: { defaultTab: AuthTab; triggerText: string }) {
  const { login, register } = useAuth()

  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState<AuthTab>(defaultTab)

  const [account, setAccount] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setTab(defaultTab)
  }, [defaultTab, open])

  const title = useMemo(() => (tab === "login" ? "登录" : "注册"), [tab])

  const resetForm = () => {
    setAccount("")
    setPassword("")
    setConfirmPassword("")
    setError(null)
  }

  const handleSubmit = () => {
    setError(null)

    if (tab === "login") {
      const result = login({ account, password })
      if (!result.ok) {
        setError(result.message)
        return
      }
      setOpen(false)
      resetForm()
      return
    }

    const result = register({ account, password, confirmPassword })
    if (!result.ok) {
      setError(result.message)
      return
    }

    setOpen(false)
    resetForm()
  }

  return (
    <Dialog open={open} onOpenChange={(v) => {
      setOpen(v)
      if (!v) resetForm()
    }}>
      <DialogTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <Tabs value={tab} onValueChange={(v) => {
          setTab(v as AuthTab)
          setError(null)
        }} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="register">注册</TabsTrigger>
          </TabsList>

          <div className="mt-4 space-y-4">
            {error ? (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}

            <div className="space-y-2">
              <Label htmlFor="account">账号</Label>
              <Input
                id="account"
                placeholder="手机号 / 邮箱 / 工号"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <TabsContent value="register" className="m-0">
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">确认密码</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="再次输入密码"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </TabsContent>

            <div className="pt-2">
              <Button className="w-full" onClick={handleSubmit}>
                {tab === "login" ? "登录" : "注册"}
              </Button>
            </div>
          </div>

          <TabsContent value="login" />
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
