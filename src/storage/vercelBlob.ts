import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import type { Plugin } from 'payload'

const isProduction = process.env.NODE_ENV === 'production'

/**
 * Vercel Blob for production uploads. Disabled in development — Payload uses
 * `Media.upload.staticDir` (`public/media`) locally instead.
 *
 * Requires `BLOB_READ_WRITE_TOKEN` on Vercel (auto-injected when Blob storage
 * is linked to the project). Production deploys fail fast via `validateServerEnv`
 * when the token is missing.
 *
 * Server-side uploads only (no clientUploads). Admin guidance is ≤500KB per file,
 * well under Vercel's 4.5MB function body limit. Client uploads re-fetch the blob
 * and regenerate all image sizes on save, which is slow and can hang on serverless.
 */
export const vercelBlobStoragePlugin: Plugin = vercelBlobStorage({
  enabled: isProduction,
  alwaysInsertFields: true,
  collections: {
    media: {
      prefix: 'media',
      disablePayloadAccessControl: true,
    },
  },
  token: process.env.BLOB_READ_WRITE_TOKEN,
})
