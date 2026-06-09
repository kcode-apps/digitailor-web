import type { Page, Project } from '@/payload-types'

export type CMSLinkData = {
  type?: ('reference' | 'custom') | null
  newTab?: boolean | null
  reference?:
    | ({
        relationTo: 'pages'
        value: number | Page
      } | null)
    | ({
        relationTo: 'projects'
        value: number | Project
      } | null)
  url?: string | null
  label?: string | null
}

export function resolveLinkHref(link?: CMSLinkData | null): string | null {
  if (!link) return null

  if (link.type === 'reference' && link.reference) {
    const { relationTo, value } = link.reference

    if (typeof value === 'object' && value.slug) {
      const prefix = relationTo === 'pages' ? '' : `/${relationTo}`
      return `${prefix}/${value.slug}`
    }
  }

  return link.url || null
}

export function resolveLinkProps(link?: CMSLinkData | null) {
  const href = resolveLinkHref(link)

  if (!href) return null

  return {
    href,
    label: link?.label,
    newTab: link?.newTab,
  }
}
