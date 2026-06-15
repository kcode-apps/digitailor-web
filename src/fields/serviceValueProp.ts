import type { Field } from 'payload'

import { serviceIconField } from '@/fields/serviceIcon'

export const serviceValuePropFields: Field[] = [
  serviceIconField,
  {
    name: 'label',
    type: 'text',
    required: true,
    admin: {
      description: 'Short uppercase label, e.g. "FASTER DEVELOPMENT".',
    },
  },
]
