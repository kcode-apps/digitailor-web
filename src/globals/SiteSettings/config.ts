import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { socialLinksField } from '@/fields/socialLinks'

import { revalidateSiteSettings } from './hooks/revalidateSiteSettings'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Site',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'siteName',
          type: 'text',
          required: true,
          defaultValue: 'DIGITAILOR',
          admin: { width: '50%' },
        },
        {
          name: 'siteTagline',
          type: 'text',
          defaultValue: 'by Devmini',
          admin: { width: '50%' },
        },
      ],
    },
    link({
      appearances: false,
      overrides: {
        name: 'primaryCta',
        label: 'Primary CTA (header)',
      },
    }),
    socialLinksField,
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2024 DIGITAILOR. All rights reserved.',
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
