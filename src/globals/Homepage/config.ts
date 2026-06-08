import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { processStepFields } from '@/fields/processStep'

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
              name: 'headline',
              type: 'text',
              required: true,
              defaultValue: 'Built for the Future of Fashion Production.',
            },
            {
              name: 'subheadline',
              type: 'textarea',
              required: true,
              defaultValue:
                'End-to-end 3D and AI workflows that transform how fashion brands design, develop, and deliver.',
            },
            {
              name: 'heroImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            link({
              appearances: false,
              overrides: {
                name: 'heroCta',
                label: 'Hero CTA',
              },
            }),
          ],
        },
        {
          label: 'Process',
          fields: [
            {
              name: 'processSteps',
              type: 'array',
              maxRows: 5,
              labels: {
                singular: 'Step',
                plural: 'Steps',
              },
              fields: processStepFields,
              admin: {
                initCollapsed: true,
              },
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
