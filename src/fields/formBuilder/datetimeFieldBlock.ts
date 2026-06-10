import type { Block } from 'payload'

import { DEFAULT_TIMEZONE, getTimezoneOptions } from '@/lib/formBuilder/datetime'

export const datetimeFieldBlock: Block = {
  slug: 'datetime',
  labels: {
    singular: 'Date & Time',
    plural: 'Date & Time Fields',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name (lowercase, no special characters)',
          required: true,
          admin: { width: '50%' },
        },
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          admin: { width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'number',
          label: 'Field Width (percentage)',
          admin: { width: '50%' },
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Required',
          admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'defaultTimezone',
      type: 'select',
      label: 'Default timezone',
      defaultValue: DEFAULT_TIMEZONE,
      options: getTimezoneOptions(),
    },
    {
      name: 'includeTimezoneSelect',
      type: 'checkbox',
      label: 'Allow timezone selection',
      defaultValue: true,
      admin: {
        description: 'When disabled, submissions use the default timezone only.',
      },
    },
    {
      name: 'defaultValue',
      type: 'text',
      label: 'Default value',
      admin: {
        description: 'Optional. Format: YYYY-MM-DDTHH:mm:ss[IANA/Timezone]',
      },
    },
  ],
}
