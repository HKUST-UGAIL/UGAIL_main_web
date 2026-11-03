# Publication preview implementation plan

**Goal:** Replace the example publication with the three user-supplied papers, using the reference image's figure-and-details layout. Keep all changes local.

**Architecture:** Continue using validated JSON and the existing client-side explorer. Add optional figure, month, summary, and paper-label fields; derive highlighted authors from the Team collection. Keep static export and base-path handling.

1. Add a browser regression covering the figure, venue/date, team authors, summary, resource link, and responsive column placement. Run it before implementation to confirm failure.
2. Extend `lib/types.ts` and `lib/schema.ts`; update `components/publication-explorer.tsx`, `app/publications/page.tsx`, and publication rules in `app/globals.css`. Preserve filters and BibTeX interactions and support entries without optional fields.
3. Crop the two ACL overview figures from their source PDFs and save the arXiv overview SVG under `public/images/publications/`. Replace `content/publications.json` using source titles, full author lists, dates, links, citations, and summaries based on abstracts. Document figure sources and content fields.
4. Run lint, unit tests, browser tests, production build, and export validation. Inspect desktop/mobile screenshots of the actual publication data. Leave a local preview running without committing, pushing, or deploying.

## Verification

Completed locally: lint, 10 unit tests, 15 browser tests (one desktop-only skip for the mobile menu), production build, and validation of 11 exported HTML pages. Actual-content desktop/mobile browser checks confirmed all three figures load, publication counts match the JSON, and pages have no horizontal overflow or browser errors. Screenshots were visually inspected under `artifacts/screenshots/root/`. Preview: http://127.0.0.1:3001/publications/. No commit, push, or deployment was performed.
