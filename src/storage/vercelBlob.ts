import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import type { Plugin } from 'payload'

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Vercel Blob for production uploads. Disabled in development — Payload uses
 * `Media.upload.staticDir` (`public/media`) locally instead.
 *
 * Requires `BLOB_READ_WRITE_TOKEN` on Vercel (auto-injected when Blob storage
 * is linked to the project). `clientUploads` bypasses Vercel's 4.5MB serverless
 * request body limit for admin uploads.
 */
export const vercelBlobStoragePlugin: Plugin = vercelBlobStorage({
  enabled: isProduction,
  collections: {
    media: {
      prefix: 'media',
    },
  },
  token: process.env.BLOB_READ_WRITE_TOKEN,
  clientUploads: isProduction ? true : undefined,
})
