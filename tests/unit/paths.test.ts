import { test } from 'node:test';
import assert from 'node:assert/strict';
import { withBasePath, normalizeBasePath } from '../../lib/paths.ts';

test('deployment prefix works at root, on assets, and on the project homepage', () => {
  assert.equal(withBasePath('/team/', ''), '/team/');
  assert.equal(withBasePath('/team/', '/UGAIL_main_web'), '/UGAIL_main_web/team/');
  assert.equal(withBasePath('/images/campus.jpeg', '/UGAIL_main_web/'), '/UGAIL_main_web/images/campus.jpeg');
  assert.equal(withBasePath('/', '/UGAIL_main_web'), '/UGAIL_main_web/');
});
test('external, email and fragment links never receive the deployment prefix', () => {
  for (const link of ['https://github.com/HKUST-UGAIL', 'mailto:hello@example.org', '#main-content', '//example.org/image']) {
    assert.equal(withBasePath(link, '/UGAIL_main_web'), link);
  }
});
test('normalization removes trailing slash and rejects invalid prefixes', () => {
  assert.equal(normalizeBasePath('/'), '');
  assert.equal(normalizeBasePath('/UGAIL_main_web/'), '/UGAIL_main_web');
  assert.throws(() => normalizeBasePath('https://example.org'));
  assert.throws(() => normalizeBasePath('/../escape'));
});
