import type { Field } from 'payload'

export const processStepFields: Field[] = [
  {
    name: 'stepNumber',
    type: 'text',
    required: true,
    admin: {
      description: 'Display label, e.g. "01"',
    },
  },
  {
    name: 'title',
    type: 'text',
    required: true,
    admin: {
      description: 'e.g. "SKETCH"',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
  },
]
