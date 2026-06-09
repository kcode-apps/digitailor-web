/**
 * Destructive seed is dev-only. Set SEED_ENABLED=true in local .env to show the admin seed button.
 * Never enable in production.
 */
export function isSeedEnabled(): boolean {
  return process.env.SEED_ENABLED === 'true'
}
