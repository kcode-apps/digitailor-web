import type { GlobalConfig } from 'payload'

import { impactStatFields } from '@/fields/impactStat'
import { link } from '@/fields/link'
import { outputCardFields } from '@/fields/outputCard'

import { revalidateHomepage } from './hooks/revalidateHomepage'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
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
                  name: 'headlineLead',
                  type: 'text',
                  required: true,
                  defaultValue: 'Built for the Future of',
                  admin: { width: '50%' },
                },
                {
                  name: 'headlineAccent',
                  type: 'text',
                  required: true,
                  defaultValue: 'Fashion Production.',
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
              defaultValue:
                'Helping fashion brands create faster workflows, scalable content, and smarter digital production through 3D and AI.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: 'Full-width background image. Subject centered or right works best.',
              },
            },
            link({
              appearances: false,
              labelDefaultValue: 'VIEW OUR WORK',
              overrides: {
                name: 'heroCta',
                label: 'Hero CTA',
                defaultValue: {
                  type: 'custom',
                  label: 'VIEW OUR WORK',
                  url: '/projects',
                  newTab: false,
                },
              },
            }),
            {
              type: 'row',
              fields: [
                {
                  name: 'taglineLead',
                  type: 'text',
                  defaultValue: 'One digital garment.',
                  admin: { width: '50%' },
                },
                {
                  name: 'taglineAccent',
                  type: 'text',
                  defaultValue: 'Endless possibilities.',
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
                  defaultValue: 'ONE DIGITAL GARMENT.',
                },
                {
                  name: 'headline',
                  type: 'text',
                  required: true,
                  defaultValue: 'Multiple outputs. Maximum impact.',
                },
                {
                  name: 'body',
                  type: 'textarea',
                  defaultValue:
                    'Create everything your brand needs from one digital foundation.',
                },
                link({
                  appearances: false,
                  labelDefaultValue: 'EXPLORE ALL OUTPUTS',
                  overrides: {
                    name: 'cta',
                    label: 'Section CTA',
                    defaultValue: {
                      type: 'custom',
                      label: 'EXPLORE ALL OUTPUTS',
                      url: '/projects',
                      newTab: false,
                    },
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
                  defaultValue: 'THE IMPACT',
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
