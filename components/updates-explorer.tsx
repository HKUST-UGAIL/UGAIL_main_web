'use client';

import { useState } from 'react';
import type { Update } from '@/lib/types';
import { filterUpdates } from '@/lib/filter';
import { UpdateCard } from './content-cards';
import { EmptyState } from './shared';

export function UpdatesExplorer({ items }: { items: Update[] }) {
  const [category, setCategory] = useState('all');
  const results = filterUpdates(items, category).sort((a, b) => b.date.localeCompare(a.date));
  const categories = [{ value: 'all', label: 'All updates' }, { value: 'News', label: 'News' }, { value: 'Event', label: 'Events' }, { value: 'Article', label: 'Articles' }];
  if (!items.length) return <EmptyState icon="news" title="The next chapter starts here." description="News, events, and stories from UGAIL will be shared here. There are no updates to display yet." />;
  return <><div className="collection-toolbar"><div className="filter-tabs" role="group" aria-label="Filter updates by category">{categories.map(item => <button key={item.value} className={category === item.value ? 'filter-tab selected' : 'filter-tab'} aria-pressed={category === item.value} onClick={() => setCategory(item.value)}>{item.label}</button>)}</div><span className="result-count" role="status">{results.length} {results.length === 1 ? 'update' : 'updates'}</span></div>{results.length ? <div className="card-grid">{results.map(item => <UpdateCard key={item.slug} item={item} />)}</div> : <EmptyState compact icon="news" title="No updates in this category" description="Choose another category to see more from UGAIL." />}</>;
}
