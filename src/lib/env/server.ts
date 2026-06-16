const isProduction = process.env.NODE_ENV === 'production'
const isProductionDeploy =
  isProduction && (process.env.VERCEL === '1' || process.env.CI === 'true')

function requireEnv(name: string, value: string | undefined): string {
  const trimmed = value?.trim()

  if (!trimmed) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return trimmed
}

/**
 * Validates required server env vars. Called when Payload config loads so
 * misconfigured production deploys fail fast instead of at runtime.
 */
export function validateServerEnv(): void {
  requireEnv('DATABASE_URL', process.env.DATABASE_URL)
  requireEnv('PAYLOAD_SECRET', process.env.PAYLOAD_SECRET)
  requireEnv('NEXT_PUBLIC_SERVER_URL', process.env.NEXT_PUBLIC_SERVER_URL)

  if (!isProductionDeploy) {
    return
  }

  requireEnv('BLOB_READ_WRITE_TOKEN', process.env.BLOB_READ_WRITE_TOKEN)
  requireEnv('CRON_SECRET', process.env.CRON_SECRET)
  requireEnv('PREVIEW_SECRET', process.env.PREVIEW_SECRET)
  requireEnv('RESEND_API_KEY', process.env.RESEND_API_KEY)
  requireEnv('DISCOVERY_CALL_NOTIFY_EMAIL', process.env.DISCOVERY_CALL_NOTIFY_EMAIL)
  requireEnv('EMAIL_FROM_ADDRESS', process.env.EMAIL_FROM_ADDRESS)
}

export function getDiscoveryCallNotifyEmail(): string {
  return process.env.DISCOVERY_CALL_NOTIFY_EMAIL?.trim() || ''
}

export function getEmailFromAddress(): string {
  return process.env.EMAIL_FROM_ADDRESS?.trim() || 'DIGITAILOR <noreply@example.com>'
}
