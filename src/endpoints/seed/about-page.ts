import type { RequiredDataFromCollectionSlug } from 'payload'

import { aboutDefaults } from '@/lib/cms/defaults'

export const aboutPageData = (): RequiredDataFromCollectionSlug<'pages'> => ({
  title: 'About',
  slug: 'about',
  pageType: 'about',
  _status: 'published',
  aboutContent: {
    headline: aboutDefaults.headline,
    bio: aboutDefaults.bio,
    credentials: aboutDefaults.credentials,
    sidebarItems: aboutDefaults.sidebarItems,
  },
  hero: {
    type: 'none',
    richText: {
      root: {
        type: 'root',
        children: [],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
  },
  layout: [],
})
