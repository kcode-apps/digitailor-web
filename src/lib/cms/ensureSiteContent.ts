import type { Payload } from 'payload'

import { ensureAbout } from '@/lib/cms/ensureAbout'
import { ensureDiscoveryCallForm } from '@/lib/cms/ensureDiscoveryCallForm'
import { ensureHomepage } from '@/lib/cms/ensureHomepage'
import { ensureProjectsPage } from '@/lib/cms/ensureProjectsPage'
import { ensureSiteNavigation } from '@/lib/cms/ensureSiteNavigation'
import { ensureSiteSettings } from '@/lib/cms/ensureSiteSettings'

export async function ensureSiteContent(payload: Payload): Promise<void> {
  // FIX: ensureDiscoveryCallForm must complete before ensureSiteSettings runs.
  // Previously both ran concurrently via Promise.all, but ensureSiteSettings
  // internally calls ensureDiscoveryCallForm too — creating a race that could
  // produce duplicate forms and fail to link the form ID to site settings.
  // We resolve the form first, then pass it in to avoid the double-call.
  const form = await ensureDiscoveryCallForm(payload)

  await Promise.all([
    ensureAbout(payload),
    ensureHomepage(payload),
    ensureProjectsPage(payload),
    ensureSiteNavigation(payload),
    // Pass the already-resolved form so ensureSiteSettings doesn't fetch it again
    ensureSiteSettings(payload, form),
  ])
}
