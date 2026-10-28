import { readFileSync } from 'node:fs';
import path from 'node:path';
import { cache } from 'react';
import { validateContent } from './schema';

// Only import this loader in Server Components. Client components receive data as props.
export const getContent = cache(() => {
  const directory = path.resolve(process.cwd(), process.env.UGAIL_CONTENT_DIR || 'content');
  const data = Object.fromEntries(['site', 'people', 'research', 'publications', 'updates'].map(name => [
    name, JSON.parse(readFileSync(path.join(directory, `${name}.json`), 'utf8')),
  ]));
  return validateContent(data);
});
