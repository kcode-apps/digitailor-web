import type { Header } from '@/payload-types'

/** Starter nav items for seed + ensure only — DB is the frontend source of truth. */
const customLink = (label: string, url: string) => ({
  link: {
    type: 'custom' as const,
    label,
    url,
    newTab: false,
  },
})

export const defaultHeaderNavItems = (): NonNullable<Header['navItems']> => [
  customLink('SERVICES', '/services'),
  customLink('CASE STUDIES', '/projects'),
  customLink('ABOUT DEVMINI', '/about'),
  customLink('CONTACT', '/contact'),
]
