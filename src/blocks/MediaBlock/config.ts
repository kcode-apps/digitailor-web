import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description:
          'Recommended: 1200×800px or wider. Renders at content width; use 3:2 or 16:9 landscape for best results.',
      },
    },
  ],
}
