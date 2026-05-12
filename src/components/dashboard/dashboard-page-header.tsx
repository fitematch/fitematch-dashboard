type DashboardPageHeaderProps = {
  title: string
  description?: string
}

export function DashboardPageHeader({
  title,
  description,
}: DashboardPageHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-slate-50">{title}</h1>

      {description ? (
        <p className="mt-2 text-sm text-slate-400">{description}</p>
      ) : null}
    </div>
  )
}
