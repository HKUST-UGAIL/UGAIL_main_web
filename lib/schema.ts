import type { Content } from './types.ts';
import { z } from 'zod';

const text = z.string().trim().min(1);
const slug = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use a lowercase, hyphenated URL slug');
const url = z.url({ protocol: /^https?$/ });
const image = z.string().regex(/^\/images\/(?:[\w-]+\/)*[\w.-]+$/, 'Images must be local paths under /images/');
const links = z.array(z.strictObject({ label: text, url })).optional();
const contentSchema = z.strictObject({
  site: z.strictObject({ name: text, tagline: text, description: text, about: text, githubUrl: url, contactEmail: z.email().optional() }),
  people: z.array(z.strictObject({ id: slug, name: text, role: text, interests: z.array(text), bio: text.optional(), image: image.optional(), url: url.optional() })),
  research: z.array(z.strictObject({ slug, title: text, summary: text, topics: z.array(text), body: z.array(text), image: image.optional(), featured: z.boolean().optional(), links })),
  publications: z.array(z.strictObject({ id: slug, title: text, authors: z.array(text).min(1), year: z.number().int().min(1900).max(9999), venue: text, paperUrl: url, codeUrl: url.optional(), bibtex: text.optional() })),
  updates: z.array(z.strictObject({ slug, title: text, date: z.iso.date(), category: z.enum(['News', 'Event', 'Article']), summary: text, body: z.array(text), links })),
}).superRefine((content, context) => {
  for (const collection of ['people', 'research', 'publications', 'updates'] as const) {
    const seen = new Set<string>();
    for (const [index, item] of content[collection].entries()) {
      const id = 'slug' in item ? item.slug : item.id;
      if (seen.has(id)) context.addIssue({ code: 'custom', path: [collection, index], message: `Duplicate identifier: ${id}` });
      seen.add(id);
    }
  }
});

export function validateContent(value: unknown): Content {
  return contentSchema.parse(value);
}
