import type { Metadata } from 'next'

import { ProjectCard } from '@/components/projects/ProjectCard'
import { formatPageTitle } from '@/lib/cms/siteMeta'
import { getPublishedProjects } from '@/lib/cms/queries'
import React from 'react'

export const revalidate = 600

export default async function ProjectsPage() {
  const projects = await getPublishedProjects()

  return (
    <section className="border-b border-warm-border/60">
      <div className="container py-12 md:py-16 lg:py-24">
        <p className="font-sans text-xs font-medium uppercase tracking-[0.16em] text-warm-gray">
          Case Studies
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-3xl leading-[1.12] text-charcoal md:text-4xl lg:text-5xl">
          Selected projects and digital production work.
        </h1>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {projects.docs.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: formatPageTitle('Case Studies'),
    description: 'Selected DIGITAILOR projects in 3D, AI, and digital fashion production.',
  }
}
