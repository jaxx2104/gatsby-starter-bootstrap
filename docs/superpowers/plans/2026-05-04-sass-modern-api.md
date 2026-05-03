# Sass Modern API Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `gatsby-plugin-sass` with a direct `sass-loader@16` webpack rule using Sass's modern compiler API, drop the legacy-js-api workaround, and bundle in `bootstrap` and `sass` minor bumps.

**Architecture:** Single-PR migration on the `sass-modern-api` branch (stacked on `biome-migration` / PR #684). Add `sass-loader` and `mini-css-extract-plugin` as direct devDependencies first, then atomically swap the plugin entry in `gatsby-config.ts` for a webpack rule in `gatsby-node.ts onCreateWebpackConfig`, then bump Bootstrap and Sass as separate commits so any version-specific fallout is bisectable.

**Tech Stack:** Gatsby 5.16, sass 1.99, sass-loader 16, mini-css-extract-plugin (Gatsby-bundled version), Bootstrap 5.3.8, TypeScript 5.6, Yarn Classic 1.22, Node 20.

**Spec:** `docs/superpowers/specs/2026-05-04-sass-modern-api-design.md`

**Branch state at start:** `sass-modern-api` checked out, tip at `eade186` (spec-only commit). Stacked on `biome-migration` (`13d99fa`).

**Verification model:** No JS test framework. "Tests" = `yarn build`, `yarn typecheck`, terminal output scans for deprecation strings, `public/` artifact inspection, and a manual `yarn develop` HMR smoke test.

---

## File Structure

### Modified

- `package.json` — dep changes (4 commits' worth: T1, T2, T3, T4)
- `yarn.lock` — auto-regenerated
- `gatsby-config.ts` — remove `gatsby-plugin-sass` plugin entry and its inline `sassOptions` block (T2)
- `gatsby-node.ts` — extend `onCreateWebpackConfig` with SCSS module rule and import the MCEP loader (T2)

### Untouched (intentional)

- `src/scss/*.scss` — already uses modern `@use` syntax
- `src/components/**/style.scss`, `src/templates/**/style.scss` — already modern
- `src/components/layout/layout.tsx` — `import 'modern-normalize/.../*.css'` and `import 'prismjs/.../*.css'` continue through Gatsby's default CSS pipeline (our SCSS rule pattern `\.s[ac]ss$/i` does not match `.css`)
- `biome.json` — no change needed
- All other `.github/workflows`, `.husky/*`, `.vscode/*` — no change

---

## Pre-flight (do once, not a task)

- [ ] Confirm current branch is `sass-modern-api` (`git rev-parse --abbrev-ref HEAD`).
- [ ] Confirm tip is `eade186` (`git log --oneline -1`).
- [ ] Run `yarn install --frozen-lockfile` to ensure a clean baseline.
- [ ] Run `yarn lint && yarn typecheck && yarn build` — record current state. All three pass; the build should mention no `legacy-js-api` *project-level* warnings (those are silenced by current config), and `quietDeps: true` should suppress Bootstrap-internal noise. Note any visible deprecation lines for later comparison.
- [ ] Capture a snapshot of CSS output for diffing later:

  ```bash
  ls -la public/styles*.css 2>/dev/null > /tmp/sass-pre-css-listing.txt
  ls -la public/*.css 2>/dev/null >> /tmp/sass-pre-css-listing.txt
  ```

  This produces a list of CSS filenames and sizes from the baseline build for comparison after T2.

---

## Task 1: Install `sass-loader` and `mini-css-extract-plugin`

Install both as direct devDependencies before touching any config so they exist when we wire them in T2. `gatsby-plugin-sass` is still active and will continue to handle SCSS — these new deps are dormant for one commit.

**Files:**
- Modify: `package.json` (devDependencies)
- Modify: `yarn.lock`

- [ ] **Step 1: Add the deps**

```bash
yarn add -D sass-loader@^16.0.7 mini-css-extract-plugin@^1.6.2
```

`mini-css-extract-plugin` is pinned to `^1.6.2` to match the version Gatsby 5.16 ships internally. MCEP's loader/plugin runtime contract is not stable across major versions; if our top-level pin were on v2 while Gatsby's internal plugin instance is v1, the loader would emit chunks the plugin can't consume (silent breakage or a "You forgot to add MiniCssExtractPlugin plugin" error at build time). Yarn deduplicates against Gatsby's internal copy, so only one physical MCEP install exists in `node_modules`. `sass-loader` is pinned to the resolved minor (`^16.0.7`) to match this project's `^MAJOR.MINOR` semver convention.

- [ ] **Step 2: Verify installation**

```bash
yarn list --pattern "sass-loader|mini-css-extract-plugin" --depth=0
```

Expected: both packages listed with their resolved versions. `sass-loader` should be at 16.x; `mini-css-extract-plugin` should match the version Gatsby already resolves to (some 2.x).

- [ ] **Step 3: Confirm modules resolve**

```bash
node -e "require.resolve('sass-loader'); require.resolve('mini-css-extract-plugin'); console.log('ok')"
```

Expected: prints `ok`.

- [ ] **Step 4: Confirm baseline build still works**

```bash
yarn build
```

Expected: exits 0. `gatsby-plugin-sass` still handles SCSS; the new deps are unused. Build time should be roughly unchanged from pre-flight.

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore(sass): install sass-loader and mini-css-extract-plugin"
```

The pre-commit hook runs Biome on staged JS/TS/JSON. `package.json` should be a no-op edit for Biome.

---

## Task 2: Atomic swap — remove `gatsby-plugin-sass`, add webpack rule

This is the load-bearing task. In one commit we:

1. Remove the `gatsby-plugin-sass` plugin entry from `gatsby-config.ts`.
2. Remove the package from `package.json`.
3. Add the SCSS module rule to `gatsby-node.ts onCreateWebpackConfig`.

Doing it atomically avoids a window where two SCSS rules are registered or where SCSS is unhandled.

**Files:**
- Modify: `gatsby-config.ts`
- Modify: `gatsby-node.ts`
- Modify: `package.json`
- Modify: `yarn.lock`

- [ ] **Step 1: Edit `gatsby-config.ts` to remove the `gatsby-plugin-sass` plugin entry**

Open `gatsby-config.ts`. Remove this block:

```ts
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        sassOptions: {
          // Bootstrap 5.3 still ships SCSS that uses legacy `@import` and the
          // pre-module color functions. `quietDeps` only silences node_modules
          // noise, not our own code.
          quietDeps: true,
          // sass-loader 10 (pinned by gatsby-plugin-sass 6) uses the legacy
          // Sass JS API. The warning is not from our SCSS, it is from how
          // sass-loader invokes Sass. Removing it requires upgrading
          // gatsby-plugin-sass past what Gatsby 5 ships.
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
```

The plugin entry is in the `plugins:` array. Remove the entire `{ resolve: 'gatsby-plugin-sass', options: {...} }` object including its trailing comma. Other plugins around it (`gatsby-plugin-catch-links`, `gatsby-plugin-image`, `gatsby-plugin-netlify`, `gatsby-plugin-offline`, `gatsby-plugin-sharp`, etc.) stay.

- [ ] **Step 2: Edit `gatsby-node.ts` to add the SCSS rule**

Open `gatsby-node.ts`. Add the import at the top, alongside the existing `import path from 'node:path'` (added during T3 of biome-migration):

```ts
import path from 'node:path'
import type { GatsbyNode } from 'gatsby'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
```

Then replace the existing `onCreateWebpackConfig` export with:

```ts
export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  stage,
  actions,
}) => {
  const isProduction =
    stage === 'build-javascript' || stage === 'build-html'

  const scssRule = {
    test: /\.s[ac]ss$/i,
    use: [
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
    ],
  }

  actions.setWebpackConfig({
    module: { rules: [scssRule] },
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

Both the `module.rules` and `resolve.alias` entries are in the same `setWebpackConfig` call. The alias block is preserved verbatim from the previous implementation.

The other two exports in this file — `createPages` and `createSchemaCustomization` — stay untouched.

- [ ] **Step 3: Remove `gatsby-plugin-sass` from `package.json`**

```bash
yarn remove gatsby-plugin-sass
```

This rewrites `package.json` and `yarn.lock`.

- [ ] **Step 4: Type-check**

```bash
yarn typecheck
```

Expected: exit 0. Catches any type error in the new `onCreateWebpackConfig` signature or the MCEP import.

- [ ] **Step 5: Run a clean production build**

```bash
yarn clean
yarn build 2>&1 | tee /tmp/sass-post-build.log
```

Expected: build exits 0. Inspect the log for deprecation messages:

```bash
grep -iE "deprecat|legacy.?js.?api" /tmp/sass-post-build.log || echo "no deprecation lines"
```

Expected: prints `no deprecation lines`. If anything matches, read it carefully — Bootstrap-internal warnings would have been suppressed by `quietDeps: true`. Anything project-level or new is a real signal that needs investigation.

- [ ] **Step 6: Compare CSS artifacts to baseline**

```bash
ls -la public/styles*.css 2>/dev/null > /tmp/sass-post-css-listing.txt
ls -la public/*.css 2>/dev/null >> /tmp/sass-post-css-listing.txt
diff /tmp/sass-pre-css-listing.txt /tmp/sass-post-css-listing.txt || true
```

Expected: file names match (Gatsby may hash them differently because of the loader chain change — that's fine), file *count* matches, sizes are within ~10% of baseline. A drastic size change or a missing file is a signal to investigate.

You can also spot-check CSS content:

```bash
ls public/*.css | xargs -I {} bash -c 'echo "=== {} ==="; head -c 300 "{}"; echo'
```

Expected: CSS rules look like real Bootstrap + Gatstrap output, not garbled or empty.

- [ ] **Step 7: Smoke-test `yarn develop`**

Start the dev server in the background, give it 30 seconds to compile, fetch the homepage, then shut it down:

```bash
yarn develop > /tmp/sass-develop.log 2>&1 &
DEV_PID=$!
sleep 30
HTTP_CODE=$(curl -s -o /tmp/sass-develop-home.html -w '%{http_code}' http://localhost:8000/)
echo "HTTP: $HTTP_CODE"
grep -c '<style' /tmp/sass-develop-home.html || true
kill $DEV_PID 2>/dev/null
wait $DEV_PID 2>/dev/null
```

Expected: `HTTP: 200`. The `<style` count should be greater than 0 (style-loader injects `<style>` tags). If `HTTP: 000` or the HTML is empty, the dev server failed to start; check `/tmp/sass-develop.log` for compile errors.

This is a startup smoke test; it does not exercise HMR. The author should manually verify HMR by editing `src/scss/colors.scss` (e.g., change `$purple` to `#ff0000`) while `yarn develop` runs and confirming the navbar background updates without a full page reload. Document this verification result in the commit body or PR description.

- [ ] **Step 8: Commit**

```bash
git add gatsby-config.ts gatsby-node.ts package.json yarn.lock
git commit -m "feat(sass): replace gatsby-plugin-sass with direct sass-loader webpack rule"
```

Commit body should mention: HMR smoke test result, `legacy-js-api` deprecation absent, CSS listing diff finding (or "no meaningful difference").

---

## Task 3: Bump `bootstrap` to 5.3.8

Pure version bump. Independent commit so any Bootstrap-introduced regression is bisectable.

**Files:**
- Modify: `package.json` (dependencies)
- Modify: `yarn.lock`

- [ ] **Step 1: Bump**

```bash
yarn add bootstrap@^5.3.8
```

- [ ] **Step 2: Confirm version**

```bash
node -e "console.log(require('bootstrap/package.json').version)"
```

Expected: prints `5.3.8` or higher.

- [ ] **Step 3: Build and check for new deprecations**

```bash
yarn build 2>&1 | tee /tmp/sass-bs-build.log
grep -iE "deprecat|legacy.?js.?api" /tmp/sass-bs-build.log || echo "no deprecation lines"
```

Expected: `no deprecation lines`. If Bootstrap 5.3.8 introduces a new deprecation that `quietDeps` doesn't catch, decide on a per-warning basis whether to suppress with an additional `silenceDeprecations` option or accept the noise.

- [ ] **Step 4: Spot-check the rendered styles**

```bash
grep -c "navbar" public/*.css | head -5
```

Expected: at least one CSS file contains references to navbar styles (Bootstrap's navbar class).

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore(deps): bump bootstrap to 5.3.8"
```

---

## Task 4: Bump `sass` and move it to devDependencies

`sass` is a build-time tool only. Move it from `dependencies` to `devDependencies` and bump to `^1.99` in the same commit.

**Files:**
- Modify: `package.json`
- Modify: `yarn.lock`

- [ ] **Step 1: Remove from dependencies, add to devDependencies at the new version**

Yarn 1 doesn't support a single command for "move + upgrade", so do it in two:

```bash
yarn remove sass
yarn add -D sass@^1.99
```

- [ ] **Step 2: Confirm placement and version**

```bash
node -e "
const p = require('./package.json');
console.log('in deps:', !!p.dependencies?.sass);
console.log('in devDeps:', !!p.devDependencies?.sass, p.devDependencies?.sass);
"
```

Expected:

```
in deps: false
in devDeps: true ^1.99...
```

- [ ] **Step 3: Build**

```bash
yarn build 2>&1 | tee /tmp/sass-version-build.log
grep -iE "deprecat|legacy.?js.?api" /tmp/sass-version-build.log || echo "no deprecation lines"
```

Expected: build passes; no new deprecations.

- [ ] **Step 4: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore(deps): bump sass to 1.99 and move to devDependencies"
```

---

## Task 5: Final verification

No file changes. The gate before push.

- [ ] **Step 1: Clean install from scratch**

```bash
rm -rf node_modules
yarn install --frozen-lockfile
```

Expected: install completes with no peer-dependency errors. Warnings about `webpack` peer ranges from `sass-loader` are tolerable as long as Gatsby's `webpack` is in the supported range; if `sass-loader@16` requires a webpack version Gatsby 5 doesn't ship, this surfaces here.

- [ ] **Step 2: Full check chain**

```bash
yarn lint
yarn typecheck
yarn build 2>&1 | tee /tmp/sass-final-build.log
```

Expected: all three exit 0.

- [ ] **Step 3: Confirm zero `legacy-js-api` deprecations**

```bash
grep -iE "legacy.?js.?api" /tmp/sass-final-build.log || echo "no legacy-js-api warnings"
```

Expected: prints `no legacy-js-api warnings`.

- [ ] **Step 4: Confirm `gatsby-plugin-sass` is gone everywhere**

```bash
grep -rn "gatsby-plugin-sass" gatsby-config.ts gatsby-node.ts package.json src 2>/dev/null \
  || echo "no references"
```

Expected: prints `no references`.

- [ ] **Step 5: Confirm package state**

```bash
node -e "
const p = require('./package.json');
console.log('gatsby-plugin-sass in deps:', !!p.dependencies?.['gatsby-plugin-sass']);
console.log('sass in deps:', !!p.dependencies?.sass);
console.log('sass in devDeps:', p.devDependencies?.sass || 'absent');
console.log('sass-loader in devDeps:', p.devDependencies?.['sass-loader'] || 'absent');
console.log('mini-css-extract-plugin in devDeps:', p.devDependencies?.['mini-css-extract-plugin'] || 'absent');
console.log('bootstrap in deps:', p.dependencies?.bootstrap || 'absent');
"
```

Expected:

```
gatsby-plugin-sass in deps: false
sass in deps: false
sass in devDeps: ^1.99...
sass-loader in devDeps: ^16...
mini-css-extract-plugin in devDeps: ^...
bootstrap in deps: ^5.3.8
```

- [ ] **Step 6: Smoke-test the dev server**

Same incantation as Task 2 Step 7:

```bash
yarn develop > /tmp/sass-final-develop.log 2>&1 &
DEV_PID=$!
sleep 30
curl -s -o /dev/null -w 'HTTP:%{http_code}\n' http://localhost:8000/
kill $DEV_PID 2>/dev/null
wait $DEV_PID 2>/dev/null
```

Expected: `HTTP:200`.

- [ ] **Step 7: Push and stop for human review**

```bash
git log --oneline origin/biome-migration..HEAD
```

Expected: 5 commits — spec, install deps, swap, bootstrap bump, sass bump.

**Stop here.** The push and PR creation involve external state and require explicit user authorization, the same way the biome-migration branch was handled. Report:
- Commit SHAs in order.
- Verification results.
- HMR manual-test status (was it actually performed and did it work?).
- Any deprecation lines that did appear and how they were handled.
- Whether `node_modules/sass-loader` and `node_modules/mini-css-extract-plugin` resolved to versions you expect.

Push and `gh pr create` happen only after the user gives the OK.

---

## Self-Review Notes

- **Spec coverage**: every spec section maps to a task —
  - §2 success criteria → T2 (rule+removal), T3 (bootstrap), T4 (sass), T5 (verification gates)
  - §3 in-scope items → T1+T2+T3+T4
  - §3 out-of-scope items → no tasks (correct)
  - §4 toolchain table → T1 installs, T2 wires
  - §5.1 webpack rule code → T2 step 2
  - §5.2 MCEP loader rationale → T1 (direct dep) + T2 step 2
  - §5.3 stage detection → T2 step 2 `isProduction` logic
  - §5.4 quietDeps → T2 step 2 `sassOptions`
  - §5.5 sass devDep move → T4
  - §5.6 minor bumps → T3 + T4
  - §7 verification plan → T2 steps 5–7 + T5
  - §8 R1 mitigation (CSS extraction conflict) → T2 step 6 (CSS listing diff)
  - §8 R2 (Lighthouse) → handled by CI on push
  - §8 R3 (Bootstrap deprecation) → T3 step 3
  - §8 R4 (sass-loader peer dep) → T5 step 1 verification
  - §8 R5 (rebase pain) → noted in PR; not actionable in plan
- **Placeholder scan**: no TBDs, no "add error handling", no orphaned references.
- **Type/name consistency**: `MiniCssExtractPlugin` import name and `MiniCssExtractPlugin.loader` property used consistently across T2; `isProduction` consistent with the `stage === 'build-javascript' || stage === 'build-html'` definition.
