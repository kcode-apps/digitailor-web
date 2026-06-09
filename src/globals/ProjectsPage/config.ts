import type { GlobalConfig } from 'payload'

import { revalidateProjectsPage } from './hooks/revalidateProjectsPage'

export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  label: 'Projects Page',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'overline',
      type: 'text',
      admin: {
        description: 'Small label above the headline.',
      },
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      admin: {
        description: 'Optional supporting copy below the headline.',
      },
    },
    {
      name: 'emptyStateMessage',
      type: 'text',
      admin: {
        description: 'Shown when no published projects are available.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateProjectsPage],
  },
}
