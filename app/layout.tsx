import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { getContent } from '@/lib/content';
import './globals.css';

const geist = localFont({ src: '../public/fonts/GeistVF.woff', variable: '--font-geist', display: 'swap' });

export function generateMetadata(): Metadata {
  const { site } = getContent();
  return { title: { default: site.name, template: `%s · ${site.name}` }, description: site.description, icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/icon.svg` } };
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const { site } = getContent();
  return <html lang="en" className={geist.variable} data-scroll-behavior="smooth"><body id="top"><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader name={site.name} /><main id="main-content" tabIndex={-1}>{children}</main><SiteFooter site={site} /></body></html>;
}
