import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeading, ResourceLink, Tag } from '@/components/shared';
import { ResearchExplorer } from '@/components/research-explorer';
import { Icon } from '@/components/icon';
import { getContent } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { withBasePath } from '@/lib/paths';

type Props = { params: Promise<{ slug?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: [] }, ...getContent().research.map(item => ({ slug: [item.slug] }))];
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getContent().research.find(entry => entry.slug === slug?.[0]);
  return pageMetadata(item?.title || 'Research', item?.summary || 'Explore UGAIL research projects and directions.', item ? `/research/${item.slug}/` : '/research/');
}
export default async function ResearchPage({ params }: Props) {
  const { slug } = await params;
  const { research } = getContent();
  if (!slug?.length) return <><PageHeading label="Research" title="Follow the questions." description="Explore the projects, directions, and ideas taking shape at UGAIL." /><div className="container page-content"><ResearchExplorer items={research} /><div className="collection-note"><span className="small-line" /><p>Curiosity sets the direction. Research takes it further.</p></div></div></>;
  const item = slug.length === 1 ? research.find(entry => entry.slug === slug[0]) : undefined;
  if (!item) notFound();
  return <><PageHeading label="Research" title={item.title} description={item.summary} /><article className="container detail-content"><Link href="/research/" className="text-link"><Icon name="back" size={17} />All research</Link><div className="detail-tags">{item.topics.map(topic => <Tag key={topic}>{topic}</Tag>)}</div>{item.image && <Image className="detail-image" src={withBasePath(item.image)} width={1200} height={700} alt={item.title} />}<div className="prose">{item.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>{!!item.links?.length && <div className="detail-resources"><h2>Explore further</h2><div>{item.links.map(link => <ResourceLink key={link.url} href={link.url}>{link.label}</ResourceLink>)}</div></div>}</article></>;
}
