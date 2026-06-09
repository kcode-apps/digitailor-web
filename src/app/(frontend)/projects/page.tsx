import type { Metadata } from 'next'

import { ProjectsPageLoader } from '@/components/projects/ProjectsPageLoader'
import { getCachedProjectsPage } from '@/lib/cms/queries'
import { formatPageTitle } from '@/lib/cms/siteMeta'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import React from 'react'

export default function ProjectsRoute() {
  return <ProjectsPageLoader />
}

export async function generateMetadata(): Promise<Metadata> {
  const projectsPage = await getCachedProjectsPage(0)()

  const title = formatPageTitle(projectsPage.headline)
  const description = projectsPage.intro || projectsPage.headline

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      description: description || undefined,
      title,
      url: `${getServerSideURL()}/projects`,
    }),
  }
}
