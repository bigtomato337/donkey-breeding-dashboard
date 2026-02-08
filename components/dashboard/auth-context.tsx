"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export interface AuthUser {
  account: string
}

interface StoredUser {
  account: string
  password: string
}

interface AuthContextValue {
  user: AuthUser | null
  login: (params: { account: string; password: string }) => { ok: true } | { ok: false; message: string }
  register: (params: { account: string; password: string; confirmPassword: string }) =>
    | { ok: true }
    | { ok: false; message: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEYS = {
  users: "auth.users",
  current: "auth.current",
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.users)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users))
}

function readCurrent(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.current)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed.account === "string") return { account: parsed.account }
    return null
  } catch {
    return null
  }
}

function writeCurrent(user: AuthUser | null) {
  if (!user) {
    localStorage.removeItem(STORAGE_KEYS.current)
    return
  }
  localStorage.setItem(STORAGE_KEYS.current, JSON.stringify(user))
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    setUser(readCurrent())
  }, [])

  const value = useMemo<AuthContextValue>(() => {
    return {
      user,
      login: ({ account, password }) => {
        const a = account.trim()
        const p = password
        if (!a || !p) return { ok: false, message: "请输入账号和密码" }

        const users = readUsers()
        const matched = users.find((u) => u.account === a)
        if (!matched) return { ok: false, message: "账号不存在，请先注册" }
        if (matched.password !== p) return { ok: false, message: "密码错误" }

        const next = { account: a }
        setUser(next)
        writeCurrent(next)
        return { ok: true }
      },
      register: ({ account, password, confirmPassword }) => {
        const a = account.trim()
        const p = password
        const cp = confirmPassword

        if (!a || !p) return { ok: false, message: "请输入账号和密码" }
        if (p.length < 6) return { ok: false, message: "密码至少 6 位" }
        if (p !== cp) return { ok: false, message: "两次输入的密码不一致" }

        const users = readUsers()
        if (users.some((u) => u.account === a)) {
          return { ok: false, message: "该账号已注册" }
        }

        const nextUsers = [...users, { account: a, password: p }]
        writeUsers(nextUsers)

        const next = { account: a }
        setUser(next)
        writeCurrent(next)
        return { ok: true }
      },
      logout: () => {
        setUser(null)
        writeCurrent(null)
      },
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
  return ctx
}
