import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = process.env.NEXT_PUBLIC_SITE_URL;
if (origin) {
  const site = new URL(origin);
  if (!['https:', 'http:'].includes(site.protocol) || site.pathname !== '/' || site.search || site.hash) throw new Error('NEXT_PUBLIC_SITE_URL must be an origin, for example https://lab.example.org');
  const prefix = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
  const directory = path.resolve(process.env.UGAIL_CONTENT_DIR || 'content');
  const research = JSON.parse(await readFile(path.join(directory, 'research.json'), 'utf8'));
  const updates = JSON.parse(await readFile(path.join(directory, 'updates.json'), 'utf8'));
  const routes = ['/', '/team/', '/research/', '/publications/', '/updates/', '/join/', ...research.map(item => `/research/${item.slug}/`), ...updates.map(item => `/updates/${item.slug}/`)];
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${escape(new URL(`${prefix}${route}`, origin).href)}</loc></url>`).join('\n')}\n</urlset>\n`;
  await writeFile('out/sitemap.xml', xml);
  await writeFile('out/robots.txt', `User-agent: *\nAllow: ${prefix}/\nSitemap: ${new URL(`${prefix}/sitemap.xml`, origin).href}\n`);
  console.log('Generated sitemap.xml and robots.txt for the configured site URL.');
}
