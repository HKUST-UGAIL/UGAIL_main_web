import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeading, ResourceLink, Tag } from '@/components/shared';
import { InitiativeExplorer } from '@/components/initiative-explorer';
import { Icon } from '@/components/icon';
import { getContent } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { withBasePath } from '@/lib/paths';

type Props = { params: Promise<{ slug?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return [{ slug: [] }, ...getContent().initiatives.map(item => ({ slug: [item.slug] }))];
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getContent().initiatives.find(entry => entry.slug === slug?.[0]);
  return pageMetadata(item?.title || 'What We Do', item?.summary || 'Explore the projects and activities that bring UGAIL together.', item ? `/what-we-do/${item.slug}/` : '/what-we-do/');
}
export default async function WhatWeDoPage({ params }: Props) {
  const { slug } = await params;
  const { initiatives } = getContent();
  if (!slug?.length) return <><PageHeading label="What We Do" title="Ideas in action." description="The projects we build, the activities we share, and the things we learn along the way." /><div className="container page-content"><InitiativeExplorer items={initiatives} /><div className="collection-note"><span className="small-line" /><p>Projects and activities. Different ways to turn curiosity into something shared.</p></div></div></>;
  const item = slug.length === 1 ? initiatives.find(entry => entry.slug === slug[0]) : undefined;
  if (!item) notFound();
  return <><PageHeading label={item.category} title={item.title} description={item.summary} /><article className="container detail-content"><Link href="/what-we-do/" className="text-link"><Icon name="back" size={17} />All projects & activities</Link><div className="detail-tags">{item.topics.map(topic => <Tag key={topic}>{topic}</Tag>)}</div>{item.image && <Image className="detail-image" src={withBasePath(item.image)} width={1200} height={700} alt={item.title} />}<div className="prose">{item.body.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>{!!item.links?.length && <div className="detail-resources"><h2>Explore further</h2><div>{item.links.map(link => <ResourceLink key={link.url} href={link.url}>{link.label}</ResourceLink>)}</div></div>}</article></>;
}
