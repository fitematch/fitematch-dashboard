export const STYLES = {
  page: {
    wrapper: 'min-h-screen bg-slate-950 text-slate-50',
    content: 'mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8',
  },
  card: {
    base: 'rounded-2xl border border-slate-800 bg-slate-900/80 shadow-sm',
    padding: 'p-4 sm:p-6',
  },
  form: {
    label: 'text-sm font-medium text-slate-200',
    help: 'text-sm text-slate-400',
    error: 'text-sm text-red-400',
  },
  focus:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
  transition: 'transition duration-200 ease-in-out',
} as const
