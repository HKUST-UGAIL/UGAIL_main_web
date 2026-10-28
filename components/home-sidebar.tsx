import Link from 'next/link';
import type { Site, Update } from '@/lib/types';
import { displayDate } from '@/lib/date';
import { Icon } from './icon';

export function HomeSidebar({ site, updates }: { site: Site; updates: Update[] }) {
  const recent = [...updates].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  return (
    <aside className="home-sidebar" aria-label="Latest from UGAIL">
      <div className="x-account-card">
        <span className="x-account-logo" aria-hidden="true">𝕏</span>
        <div className="x-account-info">
          <span className="x-account-handle">{site.xHandle ? `@${site.xHandle}` : '@your_handle'}</span>
          <span className="x-account-caption">{site.xHandle ? `${site.name} on X` : 'X account coming soon'}</span>
        </div>
        {site.xHandle ? (
          <a className="x-follow" href={`https://x.com/${site.xHandle}`} target="_blank" rel="noopener noreferrer" aria-label={`Follow ${site.name} on X`}>Follow <Icon name="northeast" size={12} /></a>
        ) : <span className="x-account-pending">Soon</span>}
      </div>

      <section className="sidebar-updates" aria-labelledby="sidebar-updates-title">
        <div className="sidebar-heading">
          <h2 id="sidebar-updates-title">Latest updates</h2>
          <Link href="/updates/" aria-label="View all updates">View all <Icon name="arrow" size={13} /></Link>
        </div>
        {recent.length ? (
          <div className="sidebar-update-list">
            {recent.map(item => (
              <article key={item.slug} className="sidebar-update">
                <div className="sidebar-update-meta"><span>{item.category}</span><time dateTime={item.date}>{displayDate(item.date)}</time></div>
                <h3><Link href={`/updates/${item.slug}/`}>{item.title}</Link></h3>
                <p>{item.summary}</p>
                <Link className="sidebar-read-more" href={`/updates/${item.slug}/`} aria-label={`Read update: ${item.title}`}>Read more <Icon name="arrow" size={13} /></Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="sidebar-empty"><span className="sidebar-empty-mark" aria-hidden="true"><Icon name="news" size={23} /></span><h3>More to come.</h3><p>News, activities, and other updates will appear here as we share them.</p></div>
        )}
      </section>
    </aside>
  );
}
