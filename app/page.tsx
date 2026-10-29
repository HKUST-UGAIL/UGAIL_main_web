import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/icon';
import { HomeSidebar } from '@/components/home-sidebar';
import { getContent } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { withBasePath } from '@/lib/paths';

export function generateMetadata() {
  return pageMetadata('Home', getContent().site.description, '/');
}

export default function Home() {
  const { site, updates } = getContent();
  const photo = site.homeImage ?? {
    src: '/images/campus.jpeg',
    alt: 'HKUST campus and its red sundial sculpture',
    caption: 'A view of the HKUST campus.',
  };

  return (
    <div className="container home-layout">
      <div className="home-main">
        <figure className="home-photo">
          <Image
            src={withBasePath(photo.src)}
            alt={photo.alt}
            width={1280}
            height={854}
            priority
            sizes="(max-width: 850px) 100vw, (max-width: 1296px) 70vw, 840px"
          />
          {photo.caption && <figcaption>{photo.caption}</figcaption>}
        </figure>
        <section className="home-introduction" aria-labelledby="home-title">
          <p className="eyebrow">About us</p>
          <h1 id="home-title">{site.aboutHeading ?? `Welcome to ${site.name}.`}</h1>
          <div className="home-introduction-copy">
            {site.about.split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            {!!site.aboutItems?.length && (
              <ul className="home-about-list">
                {site.aboutItems.map(item => (
                  <li key={item.title}>
                    <strong>{item.title}.</strong> {item.description}
                    {item.link && <> <a href={item.link.url}>{item.link.label}</a></>}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="home-introduction-links">
            <Link href="/team/" className="text-link">Meet our team <Icon name="northeast" size={16} /></Link>
            <Link href="/what-we-do/" className="text-link">See what we do <Icon name="northeast" size={16} /></Link>
          </div>
        </section>
      </div>
      <HomeSidebar site={site} updates={updates} />
    </div>
  );
}
