# Changelog

## 4.0.0 — 2026-05-03

### Breaking

- Upgraded to Gatsby 5.16+, React 19, Bootstrap 5.3, TypeScript 5 (strict).
- Replaced `react-helmet` with the Gatsby `<Head>` API.
- Replaced `gatsby-image` with `gatsby-plugin-image`.
- Replaced `gatsby-plugin-typegen` with Gatsby's built-in `graphqlTypegen` (emits `Queries.*` types into `src/gatsby-types.d.ts`).
- Removed `jquery`, `popper.js`, `font-awesome@4`, `emergence.js`, `animate.css`.
- Removed the AdSense component.
- License changed from MIT to **0BSD**.

### Added

- `src/bootstrap/` — small React wrappers for Bootstrap 5 interactive parts.
- `useSiteMetadata` hook.
- GitHub Actions CI and Lighthouse CI workflow with 95+ thresholds.
- Three English starter posts.
