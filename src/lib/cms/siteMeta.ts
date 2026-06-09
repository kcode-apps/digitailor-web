import { siteDefaults } from '@/lib/cms/defaults'

export const siteMeta = {
  siteName: siteDefaults.siteName,
  defaultTitle: siteDefaults.siteName,
  defaultDescription: siteDefaults.hero.subheadline,
  /** Replace with a dedicated OG asset when available. */
  defaultOgImagePath: '/website-template-OG.webp',
} as const

export function formatPageTitle(title?: string | null): string {
  if (!title?.trim()) {
    return siteMeta.defaultTitle
  }

  return `${title.trim()} | ${siteMeta.siteName}`
}
