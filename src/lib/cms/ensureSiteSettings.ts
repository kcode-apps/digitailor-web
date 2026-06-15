import type { Payload } from 'payload'
import type { Form } from '@/payload-types'

import { siteDefaults, siteSettingsStarterData } from '@/lib/cms/defaults'

/**
 * Populates site settings with starter data on first run.
 *
 * @param payload - The Payload instance.
 * @param form    - The already-resolved discovery call form (resolved by
 *                  ensureSiteContent before this function is called) so we
 *                  don't hit the DB for it twice in parallel.
 */
export async function ensureSiteSettings(payload: Payload, form: Form | null): Promise<void> {
  const settings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
    overrideAccess: true,
  })

  const updates: Record<string, unknown> = {}

  if (!settings.siteName?.trim()) {
    Object.assign(
      updates,
      siteSettingsStarterData(form ? { discoveryCallFormId: form.id } : undefined),
    )
  }

  if (!settings.primaryCtaLabel?.trim()) {
    updates.primaryCtaLabel = siteDefaults.primaryCtaLabel
  }

  if (!settings.discoveryCallModalDescription?.trim()) {
    updates.discoveryCallModalDescription = siteDefaults.discoveryCallModalDescription
  }

  if (!settings.discoveryCallForm && form) {
    updates.discoveryCallForm = form.id
  }

  if (Object.keys(updates).length === 0) {
    return
  }

  await payload.updateGlobal({
    slug: 'site-settings',
    data: updates,
    overrideAccess: true,
    // Prevent the afterChange hook from attempting to revalidate during onInit,
    // where there is no active Next.js request context and the cache is cold.
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info('Ensured site settings')
  // NOTE: revalidateTag calls removed from here. They were called during onInit
  // (server startup) where no Next.js request context exists, making them a
  // silent no-op. Cache revalidation on startup is also unnecessary — the cache
  // hasn't been populated yet.
}

