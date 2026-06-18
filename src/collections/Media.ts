import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: 'media',
  folders: true,
  admin: {
    description:
      'Upload JPG, PNG, or WebP. Recommended max width 1920px; keep files under 500KB when possible. Only the original file is stored (no auto-generated variants).',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      // Alt text is required for WCAG 2.1 AA accessibility compliance.
      // For a fashion portfolio, every image must have descriptive alt text
      // for both screen readers and SEO purposes.
      required: true,
    },
    {
      name: 'caption',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
  ],
  upload: {
    // Dev: files on disk at public/media (see .gitignore). Prod: @payloadcms/storage-vercel-blob.
    staticDir: path.resolve(dirname, '../../public/media'),
    focalPoint: true,
  },
}
