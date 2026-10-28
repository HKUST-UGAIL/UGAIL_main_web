import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const prefix = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const failures = [];
let references = 0;
let pages = 0;

async function walk(directory) {
  const files = [];
  for (const item of await readdir(directory, { withFileTypes: true })) {
    const full = path.join(directory, item.name);
    if (item.isDirectory()) files.push(...await walk(full));
    else if (/\.(html|css)$/.test(item.name)) files.push(full);
  }
  return files;
}

for (const file of await walk(root)) {
  const html = file.endsWith('.html');
  if (html) pages++;
  const text = await readFile(file, 'utf8');
  const links = html ? [...text.matchAll(/\b(?:href|src)="([^"<>]+)"/g)].map(match => match[1]) : [...text.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)].map(match => match[1]);
  const sourcePath = `/${path.relative(root, file).split(path.sep).join('/')}`;
  for (const value of links) {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) continue;
    references++;
    const pathname = decodeURIComponent(new URL(value.replaceAll('&amp;', '&'), `https://local.invalid${prefix}${sourcePath}`).pathname);
    if (prefix && !pathname.startsWith(`${prefix}/`)) { failures.push(`${sourcePath}: missing prefix: ${value}`); continue; }
    const relative = prefix ? pathname.slice(prefix.length) : pathname;
    let target = path.resolve(root, `.${relative}`);
    try {
      if ((await stat(target)).isDirectory()) target = path.join(target, 'index.html');
      if (!(await stat(target)).isFile()) throw new Error('Not a file');
    } catch { failures.push(`${sourcePath}: missing file: ${value}`); }
  }
}
if (failures.length) { console.error(failures.join('\n')); process.exitCode = 1; }
else console.log(`Verified ${pages} HTML pages and ${references} local asset/link references at ${prefix || '/'}.`);
