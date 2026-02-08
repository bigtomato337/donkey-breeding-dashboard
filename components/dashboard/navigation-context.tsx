"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type PageId = 
  | "dashboard" 
  | "herd-registry"
  | "herd-registry-overview"
  | "herd-registry-basic"
  | "herd-registry-pedigree"
  | "production"
  | "production-overview"
  | "production-breeding"
  | "production-milk"
  | "production-benefits"
  | "production-benefits-overview"
  | "production-benefits-cost"
  | "production-benefits-income"
  | "disease"
  | "disease-overview"
  | "disease-test-records"
  | "disease-vaccination"
  | "disease-quarantine"
  | "archives"
  | "user-admin"
  | "operation-logs"

interface NavigationContextType {
  activePage: PageId
  setActivePage: (page: PageId) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageId>("dashboard")

  return (
    <NavigationContext.Provider value={{ activePage, setActivePage }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
