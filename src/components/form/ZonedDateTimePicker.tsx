'use client'

import { CalendarIcon, Clock3 } from 'lucide-react'
import React, { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  formatPickerSummary,
  formatTimezoneLabel,
  fromCalendarDate,
  getGroupedTimezoneOptions,
  POPULAR_TIMEZONES,
  type ParsedZonedDateTime,
  toCalendarDate,
} from '@/lib/formBuilder/datetime'
import { cn } from '@/utilities/ui'

const HOURS = Array.from({ length: 24 }, (_, index) => String(index).padStart(2, '0'))
const MINUTES = Array.from({ length: 12 }, (_, index) => String(index * 5).padStart(2, '0'))

const fieldSelectClassName =
  'border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/10'

type ZonedDateTimePickerProps = {
  id?: string
  value: ParsedZonedDateTime
  onChange: (value: ParsedZonedDateTime) => void
  includeTimezoneSelect?: boolean
  required?: boolean
}

export const ZonedDateTimePicker: React.FC<ZonedDateTimePickerProps> = ({
  id,
  value,
  onChange,
  includeTimezoneSelect = true,
  required,
}) => {
  const [open, setOpen] = useState(false)
  const [timezoneQuery, setTimezoneQuery] = useState('')

  const groupedTimezones = useMemo(() => getGroupedTimezoneOptions(), [])

  const filteredTimezones = useMemo(() => {
    const query = timezoneQuery.trim().toLowerCase()

    if (!query) {
      return null
    }

    return [...groupedTimezones.popular, ...groupedTimezones.other].filter(
      (option) =>
        option.label.toLowerCase().includes(query) || option.value.toLowerCase().includes(query),
    )
  }, [groupedTimezones, timezoneQuery])

  const visibleTimezones = useMemo(() => {
    if (filteredTimezones) {
      return filteredTimezones
    }

    const popular = [...groupedTimezones.popular]

    if (
      value.timeZone &&
      !(POPULAR_TIMEZONES as readonly string[]).includes(value.timeZone) &&
      !popular.some((option) => option.value === value.timeZone)
    ) {
      popular.push({
        label: formatTimezoneLabel(value.timeZone),
        value: value.timeZone,
      })
    }

    return popular
  }, [filteredTimezones, groupedTimezones.popular, value.timeZone])

  const minuteValue = value.time.split(':')[1] || '00'
  const minuteOptions = useMemo(() => {
    if (MINUTES.includes(minuteValue)) {
      return MINUTES
    }

    return [...MINUTES, minuteValue].sort()
  }, [minuteValue])

  const selectedDate = toCalendarDate(value.date)
  const summary = formatPickerSummary(value, { includeTimezone: includeTimezoneSelect })

  const updateValue = (next: Partial<ParsedZonedDateTime>) => {
    onChange({ ...value, ...next })
  }

  return (
    <div className="relative" id={id}>
      <button
        aria-expanded={open}
        aria-required={required}
        className={cn(
          'border-input bg-background hover:bg-accent/40 flex min-h-10 w-full items-center gap-2 rounded-md border px-3 py-2 text-left text-sm shadow-xs transition-colors',
          !value.date && 'text-muted-foreground',
          open && 'ring-ring/10 border-ring ring-4',
        )}
        onClick={() => setOpen((current) => !current)}
        type="button"
      >
        <CalendarIcon aria-hidden className="size-4 shrink-0" />
        <span className="truncate">{summary}</span>
      </button>

      {open && (
        <div className="border-border bg-card mt-2 overflow-hidden rounded-md border shadow-md">
          <div className="flex flex-col md:flex-row">
            <div className="w-fit shrink-0 border-b p-2 md:border-r md:border-b-0">
              <Calendar
                disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                mode="single"
                onSelect={(date) => updateValue({ date: fromCalendarDate(date) })}
                selected={selectedDate}
              />
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4 p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Clock3 aria-hidden className="size-4" />
                  Time
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground" htmlFor={`${id}-hour`}>
                      Hour
                    </Label>
                    <select
                      className={fieldSelectClassName}
                      id={`${id}-hour`}
                      onChange={(event) =>
                        updateValue({
                          time: `${event.target.value}:${value.time.split(':')[1] || '00'}`,
                        })
                      }
                      value={value.time.split(':')[0] || '09'}
                    >
                      {HOURS.map((hour) => (
                        <option key={hour} value={hour}>
                          {hour}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground" htmlFor={`${id}-minute`}>
                      Minute
                    </Label>
                    <select
                      className={fieldSelectClassName}
                      id={`${id}-minute`}
                      onChange={(event) =>
                        updateValue({
                          time: `${value.time.split(':')[0] || '09'}:${event.target.value}`,
                        })
                      }
                      value={minuteValue}
                    >
                      {minuteOptions.map((minute) => (
                        <option key={minute} value={minute}>
                          {minute}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {includeTimezoneSelect !== false && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium" htmlFor={`${id}-timezone-search`}>
                    Timezone
                  </Label>
                  <Input
                    id={`${id}-timezone-search`}
                    onChange={(event) => setTimezoneQuery(event.target.value)}
                    placeholder="Search all timezones..."
                    value={timezoneQuery}
                  />
                  <select
                    className={fieldSelectClassName}
                    id={`${id}-timezone`}
                    onChange={(event) => updateValue({ timeZone: event.target.value })}
                    value={value.timeZone}
                  >
                    {visibleTimezones.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {!timezoneQuery && (
                    <p className="text-xs text-muted-foreground">
                      Common timezones shown. Search to browse all regions.
                    </p>
                  )}
                </div>
              )}

              <Button className="w-full" onClick={() => setOpen(false)} size="sm" type="button">
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
