import type { Field } from 'payload'

export const impactStatFields: Field[] = [
  {
    name: 'icon',
    type: 'select',
    defaultValue: 'clock',
    options: [
      { label: 'Clock', value: 'clock' },
      { label: 'Cube', value: 'cube' },
      { label: 'Image', value: 'image' },
      { label: 'Document', value: 'document' },
    ],
    required: true,
  },
  {
    name: 'headline',
    type: 'text',
    required: true,
    admin: {
      description: 'Large display line, e.g. "30–40%" or "Reduced"',
    },
  },
  {
    name: 'subheading',
    type: 'text',
    required: true,
  },
  {
    name: 'description',
    type: 'textarea',
  },
]
