'use client';

import { useState } from 'react';
import type { Research } from '@/lib/types';
import { filterResearch } from '@/lib/filter';
import { ResearchCard } from './content-cards';
import { EmptyState } from './shared';

export function ResearchExplorer({ items }: { items: Research[] }) {
  const [topic, setTopic] = useState('all');
  const topics = [...new Set(items.flatMap(item => item.topics))].sort();
  const results = filterResearch(items, topic);
  if (!items.length) return <EmptyState title="Every project begins with a question." description="Research projects and directions will appear here as they are shared. Check back to explore what is taking shape at UGAIL." />;
  return <><div className="collection-toolbar"><div className="filter-tabs" role="group" aria-label="Filter research by topic">{['all', ...topics].map(value => <button key={value} className={topic === value ? 'filter-tab selected' : 'filter-tab'} aria-pressed={topic === value} onClick={() => setTopic(value)}>{value === 'all' ? 'All research' : value}</button>)}</div><span className="result-count" role="status">{results.length} {results.length === 1 ? 'project' : 'projects'}</span></div><div className="card-grid">{results.map((item, index) => <ResearchCard key={item.slug} item={item} index={index} />)}</div></>;
}
