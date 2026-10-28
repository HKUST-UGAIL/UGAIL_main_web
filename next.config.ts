import type { NextConfig } from 'next';
import { normalizeBasePath } from './lib/paths';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH ?? ''),
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
