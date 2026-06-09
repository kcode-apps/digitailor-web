import type { Payload } from 'payload'

import { projectsPageStarterData } from '@/lib/cms/defaults'

export async function ensureProjectsPage(payload: Payload): Promise<void> {
  const projectsPage = await payload.findGlobal({
    slug: 'projects-page',
    depth: 0,
    overrideAccess: true,
  })

  if (projectsPage.headline?.trim()) {
    return
  }

  await payload.updateGlobal({
    slug: 'projects-page',
    data: projectsPageStarterData(),
    overrideAccess: true,
    context: {
      disableRevalidate: true,
    },
  })

  payload.logger.info('Populated default Projects Page content')
}
