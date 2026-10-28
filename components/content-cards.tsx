import Image from 'next/image';
import Link from 'next/link';
import type { Research, Update } from '@/lib/types';
import { withBasePath } from '@/lib/paths';
import { displayDate } from '@/lib/date';
import { Icon } from './icon';
import { Tag } from './shared';

export function ResearchCard({ item, index = 0 }: { item: Research; index?: number }) {
  return <article className="research-card">
    {item.image ? <Image className="project-image" src={withBasePath(item.image)} alt="" width={700} height={420} /> : <div className="project-art" aria-hidden="true"><span className="project-number">{String(index + 1).padStart(2, '0')}</span><Icon name="research" size={64} /><span className="project-art-line" /></div>}
    <div className="research-card-body"><div className="tag-list">{item.topics.map(topic => <Tag key={topic}>{topic}</Tag>)}</div><h3><Link href={`/research/${item.slug}/`}>{item.title}</Link></h3><p>{item.summary}</p><Link className="text-link" href={`/research/${item.slug}/`} aria-label={`Read about ${item.title}`}>Explore project <Icon name="northeast" size={16} /></Link></div>
  </article>;
}

export function UpdateCard({ item }: { item: Update }) {
  return <article className="update-card"><div className="update-meta"><Tag>{item.category}</Tag><time dateTime={item.date}>{displayDate(item.date)}</time></div><h3><Link href={`/updates/${item.slug}/`}>{item.title}</Link></h3><p>{item.summary}</p><Link className="text-link" href={`/updates/${item.slug}/`} aria-label={`Read ${item.title}`}>Read more <Icon name="northeast" size={16} /></Link></article>;
}
