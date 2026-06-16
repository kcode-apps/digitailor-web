declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PAYLOAD_SECRET: string
      DATABASE_URL: string
      NEXT_PUBLIC_SERVER_URL: string
      BLOB_READ_WRITE_TOKEN?: string
      CRON_SECRET?: string
      DISCOVERY_CALL_NOTIFY_EMAIL?: string
      EMAIL_FROM_ADDRESS?: string
      PREVIEW_SECRET?: string
      RESEND_API_KEY?: string
      SEED_ENABLED?: string
      VERCEL_PROJECT_PRODUCTION_URL: string
    }
  }
}

export {}
