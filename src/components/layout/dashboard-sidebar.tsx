'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { DASHBOARD_MENU } from '@/constants/dashboard-menu'
import { cn } from '@/utils/cn'

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden min-h-screen w-72 border-r border-slate-800 bg-slate-950 px-4 py-6 lg:block">
      <Link className="mb-8 block text-2xl font-bold lowercase" href="/dashboard">
        <span className="text-white">fite</span>
        <span className="text-green-400">match</span>
      </Link>

      <nav className="space-y-1">
        {DASHBOARD_MENU.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)

          return (
            <Link
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-900 hover:text-slate-100',
                isActive && 'bg-slate-900 text-green-300',
              )}
              href={item.href}
              key={item.href}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
