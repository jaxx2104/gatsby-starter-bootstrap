# S3: Sass Modern API Migration — Design

Status: draft
Owner: jaxx2104
Date: 2026-05-04
Scope tag: S3
Stacked on: PR #684 (biome migration); branch `sass-modern-api` from `biome-migration`

## 1. Goal

Migrate the SCSS build off `gatsby-plugin-sass` so the project no longer
depends on Sass's legacy JS API. Remove the
`silenceDeprecations: ['legacy-js-api']` workaround, drop one Gatsby plugin,
and pick up minor bumps (`bootstrap`, `sass`) that ride along naturally.

## 2. Success Criteria

- `gatsby-plugin-sass` removed from `package.json`.
- `silenceDeprecations: ['legacy-js-api']` removed from `gatsby-config.ts`.
- A SCSS webpack rule lives in `gatsby-node.ts onCreateWebpackConfig`,
  configured with `sass-loader` 16's modern compiler API
  (`api: 'modern-compiler'`).
- `yarn build` completes with no `legacy-js-api` Sass deprecation warnings
  surfacing from project SCSS. Bootstrap-internal deprecations remain
  suppressed via `quietDeps: true`.
- `yarn develop` serves the site with SCSS HMR working.
- Lighthouse CI thresholds (≥ 0.95 across performance, accessibility,
  best-practices, SEO) continue to pass.
- `bootstrap` bumped to ^5.3.8 and `sass` bumped to ^1.99.

## 3. Scope

### In scope

- Remove `gatsby-plugin-sass` from `gatsby-config.ts` plugins and from
  `package.json` `dependencies`.
- Add `sass-loader@^16` to `package.json` `devDependencies`.
- Move `sass` from `dependencies` to `devDependencies` and bump to `^1.99`.
- Bump `bootstrap` to `^5.3.8` (still in `dependencies`).
- Add SCSS module rule in `gatsby-node.ts onCreateWebpackConfig`, splitting
  on `stage` for dev (HMR via `style-loader`) vs production (CSS extraction
  via `mini-css-extract-plugin`, which Gatsby 5 already uses for its own
  stylesheets).
- Verify locally with `yarn develop`, `yarn build`, and a clean HMR check on
  a SCSS edit.

### Out of scope / explicit non-goals

- **SCSS file refactoring**: contents of `src/scss/*.scss` and the per-component
  `style.scss` files stay byte-identical. Their `@use` syntax is already modern
  and does not require changes.
- **Bootstrap major upgrade**: stay on the 5.3 line.
- **CSS-in-JS migration**: not entertained.
- **Pre-compile-then-import workflow** (the rejected alternative B): not
  pursued because it loses HMR.
- **Touching `prismjs/themes/prism.css` or `modern-normalize/modern-normalize.css`**:
  these are already plain CSS and pass through Gatsby's default CSS pipeline
  unchanged.
- **The `gatsby-plugin-sass` 7.x wait-and-see option** (rejected because no
  upstream timeline exists).

## 4. Toolchain (after migration)

| Role                     | Package                       | Source                         |
| ------------------------ | ----------------------------- | ------------------------------ |
| Sass compiler            | `sass` ^1.99 (devDependency)  | direct                         |
| webpack SCSS loader      | `sass-loader` ^16             | direct (devDependency)         |
| webpack CSS loader       | `css-loader`                  | transitive via Gatsby 5        |
| dev style injector       | `style-loader`                | transitive via Gatsby 5        |
| production CSS extractor | `mini-css-extract-plugin`     | transitive via Gatsby 5        |
| design system            | `bootstrap` ^5.3.8            | direct                         |
| `gatsby-plugin-sass`     | _removed_                     | —                              |

## 5. Key Design Decisions

### 5.1 Webpack rule lives in `gatsby-node.ts`

The repository already exports `onCreateWebpackConfig` for path aliases.
SCSS handling joins that callback. Pseudocode:

```ts
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  actions,
}) => {
  const isProduction =
    stage === 'build-javascript' || stage === 'build-html'

  const cssLoaders = [
    isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
    { loader: 'css-loader', options: { sourceMap: !isProduction } },
    {
      loader: 'sass-loader',
      options: {
        api: 'modern-compiler',
        sourceMap: !isProduction,
        sassOptions: { quietDeps: true },
      },
    },
  ]

  actions.setWebpackConfig({
    module: { rules: [{ test: /\.s[ac]ss$/i, use: cssLoaders }] },
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
      },
    },
  })
}
```

The `resolve.alias` block is preserved verbatim from the current
implementation. Only the `module.rules` SCSS entry is new.

### 5.2 Why `MiniCssExtractPlugin.loader` is safe to import

Gatsby 5 already depends on `mini-css-extract-plugin` and uses it to extract
CSS from its built-in CSS handling. Importing `MiniCssExtractPlugin.loader`
does not cause hoisting issues because we use only the loader entry — we do
not register a new instance of the plugin. Gatsby's existing plugin
registration handles the actual CSS file emission; we are inserting our SCSS
rule into the same pipeline.

### 5.3 Stage detection

Gatsby 5 `onCreateWebpackConfig` receives `stage` with one of:
`develop`, `develop-html`, `build-javascript`, `build-html`.

- Dev (`develop`, `develop-html`) → `style-loader` for HMR.
- Production (`build-javascript`, `build-html`) → `MiniCssExtractPlugin.loader`.

Splitting on the production set rather than the dev set keeps the rule
correct if Gatsby ever introduces a new dev stage name.

### 5.4 Bootstrap-internal deprecations

Bootstrap 5.3.x still emits `@import` and pre-module color function
deprecations from inside its own SCSS. We suppress them with
`sassOptions: { quietDeps: true }` on `sass-loader`. This is a narrower
suppression than the current `silenceDeprecations: ['legacy-js-api']`,
which silenced project-wide JS-API warnings. After the migration the
project-level workaround is no longer needed because we are no longer
calling the legacy JS API at all.

### 5.5 `sass` becomes a `devDependency`

`sass` is only needed at build time. In the current `package.json` it sits
under `dependencies`, which would ship it to a hypothetical production
runtime install. Move to `devDependencies` while we are restructuring.

### 5.6 Bootstrap and sass minor bumps

The migration touches dependency wiring already, so bundling
`bootstrap@^5.3.8` and `sass@^1.99` in the same PR avoids a follow-up.
Both are in-line minor bumps — no breaking changes expected. Verified
during implementation by reading release notes.

## 6. Package Diff

### Removed (1)

- `gatsby-plugin-sass` (`dependencies`)

### Added (1)

- `sass-loader` ^16 (`devDependencies`)

### Bumped

- `bootstrap` ^5.3.3 → ^5.3.8 (still `dependencies`)
- `sass` ^1.78 → ^1.99

### Reclassified

- `sass` moves from `dependencies` to `devDependencies`.

### Files

- Modified: `gatsby-config.ts` — drop the `gatsby-plugin-sass` plugin entry
  and its inline `sassOptions` block.
- Modified: `gatsby-node.ts` — extend `onCreateWebpackConfig` with the SCSS
  rule and import `mini-css-extract-plugin`'s loader.
- Modified: `package.json` — dependency edits.
- Modified: `yarn.lock` — regenerated.
- No SCSS source file content changes.

## 7. Verification Plan

1. `yarn lint`, `yarn typecheck`, `yarn build` all pass.
2. `yarn build` output is byte-similar to pre-migration: expected diff is
   limited to whitespace/source-map differences from a different loader
   chain. Not strictly required to be byte-identical, but no semantic CSS
   regressions.
3. `yarn develop` serves the site. Edit `src/scss/colors.scss` — for
   example, change `$purple` — and confirm the change appears without a full
   reload.
4. Inspect terminal output of `yarn build` and `yarn develop`: no
   `legacy-js-api` deprecation warnings, no `quietDeps`-suppressible noise
   leaking through.
5. Lighthouse CI on the PR is green at ≥ 0.95 across categories.

## 8. Risks and Mitigations

- **R1 — CSS extraction conflicts with Gatsby's internal CSS pipeline**.
  Adding our own `MiniCssExtractPlugin.loader` reference *without* adding a
  new plugin instance is the recommended pattern, but if Gatsby's
  configuration has changed across minor releases this may regress.
  - _Mitigation_: verify with `yarn build` and inspect `public/styles.*.css`
    output. If the CSS file is missing or duplicated, pivot to `style-loader`
    in production temporarily (less efficient, but unblocks the migration)
    while opening a follow-up to investigate.
- **R2 — Lighthouse score drop from CSS delivery change**. Inline vs.
  extracted CSS, source maps, etc.
  - _Mitigation_: PR-level Lighthouse CI gate already exists.
- **R3 — Bootstrap 5.3.8 introduces a new deprecation that `quietDeps`
  doesn't catch**. Bootstrap's release notes need a quick read before bump.
  - _Mitigation_: implement the bump as the last commit in the sequence so
    a revert is one commit deep.
- **R4 — `sass-loader@16` peer-dependency on a newer `webpack` than Gatsby
  5 ships**. Compatibility is documented but not guaranteed across Gatsby
  patch releases.
  - _Mitigation_: `yarn install` will surface peer warnings; pin to the
    minimum compatible minor if conflicts emerge.
- **R5 — Stacked branch rebase pain**. `sass-modern-api` is stacked on
  `biome-migration` (PR #684). When #684 merges, this branch needs a rebase.
  Both branches touch `package.json`.
  - _Mitigation_: keep changes to `package.json` minimal and well-scoped on
    this branch so rebase conflicts are mechanical.

### Rollback

Migration is a single PR. Reverting the PR restores the prior
`gatsby-plugin-sass` toolchain. If only the Bootstrap or sass bumps cause
trouble, those can be reverted independently as the last commit(s) in the
sequence.

## 9. Out-of-PR Follow-ups

- If `gatsby-plugin-sass` 7.x ships with modern-API support after this
  migration lands, consider whether to revert the DIY rule for less
  maintenance, or stay self-managed for tighter control. No action required
  until 7.x exists.
- Revisit `quietDeps: true` once Bootstrap migrates fully off `@import`
  internally (likely Bootstrap 6.x).
