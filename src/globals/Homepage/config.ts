import type { GlobalConfig } from 'payload'

import { impactStatFields } from '@/fields/impactStat'
import { link } from '@/fields/link'
import { outputCardFields } from '@/fields/outputCard'

import { revalidateHomepage } from './hooks/revalidateHomepage'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Home Page',
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
              type: 'row',
              fields: [
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'First part of the headline (sans-serif)',
                  },
                },
                {
                  name: 'headlineAccent',
                  type: 'text',
                  required: true,
                  admin: {
                    width: '50%',
                    description: 'Rendered in serif italic',
                  },
                },
              ],
            },
            {
              name: 'subheadline',
              type: 'textarea',
              required: true,
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description:
                  'Recommended: 1920×1080px or wider (16:9). Full-width hero background; subject centered or on the right works best.',
              },
            },
            link({
              appearances: false,
              overrides: {
                name: 'heroCta',
                label: 'Hero CTA',
              },
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'taglineLead',
                  type: 'text',
                  admin: { width: '50%' },
                },
                {
                  name: 'taglineAccent',
                  type: 'text',
                  admin: {
                    width: '50%',
                    description: 'Rendered in serif italic',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Outputs',
          fields: [
            {
              name: 'outputs',
              type: 'group',
              fields: [
                {
                  name: 'overline',
                  type: 'text',
                },
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'body',
                  type: 'textarea',
                },
                link({
                  appearances: false,
                  overrides: {
                    name: 'cta',
                    label: 'Section CTA',
                  },
                }),
                {
                  name: 'cards',
                  type: 'array',
                  maxRows: 6,
                  labels: {
                    singular: 'Output',
                    plural: 'Outputs',
                  },
                  fields: outputCardFields,
                  admin: {
                    initCollapsed: true,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Impact',
          fields: [
            {
              name: 'impact',
              type: 'group',
              fields: [
                {
                  name: 'overline',
                  type: 'text',
                },
                {
                  name: 'stats',
                  type: 'array',
                  maxRows: 4,
                  labels: {
                    singular: 'Stat',
                    plural: 'Stats',
                  },
                  fields: impactStatFields,
                  admin: {
                    initCollapsed: true,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHomepage],
  },
}
