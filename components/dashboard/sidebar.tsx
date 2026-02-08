"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useNavigation, type PageId } from "./navigation-context"
import {
  LayoutDashboard,
  Database,
  TrendingUp,
  ShieldCheck,
  GitBranch,
  GraduationCap,
  FileText,
  UserCog,
  ClipboardList,
  Settings,
  ChevronDown,
} from "lucide-react"

const mainNavItems: { id: PageId; title: string; icon: typeof LayoutDashboard; subtext: string | null }[] = [
  {
    id: "dashboard",
    title: "工作台",
    icon: LayoutDashboard,
    subtext: null,
  },
  {
    id: "herd-registry",
    title: "种驴档案",
    icon: Database,
    subtext: "品种、血缘、基础信息",
  },
  {
    id: "production",
    title: "生产性能",
    icon: TrendingUp,
    subtext: "配种、产驹、奶量记录",
  },
  {
    id: "disease",
    title: "疫病防治",
    icon: ShieldCheck,
    subtext: null,
  },
  {
    id: "production-benefits",
    title: "生产效益",
    icon: TrendingUp,
    subtext: "成本、收入、收益分析",
  },
  {
    id: "kinship",
    title: "血缘关系",
    icon: GitBranch,
    subtext: "上下三代、三代内关系查询",
  },
  {
    id: "tech-training",
    title: "科技培训",
    icon: GraduationCap,
    subtext: "培训视频、人员学习情况",
  },
  {
    id: "archives",
    title: "档案管理",
    icon: FileText,
    subtext: "电子档案、定期抽查",
  },
]

const adminNavItems: { id: PageId; title: string; icon: typeof LayoutDashboard }[] = [
  {
    id: "user-admin",
    title: "用户权限管理",
    icon: UserCog,
  },
  {
    id: "operation-logs",
    title: "数据操作日志",
    icon: ClipboardList,
  },
]

export function DashboardSidebar() {
  const { activePage, setActivePage } = useNavigation()
  const [isHerdRegistryExpanded, setIsHerdRegistryExpanded] = useState(
    activePage === "herd-registry-overview" || activePage === "herd-registry-basic" || activePage === "herd-registry-pedigree"
  )
  const [isProductionExpanded, setIsProductionExpanded] = useState(
    activePage === "production-overview" || activePage === "production-breeding" || activePage === "production-milk"
  )
  const [isProductionBenefitsExpanded, setIsProductionBenefitsExpanded] = useState(
    activePage === "production-benefits-overview" || activePage === "production-benefits-cost" || activePage === "production-benefits-income"
  )
  const [isDiseaseExpanded, setIsDiseaseExpanded] = useState(
    activePage === "disease-overview" || activePage === "disease-test-records" || activePage === "disease-vaccination" || activePage === "disease-quarantine"
  )

  useEffect(() => {
    if (activePage === "herd-registry-overview" || activePage === "herd-registry-basic" || activePage === "herd-registry-pedigree") {
      setIsHerdRegistryExpanded(true)
    }
  }, [activePage])

  useEffect(() => {
    if (activePage === "production-overview" || activePage === "production-breeding" || activePage === "production-milk") {
      setIsProductionExpanded(true)
    }
  }, [activePage])

  useEffect(() => {
    if (activePage === "production-benefits-overview" || activePage === "production-benefits-cost" || activePage === "production-benefits-income") {
      setIsProductionBenefitsExpanded(true)
    }
  }, [activePage])

  useEffect(() => {
    if (activePage === "disease-overview" || activePage === "disease-test-records" || activePage === "disease-vaccination" || activePage === "disease-quarantine") {
      setIsDiseaseExpanded(true)
    }
  }, [activePage])

  const handleHerdRegistryClick = () => {
    setIsHerdRegistryExpanded(!isHerdRegistryExpanded)
  }

  const handleProductionClick = () => {
    setIsProductionExpanded(!isProductionExpanded)
  }

  const handleProductionBenefitsClick = () => {
    setIsProductionBenefitsExpanded(!isProductionBenefitsExpanded)
  }

  const handleDiseaseClick = () => {
    setIsDiseaseExpanded(!isDiseaseExpanded)
  }

  const handleSubMenuClick = (pageId: PageId) => {
    setActivePage(pageId)
    
    // 根据 pageId 设置对应菜单的展开状态，关闭其他菜单
    if (pageId.startsWith("herd-registry")) {
      setIsHerdRegistryExpanded(true)
      setIsProductionExpanded(false)
      setIsProductionBenefitsExpanded(false)
      setIsDiseaseExpanded(false)
    } else if (pageId.startsWith("production-benefits")) {
      setIsHerdRegistryExpanded(false)
      setIsProductionExpanded(false)
      setIsProductionBenefitsExpanded(true)
      setIsDiseaseExpanded(false)
    } else if (pageId.startsWith("production")) {
      setIsHerdRegistryExpanded(false)
      setIsProductionExpanded(true)
      setIsProductionBenefitsExpanded(false)
      setIsDiseaseExpanded(false)
    } else if (pageId.startsWith("disease")) {
      setIsHerdRegistryExpanded(false)
      setIsProductionExpanded(false)
      setIsProductionBenefitsExpanded(false)
      setIsDiseaseExpanded(true)
    }
  }

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar text-sidebar-foreground">
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sidebar-primary">
            <Database className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">毛驴育种</span>
            <span className="text-xs text-sidebar-foreground/70">管理系统</span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {mainNavItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.id === "herd-registry") {
                    handleHerdRegistryClick()
                  } else if (item.id === "production") {
                    handleProductionClick()
                  } else if (item.id === "production-benefits") {
                    handleProductionBenefitsClick()
                  } else if (item.id === "disease") {
                    handleDiseaseClick()
                  } else {
                    setActivePage(item.id)
                  }
                }}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors",
                  activePage === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="mt-0.5 h-5 w-5 shrink-0" />
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-medium">{item.title}</span>
                  {item.subtext && item.id !== "herd-registry" && item.id !== "production" && item.id !== "production-benefits" && (
                    <span className="text-xs text-sidebar-foreground/60">
                      {item.subtext}
                    </span>
                  )}
                </div>
                {item.id === "herd-registry" && (
                  <ChevronDown
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 transition-transform",
                      isHerdRegistryExpanded ? "rotate-180" : ""
                    )}
                  />
                )}
                {item.id === "production" && (
                  <ChevronDown
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 transition-transform",
                      isProductionExpanded ? "rotate-180" : ""
                    )}
                  />
                )}
                {item.id === "production-benefits" && (
                  <ChevronDown
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 transition-transform",
                      isProductionBenefitsExpanded ? "rotate-180" : ""
                    )}
                  />
                )}
                {item.id === "disease" && (
                  <ChevronDown
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 transition-transform",
                      isDiseaseExpanded ? "rotate-180" : ""
                    )}
                  />
                )}
              </button>

              {/* Herd Registry Submenu */}
              {item.id === "herd-registry" && isHerdRegistryExpanded && (
                <div className="mt-2 space-y-1 pl-4">
                  <button
                    onClick={() => handleSubMenuClick("herd-registry-overview")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "herd-registry-overview"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    概览
                  </button>
                  <button
                    onClick={() => handleSubMenuClick("herd-registry-basic")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "herd-registry-basic"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    基础信息
                  </button>
                  <button
                    onClick={() => handleSubMenuClick("herd-registry-pedigree")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "herd-registry-pedigree"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    品种血缘
                  </button>
                </div>
              )}

              {/* Production Submenu */}
              {item.id === "production" && isProductionExpanded && (
                <div className="mt-2 space-y-1 pl-4">
                  <button
                    onClick={() => handleSubMenuClick("production-overview")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "production-overview"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    概览
                  </button>
                  <button
                    onClick={() => handleSubMenuClick("production-breeding")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "production-breeding"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    配种产驹
                  </button>
                  <button
                    onClick={() => handleSubMenuClick("production-milk")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "production-milk"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    奶量记录
                  </button>
                </div>
              )}

              {/* Production Benefits Submenu */}
              {item.id === "production-benefits" && isProductionBenefitsExpanded && (
                <div className="mt-2 space-y-1 pl-4">
                  <button
                    onClick={() => handleSubMenuClick("production-benefits-overview")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "production-benefits-overview"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    概览
                  </button>
                  <button
                    onClick={() => handleSubMenuClick("production-benefits-cost")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "production-benefits-cost"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    成本管理
                  </button>
                  <button
                    onClick={() => handleSubMenuClick("production-benefits-income")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "production-benefits-income"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    收入管理
                  </button>
                  {/* 对标分析 已移除 */}
                </div>
              )}

              {/* Disease Submenu */}
              {item.id === "disease" && isDiseaseExpanded && (
                <div className="mt-2 space-y-1 pl-4">
                  <button
                    onClick={() => handleSubMenuClick("disease-overview")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "disease-overview"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    概览
                  </button>
                  <button
                    onClick={() => handleSubMenuClick("disease-test-records")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "disease-test-records"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    检测记录
                  </button>
                  <button
                    onClick={() => handleSubMenuClick("disease-vaccination")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "disease-vaccination"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    疫苗管理
                  </button>
                  <button
                    onClick={() => handleSubMenuClick("disease-quarantine")}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      activePage === "disease-quarantine"
                        ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/30 hover:text-sidebar-foreground"
                    )}
                  >
                    <div className="h-2 w-2 rounded-full bg-current" />
                    隔离管理
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* System Admin Section */}
          <div className="pt-4">
            <div className="flex items-center gap-2 px-3 py-2">
              <Settings className="h-4 w-4 text-sidebar-foreground/50" />
              <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                系统管理
              </span>
            </div>
            {adminNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                  activePage === item.id
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent/50"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <div className="text-xs text-sidebar-foreground/50">
            © 2024 毛驴育种管理系统
          </div>
        </div>
      </div>
    </aside>
  )
}
