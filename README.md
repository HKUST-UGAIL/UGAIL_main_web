# UGAIL

An English public website introducing UGAIL, with team profiles, projects, activities, publications, news, events, and participation information.

Built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4. Pages export to static HTML and can be hosted on GitHub Pages. The visual language follows the local USTLabSpace reference; the information architecture follows the [UIUC Conversational AI Lab](https://uiuc-conversational-ai-lab.github.io/).

## Run locally

Requires Node.js **22.12 or later**.

```bash
npm ci
npm run dev
```

Open **http://127.0.0.1:3000**.

To preview the production static export:

```bash
npm run build
npm run preview
```

`npm run preview` serves the `out/` directory; it does not require a Next.js server or a database. Set `PORT=3001` if port 3000 is already in use.

## Pages and editing

| Page | URL | Content |
| --- | --- | --- |
| Home | `/` | Large image and introduction on the left; X account and latest updates on the right |
| Team | `/team/` | People grouped by role |
| What We Do | `/what-we-do/` | Project/activity filters and detail pages |
| Publications | `/publications/` | Search, year filter, paper/code links, BibTeX |
| Updates | `/updates/` | News, events, articles, and detail pages |
| Join us | `/join/` | Participation information and optional contact email |

Edit `content/site.json`, `people.json`, `initiatives.json`, `publications.json`, and `updates.json`. Add images under `public/images/`. See the [content guide](docs/content-guide.md) for complete examples and field definitions.

At the user’s request, each collection in `content/` currently contains one clearly labeled example: a member, project, publication, and update. Replace these examples with verified information before publishing; `example.org` links are placeholders. Removing the entries (using `[]`) restores the empty states. Automated browser-test fixtures remain isolated in `tests/fixtures/content/` and are never loaded by default.

## Verify

```bash
npm test
npm run lint
npm run build
npm run typecheck
npm run verify:export
npx playwright install chromium
npm run test:e2e
```

Browser tests start their own local server on port 3100 using isolated fixture content, and cover desktop/mobile navigation, clipboard citations, filters, detail pages, 404 responses, and overflow. Production content is not modified. `npm run verify:export` checks local asset and link references in the static HTML/CSS.

With a production preview already running, use `npm run verify:browser` to check production empty states and save desktop/mobile screenshots under `artifacts/screenshots/`. If using port 3001, run `PREVIEW_URL=http://127.0.0.1:3001 npm run verify:browser`. Set `NEXT_PUBLIC_BASE_PATH` to match a project-path build. Screenshots and browser traces are ignored by Git.

## GitHub Pages

The supplied workflow is **manual only**. To publish later, push the code, choose **Settings → Pages → Source: GitHub Actions**, and run **Deploy UGAIL to GitHub Pages** from the Actions tab.

For this project, the expected site URL is `https://hkust-ugail.github.io/UGAIL_main_web/`. The workflow derives the owner and repository name automatically and builds with the appropriate prefix. No deployment has been performed by the local implementation.

To reproduce the project-path build locally:

```bash
NEXT_PUBLIC_BASE_PATH=/UGAIL_main_web NEXT_PUBLIC_SITE_URL=https://hkust-ugail.github.io npm run build
NEXT_PUBLIC_BASE_PATH=/UGAIL_main_web npm run verify:export
NEXT_PUBLIC_BASE_PATH=/UGAIL_main_web npm run preview
```

Open **http://127.0.0.1:3000/UGAIL_main_web/**. The same prefix must be set for the build and preview; it is compiled into the website.

For a custom domain or an `owner.github.io` repository, use an empty `NEXT_PUBLIC_BASE_PATH` in both the build and workflow. Set `NEXT_PUBLIC_SITE_URL` to the actual origin, such as `https://lab.example.org`, without a path. Canonical URLs, sitemap.xml, and robots.txt are generated only when this origin is supplied. If using a custom GitHub Pages domain, configure it in the repository's Pages settings as well.

## Project structure

```text
app/          Pages, metadata, and visual styles
components/   Navigation, collections, cards, and shared UI
content/      Production content (editable JSON)
lib/          Types, validation, filtering, and URL helpers
public/       Local images, font, and other static assets
scripts/      Static preview, export verification, and sitemap generation
tests/        Unit tests and isolated browser-test content
docs/         Content guide, approved design, plan, and verification record
```

The campus image and local Geist font were reused from the supplied USTLabSpace reference project. The campus picture is labeled as an HKUST campus view, not a UGAIL team photo. No external font or image requests are required to render the site.
