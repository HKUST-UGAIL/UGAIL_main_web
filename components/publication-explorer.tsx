'use client';

import { useState } from 'react';
import type { Publication } from '@/lib/types';
import { filterPublications } from '@/lib/filter';
import { Icon } from './icon';
import { EmptyState, ResourceLink } from './shared';

function PublicationEntry({ item }: { item: Publication }) {
  const [expanded, setExpanded] = useState(false);
  const [copyState, setCopyState] = useState('Copy BibTeX');
  async function copy() {
    try { await navigator.clipboard.writeText(item.bibtex!); setCopyState('Copied'); }
    catch { setCopyState('Copy unavailable — select the text below'); }
  }
  return <article className="publication"><div className="publication-icon"><Icon name="paper" size={23} /></div><div className="publication-content"><span className="publication-venue">{item.venue} · {item.year}</span><h3>{item.title}</h3><p className="authors">{item.authors.join(', ')}</p><div className="publication-actions"><ResourceLink href={item.paperUrl}>Paper</ResourceLink>{item.codeUrl && <ResourceLink href={item.codeUrl}>Code</ResourceLink>}{item.bibtex && <button className="resource-link" aria-label={expanded ? 'Hide BibTeX' : 'Show BibTeX'} aria-expanded={expanded} aria-controls={`citation-${item.id}`} onClick={() => setExpanded(!expanded)}>BibTeX <Icon name={expanded ? 'close' : 'plus'} size={14} /></button>}</div>{expanded && <div className="citation" id={`citation-${item.id}`}><div className="citation-toolbar"><span>BibTeX</span><button onClick={copy}>{copyState}</button></div><pre tabIndex={0} aria-label={`BibTeX for ${item.title}`}>{item.bibtex}</pre><span className="sr-only" role="status">{copyState === 'Copied' ? 'Citation copied to clipboard' : ''}</span></div>}</div></article>;
}

export function PublicationExplorer({ items }: { items: Publication[] }) {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState('all');
  const years = [...new Set(items.map(item => item.year))].sort((a, b) => b - a);
  const results = filterPublications(items, query, year);
  const groups = [...new Set(results.map(item => item.year))];
  if (!items.length) return <EmptyState icon="paper" title="Ideas worth sharing." description="Publications will be listed here with links to papers, available code, and citations. There are no publications to display yet." />;
  return <><div className="publication-toolbar"><label className="search-field"><Icon name="search" size={19} /><input type="search" aria-label="Search publications" placeholder="Search by title, author, or venue" value={query} onChange={event => setQuery(event.target.value)} /></label><label className="year-field"><span className="sr-only">Filter by year</span><select value={year} onChange={event => setYear(event.target.value)}><option value="all">All years</option>{years.map(value => <option key={value} value={value}>{value}</option>)}</select></label></div><div className="publication-summary"><span role="status">{results.length} {results.length === 1 ? 'publication' : 'publications'}</span>{(query || year !== 'all') && <button className="text-link" onClick={() => { setQuery(''); setYear('all'); }}>Reset filters <Icon name="close" size={14} /></button>}</div>{results.length ? groups.map(group => <section key={group} className="publication-year" aria-label={`Publications from ${group}`}><h2>{group}<span /></h2><div>{results.filter(item => item.year === group).map(item => <PublicationEntry key={item.id} item={item} />)}</div></section>) : <EmptyState compact icon="search" title="No matching publications" description="Try another title, author, venue, or year. You can also reset the filters to see all publications." />}</>;
}
