import type { RequiredDataFromCollectionSlug } from 'payload'

import type { Media } from '@/payload-types'

type ProjectSeedArgs = {
  images: Media[]
  featuredIndex?: number
  slug: string
  title: string
  client: string
  excerpt: string
}

const project = ({
  client,
  excerpt,
  featuredIndex = 0,
  images,
  slug,
  title,
}: ProjectSeedArgs): RequiredDataFromCollectionSlug<'projects'> => ({
  title,
  slug,
  client,
  excerpt,
  images: images.map((image, index) => ({
    image: image.id,
    isFeatured: index === featuredIndex,
  })),
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
    images: [images[0], images[1]],
    featuredIndex: 0,
  }),
  project({
    title: 'Campaign Content System',
    slug: 'campaign-content-system',
    client: 'Global Fashion Brand',
    excerpt:
      'One digital garment powering ecommerce, editorial, and social outputs across multiple seasons.',
    images: [images[1], images[2]],
    featuredIndex: 0,
  }),
  project({
    title: 'Ecommerce Scale-Up',
    slug: 'ecommerce-scale-up',
    client: 'D2C Apparel',
    excerpt:
      'Scalable on-brand product imagery pipeline for rapid SKU expansion and seasonal drops.',
    images: [images[2], images[0]],
    featuredIndex: 0,
  }),
]
