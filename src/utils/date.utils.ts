import { format, isValid, parseISO } from 'date-fns'

export function formatDate(value?: string | null) {
  if (!value) {
    return '-'
  }

  const date = parseISO(value)

  if (!isValid(date)) {
    return '-'
  }

  return format(date, 'dd/MM/yyyy')
}
