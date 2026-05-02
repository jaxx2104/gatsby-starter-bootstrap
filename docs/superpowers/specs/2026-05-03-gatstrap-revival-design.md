# Gatstrap Revival Design

- Date: 2026-05-03
- Author: jaxx2104
- Status: Draft
- Repo: `jaxx2104/gatsby-starter-bootstrap`

## Background

`gatsby-starter-bootstrap` (Gatstrap) was created in 2016 and earned 278 stars,
peaking in 2018–2019 during the Gatsby v2 / Bootstrap 4 era. The codebase has
since been frozen at Gatsby 3 / React 17 / Bootstrap 4 with jQuery and popper,
and the only commits since 2021 have been Renovate dependency bumps. New stars
have effectively dried up (1–2 per year for the last three years).

The starter is now incompatible with the current Gatsby major version, ships
two competing icon libraries, depends on jQuery and popper that Bootstrap 5 has
since dropped, and uses `gatsby-image` which has been replaced by
`gatsby-plugin-image`. The README still references Gatsby v0/v1/v2 paths and
the dead `david-dm` badge.

## Goal

Revive Gatstrap as a working, modern Gatsby starter and submit it to the
official **Gatsby Community Starters Library** as a milestone for completion.

## Why this is worth doing

The Gatsby Starter Library currently has no actively-maintained Bootstrap 5
starter. The submission criteria explicitly state preference for
"functionality not covered by existing starters," and Bootstrap remains a
high-traffic search keyword. Combined with the existing 278-star SEO and
backlink footprint at this repository name, modernizing in place is more
valuable than starting over.

## Acceptance Criteria

The work is complete when **all** of the following hold:

1. The repository satisfies every minimum requirement of the Gatsby Community
   Starters Library:
   - Latest major version of Gatsby (v5).
   - Builds without error.
   - Public demo deployed.
   - Demonstrates accessibility best practices (color contrast, visible
     keyboard focus, image alt text, form labels).
   - Demonstrates performance best practices.
   - README documents installation and contribution.
2. Lighthouse mobile scores are 95+ on all four categories (Performance,
   Accessibility, Best Practices, SEO), enforced in CI.
3. `gatsby new gatstrap https://github.com/jaxx2104/gatsby-starter-bootstrap`
   produces a working site on a clean Node 20 environment with no manual fixes.
4. `yarn develop` and `yarn build` complete with zero warnings.
5. The dependency tree contains no `jquery`, `popper.js`, or `font-awesome@4`.
6. A submission to the Gatsby Starters Library form has been sent.

## Non-Goals

- Switching off Gatsby (Astro / Next.js migration is explicitly out of scope).
- Adding a component catalog, Storybook, dark-mode toggle, OG-image generation,
  search, tag pages, or other features beyond what minimum library acceptance
  requires.
- Backwards compatibility with Gatstrap v3. This is a 4.0.0 major release.
- Refactors unrelated to the modernization path.

## Architecture

### Stack

| Layer        | Choice                                              |
| ------------ | --------------------------------------------------- |
| SSG          | Gatsby 5.16+                                        |
| UI           | React 19 (supported by Gatsby 5.16)                 |
| Language     | TypeScript 5.x with `strict: true`                  |
| CSS          | Bootstrap 5.3 + Dart Sass (no jQuery, no popper)    |
| Images       | `gatsby-plugin-image` (`StaticImage` / `GatsbyImage`) |
| Markdown     | `gatsby-transformer-remark` and existing remark plugins |
| Type codegen | `gatsby-plugin-graphql-codegen`                     |
| Icons        | `@fortawesome/*` only (`font-awesome@4` removed)    |
| Lint/Format  | ESLint 9 (flat config), Prettier 3                  |
| Git hooks    | husky + lint-staged                                 |
| Node         | 20 LTS                                              |
| CI           | GitHub Actions (CircleCI removed)                   |
| Hosting      | Netlify                                             |
| License      | 0BSD (Gatsby's recommended license; was MIT)        |

### Source layout

```
src/
  components/        # Header, Footer, PostCard, Pagination, ...
  bootstrap/         # NEW: thin React wrappers for Bootstrap 5 interactive parts
    Navbar.tsx
    Dropdown.tsx
  templates/         # post.tsx, page.tsx
  pages/             # index.tsx, 404.tsx, about.tsx
  scss/
    gatstrap.scss    # Bootstrap entrypoint with variable overrides
    _variables.scss  # theme variables only
  hooks/             # useSiteMetadata, ...
content/
  blog/              # English starter posts: welcome, customization, markdown showcase
```

### Key design choices

- **`src/bootstrap/`** is the place where "Bootstrap 5 used idiomatically from
  React" lives. Only interactive parts that Bootstrap originally implemented
  with jQuery (Navbar collapse, Dropdown) are wrapped here. Static layout
  primitives stay as Bootstrap class names; no React wrappers around things
  that don't need state.
- **`gatsby-config.js` becomes `gatsby-config.ts`**, and all configurable
  fields are moved into `siteMetadata` so a forking user has one obvious place
  to edit.
- **No CSS-in-JS.** Sass is the only styling mechanism. The starter's value
  proposition is "Bootstrap 5 used as-is in React"; introducing a second
  styling system contradicts that.
- **Gatsby's built-in `<Head>` API** replaces `react-helmet`, which would
  otherwise emit warnings under React 19. `react-helmet-async` is the fallback
  if any page-level metadata pattern proves hard to express in `<Head>`.

### Dependencies removed

- `jquery`, `popper.js` — Bootstrap 5 has no jQuery dependency.
- `font-awesome@4.7` — duplicates `@fortawesome/*`.
- `emergence.js` — replaced by `IntersectionObserver` if scroll-triggered
  animation is still wanted; otherwise dropped.
- `animate.css` — replaced by hand-written CSS only where actually used.
- `gatsby-plugin-typegen` — replaced by `gatsby-plugin-graphql-codegen`.

## Implementation Phases

The implementation is organized into four phases plus submission. Each phase
has an explicit exit gate that must pass before moving on.

### Phase 0 — Cleanup (≈ half day)

- Delete the duplicate `* 2` files at the project root (untracked iCloud
  artifacts).
- Wipe `.cache/` and `public/`.
- Confirm whether the current build still runs; record the result.
- Branch off `origin/master` after `git fetch -p origin`.

### Phase 1 — Foundation modernization (1–2 days)

Goal: bring the project up to Gatsby 5.16+ / React 19 / Node 20 / TS strict
while preserving the existing visual design as much as possible.

- Set `.node-version` to 20.
- Upgrade Gatsby and related plugins to v5 in `package.json`.
- Upgrade React to 19 and TypeScript to 5.x.
- Drop `jquery`, `popper.js`, `font-awesome@4`, `emergence.js`, `animate.css`.
- Convert `gatsby-config.js` to `gatsby-config.ts` and consolidate
  `siteMetadata`.
- Replace `gatsby-plugin-typegen` with `gatsby-plugin-graphql-codegen`.
- Migrate every `gatsby-image` usage to `gatsby-plugin-image`.
- Replace `react-helmet` with Gatsby's built-in `<Head>` API (preferred,
  available since 4.19), falling back to `react-helmet-async` only if any
  page-level metadata pattern is hard to express in the `<Head>` API.
- Enable `strict: true` in `tsconfig.json` and fix the resulting type errors.
- Move to ESLint 9 flat config and Prettier 3.
- Replace CircleCI with a GitHub Actions workflow that runs build, lint, and
  typecheck.

**Exit gate:** `yarn develop` and `yarn build` finish with zero warnings.

### Phase 2 — Bootstrap 5 migration (2–3 days)

Goal: complete the "Bootstrap 5 used idiomatically from React" reference.

- Add `bootstrap@5.3` and rewrite the SCSS entrypoint against the Bootstrap 5
  Sass API.
- Port theme variable overrides from Bootstrap 4 to Bootstrap 5 names.
- Implement `src/bootstrap/Navbar.tsx` and `src/bootstrap/Dropdown.tsx` as thin
  React wrappers that handle only the collapse / open state.
- Rewrite `Navi` / `Footer` and other components against Bootstrap 5 classes.
- Consolidate icons on `@fortawesome/*` and remove `font-awesome@4`.

**Exit gate:** the top page, a post template page, an about page, and the 404
page render correctly under Bootstrap 5 with no broken layouts and no console
errors. Visual differences from the v3 design are acceptable when they are a
direct consequence of Bootstrap 5 defaults.

### Phase 3 — Library acceptance criteria (2–3 days)

Goal: meet every requirement in the submission rubric and reach Lighthouse 95+.

- **Accessibility**:
  - Audit theme variables for contrast.
  - Restore visible `:focus-visible` indicators.
  - Add meaningful `alt` text (or `alt=""` for purely decorative imagery).
  - Add `<label>` associations on the demo form fields.
  - Add an `axe-core` automated check to CI.
- **Performance**:
  - Add Lighthouse CI to the GitHub Actions workflow with mobile profile and a
    95+ threshold on all four categories.
  - Trim unnecessary JS, verify image optimization output, and confirm
    `gatsby-plugin-offline` does not regress Best Practices.
- **Demo content**:
  - Replace the existing mixed-language posts with three or four English
    starter posts (`welcome`, `customization`, `markdown-showcase`).
  - Produce one OG image suitable for the README hero.
- **README rewrite (English)**:
  - Hero screenshot, features list, quick start, configuration, customization
    examples, and a contribution guide.
  - Remove the "v0/v1/v2" branch references, the `david-dm` badge, and the
    CircleCI badge.
- **License**: replace `LICENSE` with 0BSD and update `package.json`.
- **Demo deploy**: republish the Netlify demo and update the README link to
  the current `.netlify.app` URL.

**Exit gate:** Lighthouse CI is green, accessibility checks are green, and
`gatsby new gatstrap https://github.com/jaxx2104/gatsby-starter-bootstrap` on a
clean Node 20 machine produces a runnable site.

### Phase 4 — Release and submission (≈ half day)

- Bump `package.json` to `4.0.0` and add a CHANGELOG entry describing the
  break.
- Tag and create a GitHub release for v4.0.0.
- Update the repository description and topics
  (`gatsby-starter`, `bootstrap-5`, `typescript`, `blog-template`).
- Submit the form at https://www.gatsbyjs.com/starters/submissions/.
- Record the submission timestamp and reviewer-visible content under
  `docs/superpowers/specs/`.

## Risks

- **Bootstrap 4 → 5 SCSS port** is the highest-effort step. Phase 2 may exceed
  its estimate; if it does, the design priorities are correct theme variables
  and a clean SCSS entrypoint over visual parity with the v3 design.
- **Lighthouse 95+** can be blocked by `gatsby-plugin-offline`'s Service
  Worker. If Best Practices stays below 95 after tuning, drop the plugin
  rather than fail acceptance.
- **`<Head>` API adoption** assumes the existing per-page metadata can be
  expressed in Gatsby's `<Head>` exports. If the demo posts need anything the
  `<Head>` API does not support, Phase 1 falls back to `react-helmet-async`
  and that decision is recorded.

## Out-of-scope follow-ups

These are deliberately deferred and may be considered after submission:

- Storybook / Ladle component catalog.
- Dark / light theme toggle.
- OG image auto-generation.
- Tag and category pages.
- Site search.
- A Tailwind variant.
