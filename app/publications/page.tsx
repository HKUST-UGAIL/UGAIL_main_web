import { PageHeading } from '@/components/shared';
import { PublicationExplorer } from '@/components/publication-explorer';
import { getContent } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const generateMetadata = () => pageMetadata('Publications', 'Papers, findings, and ideas shared by UGAIL.', '/publications/');
export default function PublicationsPage() {
  return <><PageHeading label="Publications" title="Ideas, out in the world." description="A closer look at the work we share. Explore papers, available code, and the details behind the findings." /><div className="container page-content"><PublicationExplorer items={getContent().publications} /></div></>;
}
