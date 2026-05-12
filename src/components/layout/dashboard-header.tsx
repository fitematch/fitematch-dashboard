'use client'

import { FiLogOut, FiMenu } from 'react-icons/fi'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

type DashboardHeaderProps = {
  onOpenMobileSidebar: () => void
}

export function DashboardHeader({ onOpenMobileSidebar }: DashboardHeaderProps) {
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-slate-950/90 px-4 py-3 backdrop-blur lg:px-6">
      <div className="flex items-center justify-between gap-4">
        <button
          aria-label="Open menu"
          className="rounded-xl p-2 text-slate-300 hover:bg-slate-900 lg:hidden"
          onClick={onOpenMobileSidebar}
          type="button"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div>
          <p className="text-sm font-medium text-slate-100">
            {user?.name ?? 'Admin'}
          </p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>

        <Button onClick={signOut} type="button" variant="secondary">
          <FiLogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </header>
  )
}
