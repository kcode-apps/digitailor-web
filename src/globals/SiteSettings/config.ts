import type { GlobalConfig } from 'payload'

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
    {
      name: 'primaryCtaLabel',
      type: 'text',
      label: 'Primary CTA label (header)',
      defaultValue: 'Book a discovery call',
      admin: {
        description: 'Label for the header button that opens the discovery call form modal.',
      },
    },
    {
      name: 'discoveryCallForm',
      type: 'relationship',
      relationTo: 'forms',
      label: 'Discovery call form',
      admin: {
        description: 'Form opened in a modal when visitors click the primary header CTA.',
      },
    },
    {
      name: 'discoveryCallModalDescription',
      type: 'textarea',
      label: 'Discovery call modal intro',
      admin: {
        description: 'Short text shown under the modal title before the form is submitted.',
      },
    },
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
