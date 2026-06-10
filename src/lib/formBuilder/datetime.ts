/**
 * Zoned datetime values are stored as: YYYY-MM-DDTHH:mm:ss[IANA/Timezone]
 * Example: 2026-06-08T14:30:00[Asia/Colombo]
 */

const ZONED_DATETIME_PATTERN =
  /^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})(?::(\d{2}))?\[([A-Za-z0-9_+-]+(?:\/[A-Za-z0-9_+-]+)*)\]$/

/** CMS default timezone — must exist in `Intl.supportedValuesOf('timeZone')`. */
export const DEFAULT_TIMEZONE = 'Europe/London'

export const POPULAR_TIMEZONES = [
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'America/New_York',
  'America/Chicago',
  'America/Los_Angeles',
  'Asia/Dubai',
  'Asia/Colombo',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Australia/Sydney',
] as const

const FALLBACK_TIMEZONES = [
  DEFAULT_TIMEZONE,
  ...POPULAR_TIMEZONES.filter((timeZone) => timeZone !== DEFAULT_TIMEZONE),
]

export type ParsedZonedDateTime = {
  date: string
  time: string
  timeZone: string
}

export function getTimezoneOptions(): { label: string; value: string }[] {
  const timeZones =
    typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl
      ? Intl.supportedValuesOf('timeZone')
      : FALLBACK_TIMEZONES

  return timeZones.map((timeZone) => ({
    label: formatTimezoneLabel(timeZone),
    value: timeZone,
  }))
}

export function formatTimezoneLabel(timeZone: string, date = new Date()): string {
  const parts = new Intl.DateTimeFormat('en', {
    timeZone,
    timeZoneName: 'shortOffset',
  }).formatToParts(date)

  const offset = parts.find((part) => part.type === 'timeZoneName')?.value ?? ''
  const name = timeZone.replace(/_/g, ' ')

  return offset ? `${name} (${offset})` : name
}

export function getGroupedTimezoneOptions(): {
  popular: { label: string; value: string }[]
  other: { label: string; value: string }[]
} {
  const popularSet = new Set<string>(POPULAR_TIMEZONES)
  const all = getTimezoneOptions()

  return {
    popular: POPULAR_TIMEZONES.map((timeZone) => ({
      label: formatTimezoneLabel(timeZone),
      value: timeZone,
    })),
    other: all.filter((option) => !popularSet.has(option.value)),
  }
}

export function toCalendarDate(date: string): Date | undefined {
  if (!date) {
    return undefined
  }

  const [year, month, day] = date.split('-').map(Number)

  if (!year || !month || !day) {
    return undefined
  }

  return new Date(year, month - 1, day)
}

export function fromCalendarDate(date: Date | undefined): string {
  if (!date) {
    return ''
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function formatPickerSummary(
  value: ParsedZonedDateTime | null,
  options?: { includeTimezone?: boolean },
): string {
  if (!value?.date) {
    return 'Select date and time'
  }

  const calendarDate = toCalendarDate(value.date)

  if (!calendarDate) {
    return 'Select date and time'
  }

  const dateLabel = new Intl.DateTimeFormat('en', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(calendarDate)

  if (!value.time) {
    return dateLabel
  }

  const [hours, minutes] = value.time.split(':').map(Number)
  const timeDate = new Date(calendarDate)
  timeDate.setHours(hours || 0, minutes || 0, 0, 0)

  const timeLabel = new Intl.DateTimeFormat('en', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(timeDate)

  if (options?.includeTimezone === false) {
    return `${dateLabel} at ${timeLabel}`
  }

  return `${dateLabel} at ${timeLabel} · ${formatTimezoneLabel(value.timeZone, timeDate)}`
}

export function buildZonedDateTimeValue(date: string, time: string, timeZone: string): string {
  if (!date || !time || !timeZone) {
    return ''
  }

  return `${date}T${time}:00[${timeZone}]`
}

export function parseZonedDateTimeValue(value?: string | null): ParsedZonedDateTime | null {
  if (!value?.trim()) {
    return null
  }

  const match = ZONED_DATETIME_PATTERN.exec(value.trim())

  if (!match) {
    return null
  }

  const [, date, time, , timeZone] = match

  return {
    date,
    time,
    timeZone,
  }
}

export function validateZonedDateTimeValue(value?: string | null): true | string {
  if (!value?.trim()) {
    return 'Please select a date, time, and timezone.'
  }

  if (!parseZonedDateTimeValue(value)) {
    return 'Please enter a valid date, time, and timezone.'
  }

  return true
}

export function formatZonedDateTimeForDisplay(value?: string | null): string {
  const parsed = parseZonedDateTimeValue(value)

  if (!parsed) {
    return value || ''
  }

  return `${parsed.date} ${parsed.time} (${parsed.timeZone.replace(/_/g, ' ')})`
}
