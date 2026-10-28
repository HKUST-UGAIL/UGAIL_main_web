import Link from 'next/link';
import { Icon } from './icon';

export function JoinBanner() {
  return <section className="join-banner"><div><p className="eyebrow">There is always a way in.</p><h2>Bring your curiosity.<br />See where it takes you.</h2><p>Get to know UGAIL and find your next point of connection.</p></div><Link href="/join/" className="button button-dark">Explore ways to connect <Icon name="northeast" size={17} /></Link><span className="join-orbit" aria-hidden="true" /></section>;
}
