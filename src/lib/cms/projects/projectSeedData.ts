import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media } from '@/payload-types'

type ProjectSeedArgs = {
  featuredImage: Media
  slug: string
  title: string
  client: string
  excerpt: string
}

const project = ({
  client,
  excerpt,
  featuredImage,
  slug,
  title,
}: ProjectSeedArgs): RequiredDataFromCollectionSlug<'projects'> => ({
  title,
  slug,
  client,
  excerpt,
  featuredImage: featuredImage.id,
  _status: 'published',
  content: {
    root: {
      type: 'root',
      children: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: excerpt,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
})

export const projectSeedData = (images: Media[]) => [
  project({
    title: 'Digital Product Development',
    slug: 'digital-product-development',
    client: 'Contemporary Label',
    excerpt:
      '3D-first workflow from concept to ecommerce imagery, reducing sample rounds and time to market.',
    featuredImage: images[0],
  }),
  project({
    title: 'Campaign Content System',
    slug: 'campaign-content-system',
    client: 'Global Fashion Brand',
    excerpt:
      'One digital garment powering ecommerce, editorial, and social outputs across multiple seasons.',
    featuredImage: images[1],
  }),
  project({
    title: 'Ecommerce Scale-Up',
    slug: 'ecommerce-scale-up',
    client: 'D2C Apparel',
    excerpt:
      'Scalable on-brand product imagery pipeline for rapid SKU expansion and seasonal drops.',
    featuredImage: images[2],
  }),
]
