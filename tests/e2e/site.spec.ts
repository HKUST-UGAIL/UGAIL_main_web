import { test, expect } from '@playwright/test';

test('all public pages render without horizontal overflow or browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const path of ['/', '/team/', '/research/', '/publications/', '/updates/', '/join/']) {
    await page.goto(path);
    await expect(page.locator('main h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.getByRole('link', { name: 'Skip to content' })).toHaveAttribute('href', '#main-content');
  }
  expect(errors).toEqual([]);
});

test('publication search, year intersection, empty results and BibTeX work', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/publications/');
  await page.getByRole('searchbox', { name: 'Search publications' }).fill('rivera');
  await expect(page.getByRole('article')).toHaveCount(1);
  await page.getByLabel('Filter by year').selectOption('2024');
  await expect(page.getByText('No matching publications')).toBeVisible();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.getByRole('article')).toHaveCount(2);
  await page.getByRole('button', { name: 'Show BibTeX' }).click();
  await expect(page.locator('pre')).toContainText('@article{dialogue2025');
  await page.getByRole('button', { name: 'Copy BibTeX', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Copied', exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('@article{dialogue2025');
  await page.getByRole('button', { name: 'Hide BibTeX' }).click();
  await expect(page.locator('pre')).toHaveCount(0);
});

test('research filters preserve detail navigation', async ({ page }) => {
  await page.goto('/research/');
  await page.getByRole('button', { name: 'Robotics', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(1);
  await page.getByRole('link', { name: 'Learning agents', exact: true }).click();
  await expect(page).toHaveURL(/\/research\/learning-agents\//);
  await expect(page.getByText('This test detail is not published as real research.')).toBeVisible();
});

test('updates filter by category and open a readable detail page', async ({ page }) => {
  await page.goto('/updates/');
  await page.getByRole('button', { name: 'Events', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(1);
  await page.getByRole('link', { name: 'A reading session', exact: true }).click();
  await expect(page.getByText('A test event detail page.')).toBeVisible();
});

test('mobile menu closes with Escape, returns focus and closes after navigation', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile-only interaction');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Close navigation' })).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Team', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('People make the difference.');
  await expect(page.getByRole('button', { name: 'Open navigation' })).toHaveAttribute('aria-expanded', 'false');
});

test('unknown pages return a proper 404 with a way home', async ({ page }) => {
  const response = await page.goto('/a-page-that-does-not-exist/');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible();
});
