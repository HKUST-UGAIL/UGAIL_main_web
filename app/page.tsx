import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { JoinBanner } from '@/components/join-banner';
import { ResearchCard, UpdateCard } from '@/components/content-cards';
import { EmptyState, SectionHeading } from '@/components/shared';
import { getContent } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { withBasePath } from '@/lib/paths';

export function generateMetadata() {
  return pageMetadata('Home', getContent().site.description, '/');
}

const explore = [
  { number: '01', label: 'The questions', title: 'Explore our research', description: 'Discover projects, research directions, and the ideas behind them.', href: '/research/', icon: 'research' as const },
  { number: '02', label: 'The people', title: 'Meet the team', description: 'Get to know the people and interests that bring UGAIL together.', href: '/team/', icon: 'people' as const },
  { number: '03', label: 'The discoveries', title: 'Read our publications', description: 'Find papers, follow the work, and explore the details.', href: '/publications/', icon: 'paper' as const },
];

export default function Home() {
  const { site, research, updates } = getContent();
  const featured = research.filter(item => item.featured).slice(0, 3);
  const recent = [...updates].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  const headline = site.tagline.split('. ');
  return <>
    <section className="hero">
      <div className="hero-photo"><Image src={withBasePath('/images/campus.jpeg')} alt="HKUST campus and its red sundial sculpture" fill priority sizes="100vw" /></div>
      <div className="hero-shade" />
      <div className="container hero-content"><p className="hero-eyebrow"><span className="status-dot" />WELCOME TO {site.name}<span className="hero-eyebrow-rule" /></p><h1>{headline.map((line, index) => <span key={index} className={index ? 'hero-title-soft' : ''}>{line}{index < headline.length - 1 ? '.' : ''}</span>)}</h1><p className="hero-description">{site.description}</p><div className="hero-actions"><Link href="/research/" className="button button-white">Explore our research <Icon name="northeast" size={18} /></Link><Link href="/team/" className="hero-secondary">Meet the team <Icon name="arrow" size={18} /></Link></div><div className="hero-footnote"><span className="hero-footnote-line" /><span>Curiosity is where it begins.</span></div></div>
      <div className="hero-image-label"><span className="image-location-dot" /><span>HKUST campus</span></div><div className="hero-side-label" aria-hidden="true">A NEW PERSPECTIVE BEGINS WITH A QUESTION</div>
    </section>
    <div className="intro-strip"><div className="container"><span className="intro-brand">A little curiosity goes a long way.</span><span>Explore ideas.</span><span>Meet people.</span><span>Make connections.</span><a href="#about" className="strip-scroll">Get to know us <span>↓</span></a></div></div>
    <section id="about" className="container section about-section"><div className="about-heading"><p className="eyebrow"><span className="small-line" />01 / A closer look</p><h2>Ideas start small.<br />Possibilities don’t.</h2></div><div className="about-copy"><p className="large-copy">{site.about}</p><p>From the questions we explore to the work we share, this is your window into UGAIL.</p><Link href="/join/" className="text-link">Find your way in <Icon name="northeast" size={17} /></Link></div></section>
    <section className="container explore-grid" aria-label="Explore UGAIL">{explore.map(item => <Link className="explore-card" key={item.number} href={item.href}><div className="explore-card-top"><span>{item.number} / {item.label}</span><Icon name="northeast" size={20} /></div><div className="explore-card-icon"><Icon name={item.icon} size={29} /></div><h3>{item.title}</h3><p>{item.description}</p></Link>)}</section>
    <section className="container section"><SectionHeading label="02 / Research in focus" title="Questions with somewhere to go." href="/research/" linkLabel="Explore all research" />{featured.length ? <div className="card-grid">{featured.map((item, index) => <ResearchCard key={item.slug} item={item} index={index} />)}</div> : <div className="research-intro"><div><span className="eyebrow">A space for exploration</span><h3>Follow an idea.<br />See what comes next.</h3><p>Our research page brings projects and directions together in one place. Explore the work as it is shared.</p><Link href="/research/" className="text-link">Discover our research <Icon name="arrow" size={17} /></Link></div><div className="research-graphic" aria-hidden="true"><span className="graphic-orbit orbit-one" /><span className="graphic-orbit orbit-two" /><span className="graphic-orbit orbit-three" /><span className="graphic-center"><Icon name="research" size={42} /></span><span className="graphic-node node-one" /><span className="graphic-node node-two" /><span className="graphic-cross">+</span></div></div>}</section>
    <section className="updates-section"><div className="container section"><SectionHeading label="03 / Around UGAIL" title="The latest, as it happens." href="/updates/" linkLabel="All updates" />{recent.length ? <div className="card-grid">{recent.map(item => <UpdateCard key={item.slug} item={item} />)}</div> : <EmptyState compact icon="news" title="A new chapter is taking shape." description="News, events, and stories will appear here as they are shared. Stay curious, and check back soon." />}</div></section>
    <div className="container home-join"><JoinBanner /></div>
  </>;
}
