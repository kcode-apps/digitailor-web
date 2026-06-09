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
          admin: { width: '50%' },
        },
        {
          name: 'siteTagline',
          type: 'text',
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
    },
  ],
  hooks: {
    afterChange: [revalidateSiteSettings],
  },
}
