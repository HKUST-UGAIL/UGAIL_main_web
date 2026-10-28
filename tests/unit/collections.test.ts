import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filterPublications, filterResearch, filterUpdates } from '../../lib/filter.ts';

const papers = [
  { id: 'dialogue', title: 'Evaluating dialogue', authors: ['Alex Rivera'], year: 2025, venue: 'ACL', paperUrl: 'https://example.org/paper' },
  { id: 'agents', title: 'Learning agents', authors: ['Sam Chen'], year: 2024, venue: 'NeurIPS', paperUrl: 'https://example.org/agents' },
  { id: 'language', title: 'Language in context', authors: ['Alex Rivera'], year: 2024, venue: 'EMNLP', paperUrl: 'https://example.org/language' },
];

test('publication search matches authors case-insensitively and intersects the chosen year', () => {
  assert.deepEqual(filterPublications(papers, '  RIVERA ', '2025').map(p => p.id), ['dialogue']);
});
test('publication search matches venue and title and handles no results', () => {
  assert.deepEqual(filterPublications(papers, 'neurips', 'all').map(p => p.id), ['agents']);
  assert.deepEqual(filterPublications(papers, 'context', 'all').map(p => p.id), ['language']);
  assert.deepEqual(filterPublications(papers, 'missing', 'all'), []);
});
test('publication results sort newest first without mutating source data', () => {
  assert.deepEqual(filterPublications([...papers].reverse(), '', 'all').map(p => p.id), ['dialogue', 'language', 'agents']);
  assert.deepEqual(papers.map(p => p.id), ['dialogue', 'agents', 'language']);
});
test('research filters topics and updates filter categories without fabricating records', () => {
  const projects = [{ topics: ['Language', 'Evaluation'] }, { topics: ['Robotics'] }];
  assert.deepEqual(filterResearch(projects, 'Evaluation'), [projects[0]]);
  assert.deepEqual(filterResearch(projects, 'all'), projects);
  assert.deepEqual(filterResearch([], 'all'), []);
  assert.deepEqual(filterUpdates([{ category: 'News' }, { category: 'Event' }], 'Event'), [{ category: 'Event' }]);
});
