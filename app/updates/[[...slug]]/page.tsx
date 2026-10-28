import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeading, ResourceLink, Tag } from '@/components/shared';
import { UpdatesExplorer } from '@/components/updates-explorer';
import { Icon } from '@/components/icon';
import { getContent } from '@/lib/content';
import { displayDate } from '@/lib/date';
import { pageMetadata } from '@/lib/metadata';

type Props = { params: Promise<{ slug?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: [] }, ...getContent().updates.map(item => ({ slug: [item.slug] }))];
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getContent().updates.find(entry => entry.slug === slug?.[0]);
  return pageMetadata(item?.title || 'Updates', item?.summary || 'News, events, and stories from UGAIL.', item ? `/updates/${item.slug}/` : '/updates/');
}
export default async function UpdatesPage({ params }: Props) {
  const { slug } = await params;
  const { updates } = getContent();
  if (!slug?.length) return <><PageHeading label="Updates" title="A little closer to UGAIL." description="News, events, and notes along the way. Follow the latest from our community." /><div className="container page-content"><UpdatesExplorer items={updates} /></div></>;
  const item = slug.length === 1 ? updates.find(entry => entry.slug === slug[0]) : undefined;
  if (!item) notFound();
  return <><PageHeading label={item.category} title={item.title} description={item.summary} /><article className="container detail-content"><Link href="/updates/" className="text-link"><Icon name="back" size={17} />All updates</Link><div className="detail-tags"><Tag>{item.category}</Tag><time dateTime={item.date}>{displayDate(item.date)}</time></div><div className="prose">{item.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>{!!item.links?.length && <div className="detail-resources"><h2>Related links</h2><div>{item.links.map(link => <ResourceLink key={link.url} href={link.url}>{link.label}</ResourceLink>)}</div></div>}</article></>;
}
