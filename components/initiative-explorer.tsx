'use client';

import { useState } from 'react';
import type { Initiative } from '@/lib/types';
import { filterInitiatives } from '@/lib/filter';
import { InitiativeCard } from './content-cards';
import { EmptyState } from './shared';

export function InitiativeExplorer({ items }: { items: Initiative[] }) {
  const [category, setCategory] = useState('all');
  const results = filterInitiatives(items, category);
  const categories = [
    { value: 'all', label: 'Everything' },
    { value: 'Project', label: 'Projects' },
    { value: 'Activity', label: 'Activities' },
  ];
  if (!items.length) return <EmptyState title="Ideas put into practice." description="Our projects, activities, and shared experiences will appear here. Check back to see what we are working on and getting involved in." />;
  return <>
    <div className="collection-toolbar">
      <div className="filter-tabs" role="group" aria-label="Filter projects and activities">
        {categories.map(item => <button key={item.value} className={category === item.value ? 'filter-tab selected' : 'filter-tab'} aria-pressed={category === item.value} onClick={() => setCategory(item.value)}>{item.label}</button>)}
      </div>
      <span className="result-count" role="status">{results.length} {results.length === 1 ? 'item' : 'items'}</span>
    </div>
    {results.length ? <div className="card-grid">{results.map((item, index) => <InitiativeCard key={item.slug} item={item} index={index} />)}</div> : <EmptyState compact title="Nothing in this category yet." description="Choose another category to explore more of what we do." />}
  </>;
}
