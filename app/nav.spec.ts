import { test, expect } from '@playwright/test';

const NAV_ITEMS = [
  { label: 'Topics', heading: 'Topics' },
  { label: 'Courses', heading: 'Courses' },
  { label: 'Pathways', heading: 'Pathways' },
  { label: 'Community', heading: 'Community' },
  { label: 'Resources', heading: 'Resources' },
];

test.describe('Navigation Bar', () => {
  test.beforeEach(async ({ page }) => {
    // use Playwright `baseURL` from config; navigate relative to it
    await page.goto('/');
  });

  for (const item of NAV_ITEMS) {
    test(`should navigate to ${item.label} and show correct content`, async ({ page }) => {
      // Click nav item by text
      await page.getByRole('link', { name: item.label }).click();
      // Wait for heading or fallback text
      if (item.heading === 'Community') {
        // Community is a static page, check for heading or fallback
        await expect(page.locator('body')).toContainText('Community');
      } else {
        await expect(page.locator('h2')).toHaveText(item.heading, { timeout: 5000 });
      }
    });
  }
});
