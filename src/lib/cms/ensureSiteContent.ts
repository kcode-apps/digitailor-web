import type { Payload } from 'payload'

import { ensureAbout } from '@/lib/cms/ensureAbout'
import { ensureHomepage } from '@/lib/cms/ensureHomepage'
import { ensureProjectsPage } from '@/lib/cms/ensureProjectsPage'
import { ensureSiteNavigation } from '@/lib/cms/ensureSiteNavigation'
import { ensureSiteSettings } from '@/lib/cms/ensureSiteSettings'

export async function ensureSiteContent(payload: Payload): Promise<void> {
  await Promise.all([
    ensureAbout(payload),
    ensureHomepage(payload),
    ensureProjectsPage(payload),
    ensureSiteNavigation(payload),
    ensureSiteSettings(payload),
  ])
}
