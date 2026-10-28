export function normalizeBasePath(base: string): string {
  const normalized = base.replace(/\/+$/, '');
  if (normalized && !/^\/(?:[a-zA-Z0-9_-]+)(?:\/[a-zA-Z0-9_-]+)*$/.test(normalized)) {
    throw new Error('NEXT_PUBLIC_BASE_PATH must be empty or an absolute path such as /UGAIL_main_web');
  }
  return normalized;
}
export function withBasePath(path: string, base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;
  return `${normalizeBasePath(base)}/${path.replace(/^\/+/, '')}`;
}
