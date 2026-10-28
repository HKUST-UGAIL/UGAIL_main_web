import Image from 'next/image';
import Link from 'next/link';
import type { Initiative, Update } from '@/lib/types';
import { withBasePath } from '@/lib/paths';
import { displayDate } from '@/lib/date';
import { Icon } from './icon';
import { Tag } from './shared';

export function InitiativeCard({ item, index = 0 }: { item: Initiative; index?: number }) {
  return <article className="initiative-card">
    {item.image ? <Image className="project-image" src={withBasePath(item.image)} alt="" width={700} height={420} /> : <div className="project-art" aria-hidden="true"><span className="project-number">{String(index + 1).padStart(2, '0')}</span><Icon name="work" size={64} /><span className="project-art-line" /></div>}
    <div className="initiative-card-body"><div className="tag-list"><Tag>{item.category}</Tag>{item.topics.map(topic => <Tag key={topic}>{topic}</Tag>)}</div><h3><Link href={`/what-we-do/${item.slug}/`}>{item.title}</Link></h3><p>{item.summary}</p><Link className="text-link" href={`/what-we-do/${item.slug}/`} aria-label={`Read about ${item.title}`}>Read more <Icon name="northeast" size={16} /></Link></div>
  </article>;
}

export function UpdateCard({ item }: { item: Update }) {
  return <article className="update-card"><div className="update-meta"><Tag>{item.category}</Tag><time dateTime={item.date}>{displayDate(item.date)}</time></div><h3><Link href={`/updates/${item.slug}/`}>{item.title}</Link></h3><p>{item.summary}</p><Link className="text-link" href={`/updates/${item.slug}/`} aria-label={`Read ${item.title}`}>Read more <Icon name="northeast" size={16} /></Link></article>;
}
