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
      <p className={`${baseClass}__intro`}>
        This admin panel manages the DIGITAILOR marketing site. Content is stored in the database
        and served on the frontend automatically.
      </p>
      <ul className={`${baseClass}__instructions`}>
        <li>
          Edit site-wide content under <strong>Site</strong>: Homepage, About, Site Settings, Header,
          and Footer.
        </li>
        <li>
          Manage flexible pages under <strong>Pages</strong> (e.g. Contact) and case studies under{' '}
          <strong>Projects</strong>.
        </li>
        {seedEnabled ? (
          <li>
            <SeedButton />
            {' to load local demo content (destructive), then '}
            <a href="/" target="_blank">
              preview the site
            </a>
            .
          </li>
        ) : (
          <li>
            <a href="/" target="_blank">
              Preview the site
            </a>{' '}
            after saving changes.
          </li>
        )}
        <li>Do not enable seed in production.</li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
