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
    admin: {
      description:
        'Recommended: 600×1000px (3:5 portrait). Optional until media is uploaded in admin or via seed.',
    },
  },
  {
    name: 'isVideo',
    type: 'checkbox',
    label: 'Video / motion (show play icon)',
    defaultValue: false,
  },
]
