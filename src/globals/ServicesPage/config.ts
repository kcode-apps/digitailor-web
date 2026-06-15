import type { GlobalConfig } from 'payload'

import { serviceValuePropFields } from '@/fields/serviceValueProp'

import { revalidateServicesPage } from './hooks/revalidateServicesPage'

export const ServicesPage: GlobalConfig = {
  slug: 'services-page',
  label: 'Services Page',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Hero',
          fields: [
            {
              name: 'bannerImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Wide banner image. Subject on the right works best — copy sits on the left with a gradient overlay.',
              },
            },
            {
              name: 'overline',
              type: 'text',
              admin: {
                description: 'Small label above the headline, e.g. "SERVICES".',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'First part of the headline (sans-serif).',
                  },
                },
                {
                  name: 'headlineAccent',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Rendered in serif italic, e.g. "Digitally."',
                  },
                },
              ],
            },
            {
              name: 'subheadline',
              type: 'text',
              admin: {
                description: 'Supporting line below the headline.',
              },
            },
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'valueProps',
              type: 'array',
              maxRows: 4,
              labels: {
                singular: 'Value prop',
                plural: 'Value props',
              },
              fields: serviceValuePropFields,
              admin: {
                initCollapsed: true,
                description: 'Icon + label pairs shown below the hero copy.',
              },
            },
          ],
        },
        {
          label: 'Services grid',
          fields: [
            {
              name: 'sectionOverline',
              type: 'text',
              admin: {
                description: 'Centered label above the service cards, e.g. "WHAT WE DO".',
              },
            },
            {
              name: 'emptyStateMessage',
              type: 'text',
              admin: {
                description: 'Shown when no services are available.',
              },
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateServicesPage],
  },
}
