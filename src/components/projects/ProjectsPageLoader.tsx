import { ProjectsGrid } from '@/components/projects/ProjectsGrid'
import { ProjectsPageHeader } from '@/components/projects/ProjectsPageHeader'
import { getCachedProjectsPage, getCachedPublishedProjects } from '@/lib/cms/queries'
import React from 'react'

export async function ProjectsPageLoader() {
  const [projectsPage, projects] = await Promise.all([
    getCachedProjectsPage(0)(),
    getCachedPublishedProjects({ depth: 1 })(),
  ])

  return (
    <section className="border-b border-blush/20 bg-cream paper-texture">
      <div className="container py-12 md:py-16 lg:py-24">
        <ProjectsPageHeader projectsPage={projectsPage} />
        <ProjectsGrid
          emptyStateMessage={projectsPage.emptyStateMessage}
          projects={projects.docs}
        />
      </div>
    </section>
  )
}
