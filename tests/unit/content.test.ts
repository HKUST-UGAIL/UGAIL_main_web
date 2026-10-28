import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateContent } from '../../lib/schema.ts';

function fixture() {
  return Object.fromEntries(['site', 'people', 'initiatives', 'publications', 'updates'].map(name => [name, JSON.parse(readFileSync(new URL(`../fixtures/content/${name}.json`, import.meta.url), 'utf8'))]));
}

test('content validation rejects duplicate project slugs before static routing', () => {
  const content = fixture();
  content.initiatives.push(content.initiatives[0]);
  assert.throws(() => validateContent(content));
});
test('content validation rejects executable links and malformed calendar dates', () => {
  const content = fixture();
  content.publications[0].paperUrl = 'javascript:alert(1)';
  assert.throws(() => validateContent(content));
  const badDate = fixture();
  badDate.updates[0].date = '2026-02-30';
  assert.throws(() => validateContent(badDate));
});
test('valid content preserves paragraphs, optional links, and a missing contact email', () => {
  const content = fixture();
  delete content.site.contactEmail;
  const result = validateContent(content);
  assert.deepEqual(result.initiatives[0].body, ['This is isolated test content for a project detail page.']);
  assert.equal(result.site.contactEmail, undefined);
});
