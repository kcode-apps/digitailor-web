import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { serviceIconField } from '@/fields/serviceIcon'

import { revalidateService, revalidateServiceDelete } from './hooks/revalidateService'

export const Services: CollectionConfig<'services'> = {
  slug: 'services',
  labels: {
    singular: 'Service',
    plural: 'Services',
  },
  admin: {
    defaultColumns: ['displayNumber', 'title', 'sortOrder', 'updatedAt'],
    group: 'Content',
    useAsTitle: 'title',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  defaultPopulate: {
    displayNumber: true,
    title: true,
    icon: true,
    image: true,
    features: true,
    footerLabel: true,
    footerText: true,
    sortOrder: true,
  },
  fields: [
    {
      name: 'displayNumber',
      type: 'text',
      required: true,
      admin: {
        description: 'Sequence label shown on the card, e.g. "01".',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    serviceIconField,
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'features',
      type: 'array',
      labels: {
        singular: 'Feature',
        plural: 'Features',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
      admin: {
        initCollapsed: true,
      },
    },
    {
      name: 'footerLabel',
      type: 'text',
      admin: {
        description: 'Footer bar prefix, e.g. "IDEAL FOR:" or "BENEFITS:".',
      },
    },
    {
      name: 'footerText',
      type: 'textarea',
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Controls card order on the services page (lowest first).',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateService],
    afterDelete: [revalidateServiceDelete],
  },
}
