import { getServerSideURL } from '@/utilities/getURL'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function GET() {
  const payload = await getPayload({ config: configPromise })
  const serverUrl = getServerSideURL()

  const results = await payload.find({
    collection: 'projects',
    overrideAccess: false,
    draft: false,
    depth: 0,
    limit: 1000,
    pagination: false,
    select: {
      slug: true,
      updatedAt: true,
    },
    where: {
      _status: {
        equals: 'published',
      },
    },
  })

  const dateFallback = new Date().toISOString()

  const sitemap = results.docs
    ? results.docs
        .filter((project) => Boolean(project?.slug))
        .map((project) => ({
          lastmod: project.updatedAt || dateFallback,
          url: `${serverUrl}/projects/${project?.slug}`,
        }))
    : []

  return Response.json(sitemap, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
