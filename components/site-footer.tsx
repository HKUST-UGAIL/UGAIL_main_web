import Link from 'next/link';
import { BrandMark, Icon } from './icon';
import type { Site } from '@/lib/types';

export function SiteFooter({ site }: { site: Site }) {
  return <footer className="site-footer">
    <div className="container footer-top">
      <div><Link href="/" className="brand"><BrandMark /><span>{site.name}</span></Link><p className="footer-tagline">{site.tagline}</p></div>
      <div className="footer-links"><span className="eyebrow">Explore</span><Link href="/research/">Research</Link><Link href="/publications/">Publications</Link><Link href="/team/">Our people</Link></div>
      <div className="footer-links"><span className="eyebrow">Stay connected</span><Link href="/updates/">Latest updates</Link><Link href="/join/">Join us</Link><a href={site.githubUrl} target="_blank" rel="noopener noreferrer">GitHub <Icon name="northeast" size={13} /></a></div>
      <p className="footer-note">A question is a good<br />place to begin.<span className="footer-star">✳</span></p>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} {site.name}</span><span>Curiosity. Connection. Discovery.</span><a href="#top">Back to top ↑</a></div>
  </footer>;
}
