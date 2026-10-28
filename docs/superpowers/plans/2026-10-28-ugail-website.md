# UGAIL Website Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement the integrated site in this session, with verification at each step. Steps use checkbox syntax for tracking.

**Goal:** Build an English public UGAIL website with the reference lab's information structure and USTLabSpace's visual language.

**Architecture:** Next.js App Router with static export, typed JSON content, and small client components for navigation and filtering. Optional catch-all research/update routes enumerate their index plus content slugs so empty collections remain valid static builds. Site URLs and asset URLs share a configurable deployment prefix.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, ESLint, Node test runner, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-28-ugail-website-design.md`

## Global Constraints

- English navigation, copy, controls, and empty states.
- Do not invent names, identities, publications, statistics, research directions, or contact addresses.
- Deep blue `#003c71`, hero `#0c2e45`, text `#10233f`, background `#f7f9fc`, and 18px cards.
- Data stays separate from components; fixtures never ship as production records.
- Static export works at root and `/UGAIL_main_web/`; no runtime server or image optimizer required.
- No remote publication in this implementation.

## File map

- `app/`: layout, home, team, publications, join, 404; research and updates optional catch-all pages.
- `components/`: shared navigation/footer, icons, page heading, empty state, collections and publication explorer.
- `content/*.json`, `lib/types.ts`, `lib/content.ts`: editable, validated content and server-only loader.
- `lib/paths.ts`, `lib/filter.ts`: deployment-prefix handling and independently testable filters.
- `tests/unit/`, `tests/fixtures/content/`, `tests/e2e/`: unit and isolated browser fixtures.
- `scripts/serve.mjs`, `scripts/verify-export.mjs`: static preview and exported-link checks.
- `.github/workflows/pages.yml`: manually triggered GitHub Pages build/deploy configuration.
- `README.md`, `docs/content-guide.md`: run, edit, verify, and deployment instructions.

### Task 1: Foundation, content and path contracts

**Files:** package/config files, `lib/{types,content,paths,filter}.ts`, `content/*.json`, `tests/unit/*.test.ts`.

**Interfaces:** `withBasePath(path: string): string`; `filterPublications(items, query, year)`; `filterResearch(items, topic)`; `filterUpdates(items, category)`; `getContent()` returns typed site, people, research, publications, updates.

- [ ] Install exact stable dependencies; configure static export and lint/typecheck/test scripts.
- [ ] Write tests for search across title/author/venue, combined year filtering, category/topic filtering, preserved external links, and root/subpath URL behavior.
- [ ] Run tests to observe missing behavior; implement filters and URL handling, then rerun.
- [ ] Add typed editable JSON collections with empty production records and isolated realistic test fixtures.

Test example:

```ts
assert.deepEqual(filterPublications(publications, 'rivera', '2025').map(p => p.id), ['dialogue']);
assert.equal(withBasePath('/team/'), '/UGAIL_main_web/team/');
```

### Task 2: Complete responsive public website

**Files:** `app/**`, `components/**`, `public/images/campus.jpeg`, `tests/e2e/site.spec.ts`.

**Interfaces:** Page components consume `getContent()` server-side; client explorers receive serializable typed collections. Index/detail routes enumerate `{slug: []}` plus each content slug. Internal links use Next Link; ordinary asset URLs use `withBasePath()`.

- [ ] Add browser tests for usable navigation, mobile Escape behavior, fixture search/filtering, detail links, and BibTeX.
- [ ] Observe expected missing-page failures before building the UI.
- [ ] Implement shared accessible navigation/footer, deep blue campus hero, homepage sections and all six pages.
- [ ] Add research/update detail rendering, real empty states, optional contact links and 404.
- [ ] Add responsive design, focus states, reduced-motion support, local campus image and page metadata.
- [ ] Run browser tests against fixture content, inspect desktop/mobile screenshots, and correct any visual defects.

Browser behavior example:

```ts
await page.getByRole('searchbox', { name: 'Search publications' }).fill('Rivera');
await expect(page.getByRole('article')).toHaveCount(1);
await page.getByRole('button', { name: 'Show BibTeX' }).click();
await expect(page.getByText('@article{dialogue2025', { exact: false })).toBeVisible();
```

### Task 3: Static hosting, documentation and final verification

**Files:** preview/export scripts, Pages workflow, README, content guide, verification report.

**Interfaces:** `NEXT_PUBLIC_BASE_PATH` controls the deployment prefix; optional `NEXT_PUBLIC_SITE_URL` controls canonical/social/sitemap origin; `UGAIL_CONTENT_DIR` is an isolated test-only input directory.

- [ ] Add safe static preview server with correct MIME types, index routing and 404 status.
- [ ] Add export checker for all local href/src references, including subpath handling.
- [ ] Add manual-only Pages workflow using the repository name as prefix; document root/custom-domain configuration.
- [ ] Run unit tests, ESLint, typecheck and root production build.
- [ ] Inspect production pages and empty states; build and verify the repository subpath; test direct detail-page requests with fixtures.
- [ ] Restore a production-content root build, write verification evidence, and leave a usable local preview.

## Progress

- Plan and spec reviewed together: all requested pages, interactions, content boundaries, accessibility and static deployment checks are mapped above.
- Execution is inline because route construction, content validation, and page rendering share tightly coupled interfaces in a new repository.
