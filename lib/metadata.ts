import type { Metadata } from 'next';
import { getContent } from './content';
import { withBasePath } from './paths';

export function pageMetadata(title: string, description: string, pathname: string): Metadata {
  const { site } = getContent();
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  const canonical = origin ? new URL(withBasePath(pathname), origin).href : undefined;
  return {
    title, description,
    ...(canonical ? { alternates: { canonical } } : {}),
    openGraph: {
      title: `${title} · ${site.name}`, description, siteName: site.name, type: 'website', locale: 'en_US',
      ...(canonical ? { url: canonical, images: [{ url: new URL(withBasePath('/images/campus.jpeg'), origin).href, alt: 'A view of the HKUST campus' }] } : {}),
    },
    twitter: { card: 'summary_large_image', title: `${title} · ${site.name}`, description },
  };
}

