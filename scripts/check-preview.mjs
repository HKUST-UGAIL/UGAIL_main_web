import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const origin = process.env.PREVIEW_URL || 'http://127.0.0.1:3000';
const prefix = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const fixtures = process.env.VERIFY_FIXTURES === '1';
const output = `artifacts/screenshots/${prefix ? 'project-path' : 'root'}${fixtures ? '-fixtures' : ''}`;
await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  for (const [name, viewport] of [['desktop', { width: 1440, height: 1000 }], ['mobile', { width: 390, height: 844 }]]) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const route of ['/', '/team/', '/what-we-do/', '/publications/', '/updates/', '/join/']) {
      const response = await page.goto(`${origin}${prefix}${route}`, { waitUntil: 'networkidle' });
      assert.equal(response.status(), 200, `${name}: ${route} should exist`);
      assert.equal(await page.locator('main h1').count(), 1, `${name}: ${route} needs one heading`);
      assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${name}: ${route} overflows`);
      assert(await page.evaluate(() => [...document.images].every(image => image.complete && image.naturalWidth > 0)), `${name}: ${route} has a broken image`);
      if (!fixtures) {
        assert(!/Alex Rivera|Sam Chen|test@example.org|fictional test/i.test(await page.locator('body').innerText()), 'Fixture data leaked into production');
        if (['/team/', '/what-we-do/', '/publications/', '/updates/'].includes(route)) assert.equal(await page.locator('.empty-state').count(), 1);
      }
      if (name === 'desktop' && route !== '/join/') assert.equal(await page.locator('.desktop-nav a[aria-current="page"]').count(), 1, `Active navigation missing on ${route}`);
      await page.screenshot({ path: `${output}/${route === '/' ? 'home' : route.split('/')[1]}-${name}.png`, fullPage: true });
    }
    if (fixtures) {
      for (const route of ['/what-we-do/learning-agents/', '/updates/test-reading-session/']) {
        const response = await page.goto(`${origin}${prefix}${route}`);
        assert.equal(response.status(), 200, `Direct detail request failed: ${route}`);
        assert.equal(await page.locator('main article .prose').count(), 1);
      }
      await page.goto(`${origin}${prefix}/publications/`);
      await page.getByRole('searchbox', { name: 'Search publications' }).fill('Rivera');
      assert.equal(await page.getByRole('article').count(), 1);
    }
    if (name === 'mobile') {
      await page.goto(`${origin}${prefix}/`);
      await page.getByRole('button', { name: 'Open navigation' }).click();
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Team', exact: true }).click();
      await page.waitForURL(`${origin}${prefix}/team/`);
      assert.equal(await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded'), 'false');
    }
    const missing = await page.goto(`${origin}${prefix}/unexplored-page/`);
    assert.equal(missing.status(), 404);
    assert.equal(await page.getByRole('link', { name: 'Back to home' }).count(), 1);
    assert.deepEqual(errors, [], 'Browser runtime errors');
    console.log(`${name}: six pages, images, overflow, navigation, ${fixtures ? 'fixture details, ' : 'production empty states, '}and 404 verified.`);
    await context.close();
  }
  console.log(`Screenshots: ${output}`);
} finally { await browser.close(); }
