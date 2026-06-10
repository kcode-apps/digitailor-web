'use client'

import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { ZonedDateTimePicker } from '@/components/form/ZonedDateTimePicker'
import {
  buildZonedDateTimeValue,
  DEFAULT_TIMEZONE,
  parseZonedDateTimeValue,
  validateZonedDateTimeValue,
} from '@/lib/formBuilder/datetime'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export type DatetimeFieldProps = {
  blockType: 'datetime'
  name: string
  label?: string | null
  width?: number | null
  required?: boolean | null
  defaultValue?: string | null
  defaultTimezone?: string | null
  includeTimezoneSelect?: boolean | null
  control: Control
  errors: Partial<FieldErrorsImpl>
}

export const DateTime: React.FC<DatetimeFieldProps> = ({
  name,
  control,
  defaultTimezone = DEFAULT_TIMEZONE,
  defaultValue,
  errors,
  includeTimezoneSelect = true,
  label,
  required,
  width,
}) => {
  const parsedDefault = parseZonedDateTimeValue(defaultValue)

  return (
    <Width width={width ?? undefined}>
      <fieldset className="space-y-4">
        <legend className="sr-only">{label || name}</legend>
        {label && (
          <p className="text-sm font-medium leading-none">
            {label}
            {required && (
              <span className="required">
                {' '}
                * <span className="sr-only">(required)</span>
              </span>
            )}
          </p>
        )}

        <Controller
          control={control}
          defaultValue={defaultValue || ''}
          name={name}
          render={({ field: { onChange, value } }) => {
            const parsed = parseZonedDateTimeValue(typeof value === 'string' ? value : '') || {
              date: parsedDefault?.date || '',
              time: parsedDefault?.time || '09:00',
              timeZone: parsedDefault?.timeZone || defaultTimezone || DEFAULT_TIMEZONE,
            }

            return (
              <ZonedDateTimePicker
                id={`${name}-picker`}
                includeTimezoneSelect={includeTimezoneSelect ?? true}
                onChange={(next) => {
                  onChange(buildZonedDateTimeValue(next.date, next.time, next.timeZone))
                }}
                required={Boolean(required)}
                value={parsed}
              />
            )
          }}
          rules={{
            required: required ? 'This field is required.' : false,
            validate: (value) => {
              if (!required && !value) {
                return true
              }

              return validateZonedDateTimeValue(typeof value === 'string' ? value : '')
            },
          }}
        />
      </fieldset>

      {errors[name] && <Error name={name} />}
    </Width>
  )
}
