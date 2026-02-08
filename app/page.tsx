"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { MainContent } from "@/components/dashboard/main-content"
import { NavigationProvider } from "@/components/dashboard/navigation-context"
import { AuthProvider } from "@/components/dashboard/auth-context"

export default function Page() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <div className="min-h-screen bg-background">
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main Area */}
          <div className="ml-64">
            {/* Header */}
            <DashboardHeader />

            {/* Content */}
            <main>
              <MainContent />
            </main>
          </div>
        </div>
      </NavigationProvider>
    </AuthProvider>
  )
}
