# CLAUDE.md

Project-specific guidance for Claude / agents working on `gatsby-starter-bootstrap`. Generic preferences (branching, ast-grep over prompt rules, mise, English commit messages on public repos) live in the user's global config and are not duplicated here.

## Stack & runtime

- Gatsby 5 + React 19 + TypeScript 6 (`strict`, `noUncheckedIndexedAccess`).
- Node `22` is pinned via `mise.toml` (and mirrored in `.node-version` for `actions/setup-node`).
- Package manager is `pnpm@9.15.9` (locked through the `packageManager` field in `package.json`). Do not run `npm` or `yarn` against this repo.

## Deployment

- Hosted on **Cloudflare Pages**. Build command is `pnpm build`; published directory is `./public` (`wrangler.toml`).
- Production URL: `https://gatstrap.pages.dev`. Update `siteMetadata.siteUrl` in `gatsby-config.ts` when this changes.

## Styling

- Bootstrap 5 + Sass. Variable overrides live in `src/scss/gatstrap.scss` using the `@use` API (modern Sass compiler is enabled in `gatsby-node.ts` via `api: 'modern-compiler'`).
- **Do not load Bootstrap JS, jQuery, or popper as a global side-effect.** Anything that needs Bootstrap JS must go through the dedicated wrappers under `src/bootstrap/*` so the script only ships when the feature is actually used. There is intentionally no `gatsby-browser.js` for global imports.

## Metadata

- Use Gatsby 5's **Head API** (`export const Head` per page/template). `gatsby-plugin-react-helmet` is not installed and should not be added.
- `src/components/meta/meta.tsx` is the canonical Head implementation (OGP / Twitter card). Reuse it instead of writing inline `<meta>` tags.

## GraphQL types

- `graphqlTypegen` is enabled in `gatsby-config.ts`; types are emitted to `src/gatsby-types.d.ts` on build.
- Prefer the auto-generated `Queries.*` namespace over hand-rolled query interfaces.
- The generated file is excluded from Biome (`!src/gatsby-types.d.ts` in `biome.json`); do not lint or hand-edit it.

## Path aliases

`components/*`, `templates/*`, and `scss/*` are configured in two places that must stay in sync:

- `tsconfig.json` `compilerOptions.paths` (for type-checking and editor resolution)
- `gatsby-node.ts` `onCreateWebpackConfig` `resolve.alias` (for runtime resolution)

When adding a new alias, update both.

## Quality gates

- Lint/format is **Biome 2.4 only**. Do not introduce ESLint or Prettier. Use `pnpm lint:fix` for auto-fix; CI runs `pnpm ci:lint`.
- Markdown content in `content/` is linted with textlint + Japanese preset (`pnpm lint:text`).
- `pnpm typecheck` runs `tsc --noEmit` with the strict config above.
- Lighthouse CI (`lighthouserc.json`) asserts **>=0.95** on performance / accessibility / best-practices / SEO across `index`, `welcome`, and `profile`. Any change that risks regressing these scores needs verification before merge.
- pre-commit runs `biome check --write` on staged `*.{ts,tsx,js,mjs,json}` via Husky + lint-staged.

## Dependencies

- Updates are managed by **Dependabot** (`.github/dependabot.yml`, weekly, minor/patch grouped). Renovate is intentionally not used.
- Security pins live in `package.json` `pnpm.overrides`; React 19 peer-dep allowances live in `pnpm.peerDependencyRules`. Add new entries there rather than pinning at the top level.

## Tests

- No test framework is currently installed. If tests are introduced, update this file with the framework, run command, and CI integration.
