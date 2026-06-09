import type { Payload } from 'payload'

import { ensureAboutPage } from '@/lib/cms/ensureAboutPage'
import { ensureHomepage } from '@/lib/cms/ensureHomepage'
import { ensureSiteNavigation } from '@/lib/cms/ensureSiteNavigation'
import { ensureSiteSettings } from '@/lib/cms/ensureSiteSettings'

export async function ensureSiteContent(payload: Payload): Promise<void> {
  await Promise.all([
    ensureAboutPage(payload),
    ensureHomepage(payload),
    ensureSiteNavigation(payload),
    ensureSiteSettings(payload),
  ])
}
