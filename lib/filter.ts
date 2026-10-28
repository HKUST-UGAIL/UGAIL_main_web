import type { Publication } from './types.ts';

export function filterPublications(items: Publication[], query: string, year: string): Publication[] {
  const needle = query.trim().toLocaleLowerCase('en');
  return items.filter(item =>
    (year === 'all' || item.year.toString() === year) &&
    [item.title, item.venue, ...item.authors].some(value => value.toLocaleLowerCase('en').includes(needle)),
  ).sort((a, b) => b.year - a.year);
}
export function filterInitiatives<T extends { category: string }>(items: T[], category: string): T[] {
  return items.filter(item => category === 'all' || item.category === category);
}
export function filterUpdates<T extends { category: string }>(items: T[], category: string): T[] {
  return items.filter(item => category === 'all' || item.category === category);
}
