import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon, type IconName } from './icon';

export function PageHeading({ label, title, description, children }: { label: string; title: string; description: string; children?: ReactNode }) {
  return <section className="page-heading"><div className="container"><div className="breadcrumb"><Link href="/">UGAIL</Link><span>/</span><span>{label}</span></div><div className="page-heading-row"><div><p className="eyebrow"><span className="small-line" />{label}</p><h1>{title}</h1><p className="page-description">{description}</p></div>{children}</div></div></section>;
}

export function SectionHeading({ label, title, href, linkLabel }: { label: string; title: string; href?: string; linkLabel?: string }) {
  return <div className="section-heading"><div><p className="eyebrow">{label}</p><h2>{title}</h2></div>{href && <Link className="text-link" href={href}>{linkLabel} <Icon name="arrow" size={17} /></Link>}</div>;
}

export function EmptyState({ icon = 'research', title, description, compact = false }: { icon?: IconName; title: string; description: string; compact?: boolean }) {
  return <div className={`empty-state${compact ? ' empty-compact' : ''}`}><div className="empty-symbol"><Icon name={icon} size={27} /></div><div><h3>{title}</h3><p>{description}</p></div><span className="empty-decoration" aria-hidden="true">↗</span></div>;
}

export function ResourceLink({ href, children }: { href: string; children: ReactNode }) {
  return <a className="resource-link" href={href} target="_blank" rel="noopener noreferrer">{children}<Icon name="northeast" size={15} /></a>;
}

export function Tag({ children }: { children: ReactNode }) { return <span className="tag">{children}</span>; }
