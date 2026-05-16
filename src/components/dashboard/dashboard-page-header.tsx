import type { ElementType, ReactNode } from 'react'

type DashboardPageHeaderProps = {
  title: string
  description?: string
  icon?: ElementType
  actions?: ReactNode
}

export function DashboardPageHeader({
  title,
  description,
  icon: Icon,
  actions,
}: DashboardPageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold uppercase tracking-wide text-slate-50">
          {Icon ? <Icon className="h-7 w-7 shrink-0 text-slate-300" /> : null}
          <span>{title}</span>
        </h1>

        {description ? (
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        ) : null}
      </div>

      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  )
}
