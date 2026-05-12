export type DashboardSummaryItem = {
  total: number
  lastWeek: number
}

export type DashboardSummaryResponse = {
  users: DashboardSummaryItem
  companies: DashboardSummaryItem
  jobs: DashboardSummaryItem
  applications: DashboardSummaryItem
}
