# Editing UGAIL content

The website reads JSON files under `content/`. Save a file and refresh the page in `npm run dev` to see the update; rebuild with `npm run build` before publishing static files. All examples below are illustrative; replace them with verified information before using them in production.

## Site introduction

`content/site.json` contains `name`, `tagline`, `description`, `about`, and `githubUrl`. These are required nonempty strings; `githubUrl` must be an HTTP(S) URL. The homepage headline welcomes visitors using `name`; the footer shows `tagline` beneath the brand. The optional `contactEmail` enables the email contact card on Join us. Leave that property absent until a public contact address is confirmed.

## Homepage layout, image and X account

The homepage uses a wide left column and a compact right sidebar on desktop. The left column displays the image followed by the introduction; the sidebar displays the X account card and up to six updates in descending date order. Mobile displays the main column first, followed by the sidebar.

Edit `site.about` for the introduction. Separate paragraphs with `\n\n` inside the JSON string. The optional `homeImage` object controls the homepage photograph:

```json
"homeImage": {
  "src": "/images/campus.jpeg",
  "alt": "An accurate description of the image",
  "caption": "An optional caption."
}
```

For the X card, add `"xHandle": "your_username"` to `content/site.json` when the account is confirmed (without `@` or a URL). Until then, leave the field absent: the card displays `@your_handle` as a placeholder and does not link to an unconfirmed account. New updates in `content/updates.json` automatically appear below this card; these are maintained website updates, not an embedded live X feed.

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

## What We Do: projects and activities

Add records to `content/initiatives.json`. A record automatically creates `/what-we-do/<slug>/` at build time. Set `category` to `Project` or `Activity`; the page offers separate filters for each. Use projects for things you build or develop, and activities for workshops, reading groups, meetups, and other shared experiences.

```json
[
  {
    "slug": "example-project",
    "title": "Example project",
    "summary": "A concise, verified project introduction.",
    "category": "Project",
    "topics": ["Topic or theme"],
    "body": ["First paragraph.", "Second paragraph."],
    "image": "/images/projects/example-project.jpg",
    "links": [{ "label": "Project code", "url": "https://example.org/code" }]
  }
]
```

Required: `slug`, `title`, `summary`, `category`, `topics`, `body`. Optional: `image`, `links`. Paragraphs are plain text, not Markdown or HTML. Missing project images receive a simple graphic, not a photograph of an actual project.

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

Add records to `content/updates.json`. A record automatically creates `/updates/<slug>/`. Records sort by date descending. The homepage sidebar shows the latest six.

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
