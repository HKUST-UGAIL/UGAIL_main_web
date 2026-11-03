import { test, expect } from '@playwright/test';

test('homepage places the photo and introduction beside a narrow updates sidebar', async ({ page, isMobile }) => {
  await page.goto('/');
  const primary = page.locator('.home-main');
  const sidebar = page.getByRole('complementary', { name: 'Latest from UGAIL' });
  await expect(primary).toBeVisible();
  await expect(sidebar).toBeVisible();
  const photo = await primary.locator('figure').boundingBox();
  const introduction = await primary.locator('.home-introduction').boundingBox();
  const left = await primary.boundingBox();
  const right = await sidebar.boundingBox();
  expect(photo!.y + photo!.height).toBeLessThanOrEqual(introduction!.y);
  if (isMobile) {
    expect(right!.y).toBeGreaterThanOrEqual(left!.y + left!.height - 1);
  } else {
    expect(right!.x).toBeGreaterThanOrEqual(left!.x + left!.width);
    expect(left!.width).toBeGreaterThan(right!.width * 2);
  }
  await expect(sidebar.locator('.x-account-card')).toBeVisible();
  await expect(sidebar.getByRole('link', { name: 'Follow UGAIL on X' })).toHaveAttribute('href', 'https://x.com/ugail_example');
  await expect(sidebar.getByRole('heading', { name: 'Latest updates' })).toBeVisible();
  await expect(sidebar.locator('article h3 a').first()).toHaveText('Research notes');
  await sidebar.getByRole('link', { name: 'Research notes', exact: true }).click();
  await expect(page).toHaveURL(/\/updates\/test-research-notes\//);
});

test('all public pages render without horizontal overflow or browser errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const path of ['/', '/team/', '/what-we-do/', '/publications/', '/updates/', '/join/']) {
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

test('publication figures, metadata and summaries follow the responsive reference layout', async ({ page, isMobile }) => {
  await page.goto('/publications/');
  const entry = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Evaluating dialogue', exact: true }) });
  const image = entry.getByRole('img', { name: 'Overview of the dialogue evaluation' });
  await expect(image).toBeVisible();
  await expect(entry.locator('time')).toHaveAttribute('datetime', '2025-10');
  await expect(entry.locator('time')).toHaveText('Oct 2025');
  await expect(entry.locator('.publication-author-team')).toHaveText(['Alex Rivera', 'Sam Chen']);
  await expect(entry.locator('.publication-tldr')).toHaveText('TL;DR: Evaluates dialogue quality using a reproducible framework.');
  await expect(entry.getByRole('link', { name: 'arXiv', exact: true })).toHaveAttribute('href', 'https://example.org/paper');
  const figure = (await entry.locator('.publication-media').boundingBox())!;
  const details = (await entry.locator('.publication-content').boundingBox())!;
  if (isMobile) expect(details.y).toBeGreaterThanOrEqual(figure.y + figure.height - 1);
  else expect(details.x).toBeGreaterThanOrEqual(figure.x + figure.width - 1);
  const fallback = page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Learning agents', exact: true }) });
  await expect(fallback.getByRole('link', { name: 'Paper', exact: true })).toBeVisible();
  await expect(fallback.locator('time')).toHaveText('2024');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('projects and activities filter independently and preserve detail navigation', async ({ page }) => {
  await page.goto('/what-we-do/');
  await page.getByRole('button', { name: 'Activities', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(1);
  await page.getByRole('link', { name: 'Reading together', exact: true }).click();
  await expect(page).toHaveURL(/\/what-we-do\/reading-together\//);
  await expect(page.getByText('A test activity detail page.')).toBeVisible();
  await page.getByRole('link', { name: 'All projects & activities', exact: true }).click();
  await page.getByRole('button', { name: 'Projects', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(2);
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
