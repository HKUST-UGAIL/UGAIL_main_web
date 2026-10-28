# UGAIL website verification

Date: 2026-10-28 (Asia/Hong_Kong)

## Delivered

English static website with Home, Team, What We Do, Publications, Updates, and Join us. The homepage follows the user's correction: a wide left column with the photo above the introduction, and a narrow right sidebar with the X account card above recent updates. At mobile widths, the main column precedes the sidebar. The X card uses `@your_handle` as requested and does not link to an unconfirmed account.

What We Do replaces Research and offers Projects / Activities filters with independent detail pages. Site content is maintained through validated JSON files. Production collections remain empty until verified content is provided; fictional examples remain isolated in `tests/fixtures/content/`.

The visual design uses deep blue, soft green accents, light surfaces, rounded cards, and local Geist typography from the USTLabSpace reference. Root-path desktop/mobile home screenshots, plus the populated fixture homepage and What We Do desktop screenshots, were visually inspected. Screenshots for all six pages are retained locally under `artifacts/screenshots/` and ignored by Git.

## Evidence for the corrected website

| Check | Result |
| --- | --- |
| `npm test` | 10 passed: filters, deployment prefixes, content validation, duplicate slugs, unsafe URLs, invalid dates |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm run build` | Passed for root production content and project-path fixtures |
| `npm run verify:export` | Root: 9 HTML pages, 304 local asset/link references |
| `NEXT_PUBLIC_BASE_PATH=/UGAIL_main_web npm run verify:export` | Project-path fixtures: 14 HTML pages, 488 local references |
| `npm run test:e2e` | 13 passed; 1 desktop instance of a mobile-only test skipped |
| Independent read-only code review of correction diff | No blocking findings; one outdated content-guide instruction corrected |
| `git diff --check` | Passed |

The homepage layout regression was first run against the old layout and failed because the expected main/sidebar structure was absent. It now verifies photo-before-introduction order, a narrow right sidebar on desktop, vertical stacking on mobile, the configured X link, newest-first updates, and update detail navigation. The What We Do regression verifies Activities and Projects filtering and return navigation from an activity detail page.

The browser suite uses isolated fixtures without modifying production files. It also covers all six pages, overflow, runtime errors, publication search/year intersection, empty results, BibTeX expansion and clipboard contents, update filters and details, mobile Escape/focus/close behavior, and HTTP 404.

## Static browser checks

`scripts/check-preview.mjs` was run against exported files using Chromium with desktop (1440×1000) and mobile (390×844) viewports. It checks six page responses, one main heading, loaded images, horizontal overflow, active navigation, mobile navigation, and proper 404 handling, and saves full-page screenshots.

Verified configurations for this revision:

1. Root path, production content: `PREVIEW_URL=http://127.0.0.1:3001 npm run verify:browser`. Production empty states and fixture exclusion passed at both sizes.
2. `/UGAIL_main_web/`, isolated fixtures: `PREVIEW_URL=http://127.0.0.1:3002 NEXT_PUBLIC_BASE_PATH=/UGAIL_main_web VERIFY_FIXTURES=1 npm run verify:browser`. Both sizes passed, including direct project/update detail requests and publication filtering.

With `NEXT_PUBLIC_SITE_URL=https://hkust-ugail.github.io`, sitemap.xml and robots.txt were inspected and contained the correct project prefix and new What We Do detail routes.

The final output is restored to a root-path build using production content. The local preview uses port 3001 because port 3000 was already occupied. The temporary project-path preview has been stopped.

## Content and deployment state

- Member profiles, projects, activities, papers, updates, and contact email await verified source material. None were fabricated.
- Add `site.xHandle` later to enable the real X account link; edit `site.homeImage` and `site.about` for the homepage.
- Edit `content/initiatives.json` for Projects / Activities and `content/updates.json` for sidebar updates.
- GitHub Pages workflow has a manual trigger. No remote publishing was performed.
- Local work remains on `feat/ugail-website`.
