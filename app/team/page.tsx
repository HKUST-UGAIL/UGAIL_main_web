import Image from 'next/image';
import { PageHeading, EmptyState } from '@/components/shared';
import { JoinBanner } from '@/components/join-banner';
import { Icon } from '@/components/icon';
import { getContent } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { withBasePath } from '@/lib/paths';

export const generateMetadata = () => pageMetadata('Team', 'Meet the people and interests behind UGAIL.', '/team/');

export default function TeamPage() {
  const { people } = getContent();
  const roles = [...new Set(people.map(person => person.role))];
  return <><PageHeading label="Our team" title="People make the difference." description="Different perspectives. Shared curiosity. Get to know the people behind UGAIL." /><div className="container page-content">{people.length ? roles.map(role => <section key={role} className="team-group"><div className="group-heading"><h2>{role}</h2><span>{people.filter(person => person.role === role).length.toString().padStart(2, '0')}</span></div><div className="people-grid">{people.filter(person => person.role === role).map(person => <article key={person.id} className="person-card">{person.image ? <Image src={withBasePath(person.image)} alt={`Portrait of ${person.name}`} className="person-image" width={480} height={480} /> : <div className="person-initials" aria-hidden="true">{person.name.split(' ').map(part => part[0]).slice(0, 2).join('')}</div>}<div className="person-body"><p className="eyebrow">{person.role}</p><h3>{person.name}</h3>{person.bio && <p>{person.bio}</p>}{person.interests.length > 0 && <p className="person-interests">{person.interests.join(' · ')}</p>}{person.url && <a className="text-link" href={person.url} target="_blank" rel="noopener noreferrer">Personal website <Icon name="northeast" size={15} /></a>}</div></article>)}</div></section>) : <EmptyState icon="people" title="Get to know the people behind the ideas." description="Team profiles will be shared here. In the meantime, explore the website and discover ways to connect with UGAIL." />}<div className="section-gap"><JoinBanner /></div></div></>;
}
