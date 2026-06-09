import type { Project } from '@/payload-types'

import { ProjectCard } from '@/components/projects/ProjectCard'
import React from 'react'

type ProjectsGridProps = {
  projects: Pick<Project, 'title' | 'slug' | 'client' | 'excerpt' | 'images'>[]
  emptyStateMessage?: string | null
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, emptyStateMessage }) => {
  if (projects.length === 0) {
    return (
      <p className="mt-12 font-sans text-base text-warm-gray md:mt-16">
        {emptyStateMessage || 'Projects will appear here once published.'}
      </p>
    )
  }

  return (
    <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.slug}>
          <ProjectCard project={project} />
        </li>
      ))}
    </ul>
  )
}
