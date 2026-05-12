import { differenceInYears, isValid, parseISO } from 'date-fns'

export function getAgeFromDate(value?: string | null) {
  if (!value) {
    return null
  }

  const date = parseISO(value)

  if (!isValid(date)) {
    return null
  }

  return differenceInYears(new Date(), date)
}
