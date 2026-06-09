import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'

/**
 * Sample migration — no schema changes.
 *
 * When you change Payload collections/globals/fields:
 * 1. Develop locally with push enabled (default in dev).
 * 2. Run `pnpm db:migrate:create` to generate a real migration from the diff.
 * 3. Commit the new file under `migrations/`.
 * 4. Deploy with `pnpm start:prod` (runs `payload migrate` then starts the app).
 */
export async function up(_args: MigrateUpArgs): Promise<void> {
  // No-op
}

export async function down(_args: MigrateDownArgs): Promise<void> {
  // No-op
}
