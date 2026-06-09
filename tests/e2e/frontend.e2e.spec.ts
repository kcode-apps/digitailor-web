import { test, expect } from '@playwright/test'

import { siteDefaults } from '../../src/lib/cms/defaults'

test.describe('Frontend', () => {
  test('can load homepage', async ({ page }) => {
    await page.goto('/')

    const expectedTitle = [siteDefaults.hero.headline, siteDefaults.hero.headlineAccent]
      .filter(Boolean)
      .join(' ')
      .trim()

    await expect(page).toHaveTitle(expectedTitle)

    const heading = page.locator('h1').first()
    await expect(heading).toContainText(siteDefaults.hero.headline)
    await expect(heading).toContainText(siteDefaults.hero.headlineAccent)
  })
})
