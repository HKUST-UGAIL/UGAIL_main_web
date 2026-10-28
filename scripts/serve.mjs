import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const prefix = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
const port = Number(process.env.PORT || 3000);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.jpeg': 'image/jpeg', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff': 'font/woff', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml; charset=utf-8', '.ico': 'image/x-icon' };

const server = createServer(async (request, response) => {
  if (!['GET', 'HEAD'].includes(request.method)) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); response.end('Invalid URL'); return; }
  if (prefix && pathname !== prefix && !pathname.startsWith(`${prefix}/`)) { response.writeHead(404); response.end('Not found'); return; }
  const relative = prefix ? pathname.slice(prefix.length) : pathname;
  let filename = path.resolve(root, `.${relative || '/'}`);
  if (filename !== root && !filename.startsWith(`${root}${path.sep}`)) { response.writeHead(404); response.end('Not found'); return; }
  let status = 200;
  try {
    if ((await stat(filename)).isDirectory()) {
      if (!pathname.endsWith('/')) { response.writeHead(308, { Location: `${pathname}/${new URL(request.url, 'http://localhost').search}` }); response.end(); return; }
      filename = path.join(filename, 'index.html');
    }
    if (!(await stat(filename)).isFile()) throw new Error('Not a file');
  } catch { filename = path.join(root, '404.html'); status = 404; }
  try {
    const info = await stat(filename);
    response.writeHead(status, { 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream', 'Content-Length': info.size, 'Cache-Control': 'no-store' });
    if (request.method === 'HEAD') response.end();
    else createReadStream(filename).on('error', () => response.destroy()).pipe(response);
  } catch { response.writeHead(404); response.end('Run npm run build before starting the preview.'); }
});
server.listen(port, '127.0.0.1', () => console.log(`UGAIL preview: http://127.0.0.1:${port}${prefix}/`));
