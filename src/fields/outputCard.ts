import type { Field } from 'payload'

export const outputCardFields: Field[] = [
  {
    name: 'label',
    type: 'text',
    required: true,
    admin: {
      description: 'e.g. Ecommerce, Campaign, Social Content',
    },
  },
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
    required: true,
  },
  {
    name: 'isVideo',
    type: 'checkbox',
    label: 'Video / motion (show play icon)',
    defaultValue: false,
  },
]
