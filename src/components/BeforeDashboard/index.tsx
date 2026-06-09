import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { isSeedEnabled } from '@/lib/cms/seedEnabled'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  const seedEnabled = isSeedEnabled()

  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Welcome to DIGITAILOR CMS</h4>
      </Banner>
      Here&apos;s what to do next:
      <ul className={`${baseClass}__instructions`}>
        {seedEnabled ? (
          <li>
            <SeedButton />
            {' to reset local demo data (destructive), then '}
            <a href="/" target="_blank">
              visit your website
            </a>
            .
          </li>
        ) : (
          <li>
            Edit globals under <strong>Site</strong> (Homepage, Site Settings, Header, Footer) and
            pages under <strong>Pages</strong>.
          </li>
        )}
        <li>
          Schema: develop with push locally, then run{' '}
          <code>pnpm db:migrate:create</code> before deploying. Production uses{' '}
          <code>pnpm start:prod</code> (migrate + start).
        </li>
        <li>Do not enable seed in production.</li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
