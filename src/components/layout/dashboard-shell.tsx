'use client'

import { useState, type ReactNode } from 'react'

import { AdminRoute } from '@/components/auth/admin-route'
import { PrivateRoute } from '@/components/auth/private-route'

import { DashboardContent } from './dashboard-content'
import { DashboardHeader } from './dashboard-header'
import { DashboardSidebar } from './dashboard-sidebar'
import { MobileSidebar } from './mobile-sidebar'

type DashboardShellProps = {
  children: ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)

  return (
    <PrivateRoute>
      <AdminRoute>
        <div className="flex min-h-screen bg-slate-950">
          <DashboardSidebar />

          <div className="flex min-w-0 flex-1 flex-col">
            <DashboardHeader
              onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            />

            <DashboardContent>{children}</DashboardContent>
          </div>

          <MobileSidebar
            isOpen={isMobileSidebarOpen}
            onClose={() => setIsMobileSidebarOpen(false)}
          />
        </div>
      </AdminRoute>
    </PrivateRoute>
  )
}
