# UGAIL website verification

Date: 2026-10-28 (Asia/Hong_Kong)

## Delivered

English static website with Home, Team, Research, Publications, Updates, and Join us; responsive navigation; project and update details; research/category filters; publication search, year filter, and expandable/copyable BibTeX. Production content collections start empty and display intentional empty states. All content is maintained through validated JSON files.

Visual structure follows the supplied USTLabSpace theme: deep blue, a campus hero, soft green accents, light surfaces, rounded cards, and local Geist typography. The homepage, publications, and Join us desktop/mobile screenshots were visually inspected. Generated screenshots for all six pages are retained locally under `artifacts/screenshots/` and ignored by Git.

## Evidence

| Check | Result |
| --- | --- |
| `npm test` | 10 tests passed: filters, deployment prefixes, validation, duplicate slugs, unsafe URLs, invalid dates |
| `npm run lint` | Passed, no lint findings |
| `npm run typecheck` | Passed |
| `npm run build` | Passed; production content exports six public sections plus framework 404/icon outputs |
| `npm run verify:export` | 9 HTML files, 311 local asset/link references verified at root |
| `npm run test:e2e` | 11 passed; 1 desktop instance of a mobile-only test skipped |
| `npm ci --ignore-scripts --dry-run` | Lockfile resolves without dependency-constraint conflicts |
| Independent read-only code review | No Critical, Important, or Minor findings in implementation commit `68b1ef9` |

The browser suite exercises the real website using `tests/fixtures/content/`, without modifying production files. It covers all six pages, overflow, runtime errors, publication search/year intersection, empty results, BibTeX expansion and clipboard contents, topic/category filters, detail navigation, mobile Escape/focus/close behavior, and HTTP 404.

## Production browser checks

`scripts/check-preview.mjs` was run against actual exported files using Chromium with desktop (1440×1000) and mobile (390×844) viewports. It checks six page responses, one main heading, loaded images, horizontal overflow, active navigation, fixture exclusion, production empty states, mobile navigation, and proper 404 handling. It saves full-page screenshots.

Verified configurations:

1. Root path, production data: `PREVIEW_URL=http://127.0.0.1:3001 npm run verify:browser`.
2. `/UGAIL_main_web/`, isolated fixture data: 13 HTML files and 460 local references; both browser viewports passed; direct research/update detail requests passed.
3. `/UGAIL_main_web/`, production data: 9 HTML files and 311 local references; both viewports and fixture-exclusion checks passed.

For the fixture project-path export, additional browser actions verified homepage → research → topic filter → project detail → research index transitions and the detail canonical URL. With `NEXT_PUBLIC_SITE_URL=https://hkust-ugail.github.io`, sitemap.xml and robots.txt contained the correct project prefix and all available detail routes.

The final output is restored to a root-path build using production content. The local preview uses port 3001 because port 3000 was already occupied.

## Content and deployment state

- Member profiles, specific research directions/projects, papers, updates, and contact email await verified source material. None were fabricated.
- Fictional fixtures remain isolated from production; the final build uses `content/`.
- GitHub Pages workflow is supplied with a manual trigger. Publishing remains a separate user action.
- The local work is kept on `feat/ugail-website`.
