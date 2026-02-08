"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricsCards } from "./metrics-cards"
import { DonkeyTable } from "./donkey-table"
import { DiseaseRecords } from "./disease-records"
import { Activity, Stethoscope } from "lucide-react"
import { useNavigation } from "./navigation-context"
import { HerdRegistryView } from "./views/herd-registry"
import { UserAdminView } from "./views/user-admin"
import { OperationLogsView } from "./views/operation-logs"
import { ProductionView } from "./views/production-view"
import { ProductionBenefitsView } from "./views/production-benefits-view"
import { ProductionBenefitsCostView } from "./views/production-benefits-cost"
import { ProductionBenefitsIncomeView } from "./views/production-benefits-income"
import { DiseaseControlView } from "./views/disease-control-view"
import { ArchiveManagementView } from "./views/archive-management-view"

// Dashboard View (Default)
function DashboardView() {
  return (
    <div className="space-y-6 p-6">
      {/* Metrics Cards */}
      <MetricsCards />

      {/* Tabs Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">数据管理中心</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="realtime" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="realtime" className="gap-2">
                <Activity className="h-4 w-4" />
                实时录入与监控
              </TabsTrigger>
              <TabsTrigger value="disease" className="gap-2">
                <Stethoscope className="h-4 w-4" />
                疫病检测记录
              </TabsTrigger>
            </TabsList>

            <TabsContent value="realtime" className="mt-0">
              <DonkeyTable />
            </TabsContent>

            <TabsContent value="disease" className="mt-0">
              <DiseaseRecords />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

// Placeholder views for unimplemented pages
function PlaceholderView({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-6">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

export function MainContent() {
  const { activePage } = useNavigation()

  switch (activePage) {
    case "dashboard":
      return <DashboardView />
    case "herd-registry":
    case "herd-registry-overview":
    case "herd-registry-basic":
    case "herd-registry-pedigree":
      return <HerdRegistryView />
    case "production":
    case "production-overview":
    case "production-breeding":
    case "production-milk":
      return <ProductionView />
    case "production-benefits":
    case "production-benefits-overview":
      return <ProductionBenefitsView />
    case "production-benefits-cost":
      return <ProductionBenefitsCostView />
    case "production-benefits-income":
      return <ProductionBenefitsIncomeView />
    case "disease":
    case "disease-overview":
    case "disease-test-records":
    case "disease-vaccination":
    case "disease-quarantine":
      return <DiseaseControlView />
    case "archives":
      return <ArchiveManagementView />
    case "user-admin":
      return <UserAdminView />
    case "operation-logs":
      return <OperationLogsView />
    default:
      return <DashboardView />
  }
}
