import Link from 'next/link';
import { Icon } from '@/components/icon';

export default function NotFound() {
  return <section className="container not-found"><span className="error-code">404</span><p className="eyebrow">A small detour</p><h1>This path is still unexplored.</h1><p>The page you’re looking for may have moved, or the address may be incomplete.</p><Link href="/" className="button button-dark">Back to home <Icon name="arrow" size={18} /></Link></section>;
}
