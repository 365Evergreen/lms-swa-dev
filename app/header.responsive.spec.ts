
const NAV_ITEMS = [
  { label: 'Topics', heading: 'Topics' },
  { label: 'Courses', heading: 'Courses' },
  { label: 'Pathways', heading: 'Pathways' },
  { label: 'Community', heading: 'Community' },
  { label: 'Resources', heading: 'Resources' },
];

test.describe('Header Responsiveness', () => {
  for (const size of [
    { name: 'desktop', width: 1200, height: 800 },
    { name: 'tablet', width: 800, height: 1000 },
    { name: 'mobile', width: 375, height: 812 },
  ]) {
    test(`should display nav correctly on ${size.name}`, async ({ page }) => {
      await page.setViewportSize({ width: size.width, height: size.height });
      await page.goto('/');
      // Hamburger visible on mobile, not on desktop
      const hamburger = page.locator('button[aria-label*="menu"]');
      if (size.name === 'mobile') {
        await expect(hamburger).toBeVisible();
        await hamburger.click();
        // Nav should be visible after click
        await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
        // Nav items should be stacked vertically
        const navList = page.locator('ul');
        const navListBox = await navList.boundingBox();
        expect(navListBox?.width).toBeLessThan(500);
      } else {
        await expect(hamburger).toBeHidden();
        // Nav should be visible
        await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
        // Nav items should be horizontal
        const navList = page.locator('ul');
        const navListBox = await navList.boundingBox();
        expect(navListBox?.width).toBeGreaterThan(500);
      }
    });
  }
});
