'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { BrandMark, Icon } from './icon';

const navigation = [
  { href: '/', label: 'Home' },
  { href: '/team/', label: 'Team' },
  { href: '/what-we-do/', label: 'What We Do' },
  { href: '/publications/', label: 'Publications' },
  { href: '/updates/', label: 'Updates' },
];

export function SiteHeader({ name }: { name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    function onEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
    }
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [open]);

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname === href.slice(0, -1) || pathname.startsWith(href);
  }

  return <header className="site-header">
    <div className="container header-inner">
      <Link href="/" className="brand" aria-label={`${name} home`} onClick={() => setOpen(false)}><BrandMark /><span>{name}<span className="brand-caption">Questions worth exploring.</span></span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map(link => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>{link.label}</Link>)}
      </nav>
      <Link href="/join/" className="button button-small header-join" aria-current={isActive('/join/') ? 'page' : undefined}>Join us <Icon name="northeast" size={15} /></Link>
      <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {[...navigation, { href: '/join/', label: 'Join us' }].map(link => <Link key={link.href} href={link.href} aria-current={isActive(link.href) ? 'page' : undefined} onClick={() => setOpen(false)}>{link.label}<Icon name="northeast" size={17} /></Link>)}
    </nav>
  </header>;
}
