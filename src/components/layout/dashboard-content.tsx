import type { ReactNode } from 'react'

type DashboardContentProps = {
  children: ReactNode
}

export function DashboardContent({ children }: DashboardContentProps) {
  return (
    <main className="flex-1 bg-slate-950 px-4 py-6 text-slate-50 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </main>
  )
}
