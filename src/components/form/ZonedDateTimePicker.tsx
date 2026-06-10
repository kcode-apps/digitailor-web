'use client'

import { CalendarIcon, Clock3 } from 'lucide-react'
import React, { useMemo, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          aria-required={required}
          className={cn(
            'h-auto min-h-10 w-full justify-start px-3 py-2 text-left font-normal',
            !value.date && 'text-muted-foreground',
          )}
          id={id}
          type="button"
          variant="outline"
        >
          <CalendarIcon aria-hidden className="mr-2 size-4 shrink-0" />
          <span className="truncate">{summary}</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto max-w-[calc(100vw-2rem)] p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-fit shrink-0 border-b p-3 md:border-r md:border-b-0">
            <Calendar
              disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
              mode="single"
              onSelect={(date) => updateValue({ date: fromCalendarDate(date) })}
              selected={selectedDate}
            />
          </div>

          <div className="flex min-w-[16rem] flex-col gap-4 p-4">
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
                  <Select
                    onValueChange={(hour) => updateValue({ time: `${hour}:${value.time.split(':')[1] || '00'}` })}
                    value={value.time.split(':')[0] || '09'}
                  >
                    <SelectTrigger id={`${id}-hour`}>
                      <SelectValue placeholder="Hour" />
                    </SelectTrigger>
                    <SelectContent>
                      {HOURS.map((hour) => (
                        <SelectItem key={hour} value={hour}>
                          {hour}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground" htmlFor={`${id}-minute`}>
                    Minute
                  </Label>
                  <Select
                    onValueChange={(minute) =>
                      updateValue({ time: `${value.time.split(':')[0] || '09'}:${minute}` })
                    }
                    value={minuteValue}
                  >
                    <SelectTrigger id={`${id}-minute`}>
                      <SelectValue placeholder="Min" />
                    </SelectTrigger>
                    <SelectContent>
                      {minuteOptions.map((minute) => (
                        <SelectItem key={minute} value={minute}>
                          {minute}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                <Select onValueChange={(timeZone) => updateValue({ timeZone })} value={value.timeZone}>
                  <SelectTrigger id={`${id}-timezone`}>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {visibleTimezones.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
      </PopoverContent>
    </Popover>
  )
}
