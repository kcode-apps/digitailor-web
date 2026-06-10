'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker, getDefaultClassNames } from 'react-day-picker'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn('relative flex flex-col gap-4', defaultClassNames.months),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn(
          'pointer-events-none absolute inset-x-0 top-0 z-10 flex w-full items-center justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'pointer-events-auto size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'pointer-events-auto size-7 bg-transparent p-0 opacity-50 hover:opacity-100',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex h-7 w-full items-center justify-center px-7',
          defaultClassNames.month_caption,
        ),
        caption_label: cn('text-sm font-medium', defaultClassNames.caption_label),
        month_grid: cn('w-full border-collapse space-x-1', defaultClassNames.month_grid),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground w-8 rounded-md font-normal text-[0.8rem]',
          defaultClassNames.weekday,
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        day: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
          defaultClassNames.day,
        ),
        day_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'size-8 p-0 font-normal aria-selected:opacity-100',
          defaultClassNames.day_button,
        ),
        range_start: 'day-range-start',
        range_end: 'day-range-end',
        selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        today: 'bg-accent text-accent-foreground',
        outside:
          'day-outside text-muted-foreground aria-selected:text-muted-foreground opacity-50',
        disabled: 'text-muted-foreground opacity-50',
        range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const Icon = orientation === 'left' ? ChevronLeft : ChevronRight
          return <Icon className="size-4" />
        },
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
