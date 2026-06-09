import type { Metadata } from 'next'

import { ProjectPage } from '@/components/projects/ProjectPage'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import React from 'react'
import { generateMeta } from '@/utilities/generateMeta'
import { getProjectBySlug, getPublishedProjectSlugs } from '@/lib/cms/queries'
import { draftMode } from 'next/headers'

export async function generateStaticParams() {
  const slugs = await getPublishedProjectSlugs()
  return slugs.map((slug) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const url = `/projects/${decodedSlug}`
  const project = await getProjectBySlug(decodedSlug)

  if (!project) {
    return <PayloadRedirects url={url} />
  }

  return (
    <article>
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <ProjectPage project={project} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug } = await paramsPromise
  const decodedSlug = decodeURIComponent(slug)
  const project = await getProjectBySlug(decodedSlug)

  return generateMeta({ doc: project })
}
