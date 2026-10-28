export type LinkItem = { label: string; url: string };
export type Site = {
  name: string;
  tagline: string;
  description: string;
  about: string;
  githubUrl: string;
  contactEmail?: string;
};
export type Person = {
  id: string;
  name: string;
  role: string;
  interests: string[];
  bio?: string;
  image?: string;
  url?: string;
};
export type Research = {
  slug: string;
  title: string;
  summary: string;
  topics: string[];
  body: string[];
  image?: string;
  featured?: boolean;
  links?: LinkItem[];
};
export type Publication = {
  id: string;
  title: string;
  authors: string[];
  year: number;
  venue: string;
  paperUrl: string;
  codeUrl?: string;
  bibtex?: string;
};
export type Update = {
  slug: string;
  title: string;
  date: string;
  category: 'News' | 'Event' | 'Article';
  summary: string;
  body: string[];
  links?: LinkItem[];
};
export type Content = {
  site: Site;
  people: Person[];
  research: Research[];
  publications: Publication[];
  updates: Update[];
};
