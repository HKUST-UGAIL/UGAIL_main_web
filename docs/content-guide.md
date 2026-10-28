# Editing UGAIL content

The website reads JSON files under `content/`. Save a file to see the update in `npm run dev`; rebuild with `npm run build` before publishing static files. All examples below are illustrative; replace them with verified information before using them in production.

## Site introduction

`content/site.json` contains `name`, `tagline`, `description`, `about`, and `githubUrl`. These are required nonempty strings; `githubUrl` must be an HTTP(S) URL. The homepage headline uses the tagline, splitting sentences onto separate lines. The optional `contactEmail` enables the email contact card on Join us. Leave that property absent until a public contact address is confirmed.

## Team

Add records to `content/people.json` in the desired display order. Roles appear in the order first encountered. Missing portraits use initials.

```json
[
  {
    "id": "example-person",
    "name": "Example Person",
    "role": "Researcher",
    "interests": ["Verified research interest"],
    "bio": "A short, verified biography.",
    "image": "/images/people/example-person.jpg",
    "url": "https://example.org/"
  }
]
```

Required: `id`, `name`, `role`, `interests`. Optional: `bio`, `image`, `url`. The `interests` array can be empty.

## Research

Add records to `content/research.json`. A record automatically creates `/research/<slug>/` at build time. Topic buttons are derived from all projects. Set `featured` to `true` to show a project on the homepage (up to three, in file order).

```json
[
  {
    "slug": "example-project",
    "title": "Example project",
    "summary": "A concise, verified project introduction.",
    "topics": ["Research direction"],
    "body": ["First paragraph.", "Second paragraph."],
    "featured": true,
    "image": "/images/projects/example-project.jpg",
    "links": [{ "label": "Project code", "url": "https://example.org/code" }]
  }
]
```

Required: `slug`, `title`, `summary`, `topics`, `body`. Optional: `featured`, `image`, `links`. Paragraphs are plain text, not Markdown or HTML. Missing project images receive a simple graphic, not a generated research figure.

## Publications

Add records to `content/publications.json`. The page sorts by year descending, preserving file order within each year. Search matches title, authors, or venue without case sensitivity; the year filter intersects with the search.

```json
[
  {
    "id": "example-paper",
    "title": "Example paper title",
    "authors": ["Example Author", "Another Author"],
    "year": 2026,
    "venue": "Verified venue name",
    "paperUrl": "https://example.org/paper",
    "codeUrl": "https://example.org/code",
    "bibtex": "@article{example2026,\n  title={Example paper title},\n  year={2026}\n}"
  }
]
```

Required: `id`, `title`, `authors` (at least one), `year` (integer), `venue`, `paperUrl`. Optional: `codeUrl`, `bibtex`. Buttons only appear when their corresponding content exists. BibTeX is expandable and copyable; if clipboard access is unavailable, users can select the citation text directly.

## Updates, events and articles

Add records to `content/updates.json`. A record automatically creates `/updates/<slug>/`. Records sort by date descending. The homepage shows the latest three.

```json
[
  {
    "slug": "example-update",
    "title": "Example update title",
    "date": "2026-10-28",
    "category": "News",
    "summary": "A short introduction.",
    "body": ["A paragraph describing the update."],
    "links": [{ "label": "Read the announcement", "url": "https://example.org/announcement" }]
  }
]
```

Required: `slug`, `title`, `date`, `category`, `summary`, `body`. Optional: `links`. `category` must be exactly `News`, `Event`, or `Article`. Dates must be real calendar dates in `YYYY-MM-DD` format; dates display consistently without browser timezone shifts.

## Images, identifiers and validation

- Put images under `public/images/`, and refer to them as `/images/...`, without a deployment prefix. The site adds its prefix automatically.
- Portraits work best as square images. Project pictures work well near a 5:3 aspect ratio.
- Each `id` or `slug` must be unique within its collection and contain only lowercase letters, numbers, and single hyphens between words.
- Detail-page slugs are one path segment. If a slug changes, the old URL will return 404 unless a separate hosting redirect is configured.
- Every resource URL must use `http://` or `https://`. Executable or malformed links are rejected.
- The build validates every content record. Duplicate identifiers, invalid dates, missing required fields, and misspelled fields cause an explicit build error.
- Use `[]` for an empty collection. Do not add fictional records to fill the layout.

For a local test of the filled layout, use the isolated fixture directory:

```bash
UGAIL_CONTENT_DIR=tests/fixtures/content npm run dev
```

These fixtures are fictional and must not be used for a production deployment. Ordinary builds use `content/` automatically.
