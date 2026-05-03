# Biome Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace ESLint + Prettier with Biome alone, dropping 10 devDependencies and two config files, and add a `pre-push` typecheck hook in the same change.

**Architecture:** Single-PR migration. Install `@biomejs/biome` and write `biome.json` first, then switch `lint-staged` and `package.json` scripts to Biome (so subsequent commits format with Biome, not Prettier), then run `biome check --write .` to apply the mechanical diff across the repo, then remove ESLint and Prettier in two clean commits, then update Husky / CI / README.

**Tech Stack:** Biome 2.x, Yarn Classic 1.22, Husky 9, lint-staged 16, Node 20, GitHub Actions, Gatsby 5.16, TypeScript 5.6, React 19.

**Spec:** `docs/superpowers/specs/2026-05-03-biome-migration-design.md`

**Branching:** Create a feature branch from `origin/master` (`git fetch -p origin && git checkout -b biome-migration origin/master`). Each task ends with a commit. Open the PR after Task 9.

**Verification model:** This repo has no JS test framework. "Tests" in this plan are _verification commands_ (lint, typecheck, build, file existence, hook smoke tests). Each task: edit → run verification → commit.

---

## File Structure

### Created

- `biome.json` — Biome 2.x config (formatter + linter + assist)
- `.husky/pre-push` — runs `yarn typecheck`

### Modified

- `package.json` — devDependencies, `scripts`, `lint-staged`
- `yarn.lock` — regenerated from package.json changes
- `.github/workflows/ci.yml` — lint step
- `README.md` — Scripts table + Contributing note
- All `*.{ts,tsx,js,mjs,json}` files in the repo — mechanical Biome formatting (one bulk commit in Task 3)

### Deleted

- `eslint.config.mjs`
- `prettier.config.mjs`

### Untouched (intentional)

- `*.scss` and `*.md` files — no formatter applied (EditorConfig + IDE only)
- `.husky/pre-commit` — content stays `yarn lint-staged`
- `src/gatsby-types.d.ts` — generated; will be excluded in `biome.json`
- `content/**/*.md` — `textlint` continues to handle these

---

## Pre-flight (do once, not a task)

- [ ] Run `git fetch -p origin && git checkout -b biome-migration origin/master`
- [ ] Run `yarn install --frozen-lockfile` to confirm a clean baseline
- [ ] Run `yarn lint && yarn typecheck && yarn build` — record current state. All three should pass before any change.

---

## Task 1: Install Biome and write `biome.json`

**Files:**

- Create: `biome.json`
- Modify: `package.json` (devDependencies)
- Modify: `yarn.lock`

- [ ] **Step 1: Add `@biomejs/biome` to devDependencies**

```bash
yarn add -D @biomejs/biome@^2.4
```

This adds Biome but does not yet wire it into any script. ESLint and Prettier still run via existing scripts and `lint-staged`.

- [ ] **Step 2: Verify Biome is installed**

```bash
yarn biome --version
```

Expected: prints `2.4.x` (or newer 2.x).

- [ ] **Step 3: Create `biome.json`**

Write this file to the repo root:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.4.0/schema.json",
  "files": {
    "includes": [
      "**",
      "!**/node_modules/**",
      "!**/.cache/**",
      "!**/public/**",
      "!**/.lighthouseci/**",
      "!src/gatsby-types.d.ts",
      "!yarn.lock"
    ]
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true,
      "correctness": {
        "useExhaustiveDependencies": "error",
        "useHookAtTopLevel": "error"
      }
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2,
    "lineWidth": 80
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "jsxQuoteStyle": "double",
      "trailingCommas": "es5",
      "semicolons": "asNeeded"
    }
  },
  "json": {
    "formatter": {
      "enabled": true,
      "trailingCommas": "none"
    }
  },
  "assist": {
    "enabled": true,
    "actions": {
      "source": {
        "organizeImports": "on"
      }
    }
  }
}
```

> **Schema confirmation:** Open the URL in `$schema` (or run `yarn biome migrate` against any v1 config) to confirm the keys above match the Biome 2.4.x schema. If a key has been renamed in 2.4.x (e.g. `assist.actions.source.organizeImports`), adjust to the current name and keep the _intent_ (organize imports on, recommended ruleset on, hooks rules at error).

- [ ] **Step 4: Verify Biome reads the config**

```bash
yarn biome check --no-errors-on-unmatched src/components/footer/footer.tsx
```

Expected: command runs without "config not found" or "schema validation" errors. It may report findings — that's fine; they'll be fixed in Task 3.

- [ ] **Step 5: Verify the existing toolchain still works (regression check)**

```bash
yarn lint
yarn typecheck
```

Expected: both pass exactly as they did before Task 1. ESLint config is unchanged; Biome is dormant.

- [ ] **Step 6: Commit**

```bash
git add package.json yarn.lock biome.json
git commit -m "chore(biome): install @biomejs/biome and add biome.json"
```

The pre-commit hook will run `lint-staged`. The current `lint-staged` config runs `prettier --write` and `eslint --fix` on `package.json`; both should be no-ops. `biome.json` is JSON and will be Prettier-formatted on commit; that's expected and one-shot.

---

## Task 2: Switch `lint-staged` and `package.json` scripts to Biome

**Files:**

- Modify: `package.json` (`scripts`, `lint-staged`)

This task flips the source of truth for formatting _before_ the bulk repo reformat in Task 3. After this commit, every staged JS/TS/JSON file is processed by Biome, never by Prettier or ESLint.

- [ ] **Step 1: Update `scripts` in `package.json`**

Replace the existing `lint`, `lint:fix`, and `format` entries; keep the rest. Add a new `ci:lint` entry. The block should look like this after the edit:

```jsonc
"scripts": {
  "develop": "gatsby develop",
  "build": "gatsby build",
  "serve": "gatsby serve",
  "clean": "gatsby clean",
  "typecheck": "tsc --noEmit",
  "lint": "biome lint .",
  "lint:fix": "biome check --write .",
  "format": "biome format --write .",
  "ci:lint": "biome ci .",
  "lint:text": "textlint \"content/**/*.md\"",
  "lint:textfix": "textlint --fix \"content/**/*.md\"",
  "prepare": "husky"
}
```

- [ ] **Step 2: Replace `lint-staged` in `package.json`**

The full new `lint-staged` block:

```jsonc
"lint-staged": {
  "*.{ts,tsx,js,mjs,json}": [
    "biome check --write --no-errors-on-unmatched"
  ]
}
```

The `*.scss` and `*.md` entries are removed deliberately — those files are no longer formatted by tooling (per spec §3 "Out of scope").

- [ ] **Step 3: Verify the new scripts run (they will likely report findings)**

```bash
yarn lint
```

Expected: Biome runs and probably reports formatting/lint findings across the repo. **Do not fix yet** — Task 3 applies the bulk fix. A non-zero exit here is _expected_ at this stage and does not block the commit.

```bash
yarn typecheck
yarn build
```

Expected: both still pass (ESLint is no longer in the lint script chain, but it's still installed; nothing in build depends on the ESLint binary).

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "chore(biome): switch lint-staged and scripts to biome"
```

Pre-commit runs the _new_ lint-staged on the staged `package.json`: `biome check --write` runs on it. The file is already JSON-formatted; Biome may rewrite trailing commas etc. per `biome.json`. Accept the result.

If pre-commit fails because Biome rewrote something, restage and retry: `git add package.json && git commit --no-edit` (without `--no-verify`; let the hook re-run cleanly).

---

## Task 3: Apply Biome formatting and lint fixes across the repo

**Files:**

- Modify: every `*.{ts,tsx,js,mjs,json}` file under `src/`, the project root (`gatsby-config.ts`, `gatsby-node.ts`, `gatsby-browser.js`), and the various JSON config files (`tsconfig.json`, `lighthouserc.json`, `renovate.json`, `.imgbotconfig`, `package.json`)

- [ ] **Step 1: Run Biome's auto-fix across the repo**

```bash
yarn biome check --write .
```

Expected: Biome rewrites quoting, semicolons, trailing commas, import order, and any auto-fixable lint findings. The output prints a summary of files changed.

- [ ] **Step 2: Inspect the diff before committing**

```bash
git status
git diff --stat
```

Expected: a wide but shallow diff (many files, each with small mechanical changes). Spot-check:

```bash
git diff src/pages/index.tsx
git diff src/templates/template.tsx
git diff gatsby-config.ts
```

Look for: changed quote style (single vs double), reordered imports, removed/added trailing commas. There should be **no semantic changes** (no renamed identifiers, no logic edits). If you see anything semantic, stop and investigate.

- [ ] **Step 3: Verify the build still works**

```bash
yarn typecheck
yarn build
```

Expected: both pass.

- [ ] **Step 4: Verify Biome is now clean**

```bash
yarn lint
```

Expected: exit 0, no findings remaining (or only findings you've consciously decided to leave; if any remain, document why in the commit body).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "style(biome): apply biome check --write across the repo"
```

The pre-commit hook will run `biome check --write` again on staged files via `lint-staged`. Since the working copy is already Biome-formatted, this is a no-op.

---

## Task 4: Remove ESLint packages and config

**Files:**

- Delete: `eslint.config.mjs`
- Modify: `package.json` (devDependencies)
- Modify: `yarn.lock`

- [ ] **Step 1: Remove the nine ESLint packages**

```bash
yarn remove \
  eslint \
  @eslint/js \
  eslint-config-prettier \
  eslint-plugin-prettier \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  globals
```

If a name is wrong, `yarn remove` will fail loudly — re-check `package.json` and retry. Do **not** remove `prettier` here; that's Task 5.

- [ ] **Step 2: Delete the ESLint config file**

```bash
rm eslint.config.mjs
```

- [ ] **Step 3: Verify nothing references the removed packages**

```bash
grep -rn "from 'eslint" src .github gatsby-config.ts gatsby-node.ts || echo "no references"
grep -rn "@typescript-eslint" src .github package.json || echo "no references"
```

Expected: only references inside `package.json` (which `yarn remove` should have already cleaned), or the literal string "no references". If any source file imports from the removed packages, that's a bug — fix it.

- [ ] **Step 4: Verify the toolchain is healthy**

```bash
yarn install --frozen-lockfile
yarn lint
yarn typecheck
yarn build
```

Expected: all pass. `yarn lint` now runs Biome, which still has access to its own config.

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock eslint.config.mjs
git commit -m "chore(biome): remove eslint toolchain"
```

Note: `git add` of a deleted file records the deletion. Confirm with `git status` before committing.

---

## Task 5: Remove Prettier package and config

**Files:**

- Delete: `prettier.config.mjs`
- Modify: `package.json` (devDependencies)
- Modify: `yarn.lock`

- [ ] **Step 1: Remove Prettier**

```bash
yarn remove prettier
```

- [ ] **Step 2: Delete the Prettier config file**

```bash
rm prettier.config.mjs
```

- [ ] **Step 3: Verify nothing references Prettier**

```bash
grep -rn "prettier" .github src gatsby-config.ts gatsby-node.ts package.json | grep -v node_modules || echo "no references"
```

Expected: only matches inside `lint-staged` config historically — but Task 2 already removed those. The output should be "no references" or limited to documentation strings (none expected).

- [ ] **Step 4: Verify the toolchain is healthy**

```bash
yarn install --frozen-lockfile
yarn lint
yarn typecheck
yarn build
```

Expected: all pass.

- [ ] **Step 5: Commit**

```bash
git add package.json yarn.lock prettier.config.mjs
git commit -m "chore(biome): remove prettier"
```

---

## Task 6: Add `.husky/pre-push` typecheck hook

**Files:**

- Create: `.husky/pre-push`

This consolidates category **F** from the brainstorming session into this PR.

- [ ] **Step 1: Create the hook**

Write `.husky/pre-push` with this exact content (no shebang line — Husky 9 uses bare scripts):

```sh
yarn typecheck
```

- [ ] **Step 2: Make it executable**

```bash
chmod +x .husky/pre-push
```

- [ ] **Step 3: Smoke-test the hook without actually pushing**

```bash
.husky/pre-push
```

Expected: runs `yarn typecheck` and exits 0. Time it; if it takes more than ~10 seconds on a clean checkout, note this in the PR body so reviewers can flag it.

- [ ] **Step 4: Verify pre-commit still works**

Touch any source file (e.g. `src/components/footer/footer.tsx`), make a trivial whitespace change, stage it, and commit:

```bash
echo "" >> src/components/footer/footer.tsx
git add src/components/footer/footer.tsx
git commit -m "test: trigger pre-commit"
```

Expected: pre-commit runs `lint-staged` → Biome → success. Then revert the test commit:

```bash
git reset --hard HEAD~1
```

- [ ] **Step 5: Commit the hook**

```bash
git add .husky/pre-push
git commit -m "chore(husky): run yarn typecheck on pre-push"
```

---

## Task 7: Update CI workflow

**Files:**

- Modify: `.github/workflows/ci.yml`

- [ ] **Step 1: Replace the lint step**

In `.github/workflows/ci.yml`, change the final `- run: yarn lint` line to:

```yaml
- run: npx biome ci .
```

The full `steps:` block should read:

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
    with:
      node-version-file: .node-version
      cache: yarn
  - run: yarn install --frozen-lockfile
  - run: yarn build
  - run: yarn typecheck
  - run: npx biome ci .
```

`biome ci` is the CI-tuned mode: no auto-fix, non-zero exit on any finding. It covers format checks, lint, and import order in one call.

- [ ] **Step 2: Lint the workflow file locally with Biome (sanity)**

```bash
yarn biome format --write .github/workflows/ci.yml || true
```

Note: Biome does not currently format YAML. The command will be a no-op or print "unsupported file"; that's expected. The `|| true` keeps the step idempotent.

- [ ] **Step 3: Validate the YAML is still parseable**

```bash
node -e "require('js-yaml')" 2>/dev/null \
  && node -e "console.log(require('js-yaml').load(require('fs').readFileSync('.github/workflows/ci.yml','utf8')).jobs.build.steps.length)" \
  || python3 -c "import yaml,sys; print(len(yaml.safe_load(open('.github/workflows/ci.yml')).get('jobs',{}).get('build',{}).get('steps',[])))"
```

Expected: prints the number of steps in the `build` job (should be 6 after the edit). If neither `js-yaml` nor `pyyaml` is available, skip this step and trust the YAML by inspection.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: switch lint step to biome ci"
```

---

## Task 8: Update README

**Files:**

- Modify: `README.md`

- [ ] **Step 1: Replace the Scripts table**

Find the table that starts with `| Command          | Description                       |`. Replace the rows whose `Description` mentions ESLint or Prettier with these:

```markdown
| Command          | Description                                |
| ---------------- | ------------------------------------------ |
| `yarn develop`   | Start the dev server                       |
| `yarn build`     | Production build to `public/`              |
| `yarn typecheck` | Run TypeScript strict mode checks          |
| `yarn lint`      | Run Biome lint                             |
| `yarn lint:fix`  | Run Biome check (lint + format) with fixes |
| `yarn format`    | Run Biome format                           |
```

- [ ] **Step 2: Add a one-line note in the Contributing section**

In the `## Contributing` section, after the existing `Pre-commit hooks run lint-staged automatically.` line, add:

```markdown
5. SCSS and Markdown files are not formatted by tooling — follow the
   `.editorconfig` settings (2-space indent, LF line endings, UTF-8).
```

(Renumber as needed if the existing list ends at item 4 — currently it does.)

- [ ] **Step 3: Verify the README renders correctly**

```bash
yarn biome check --no-errors-on-unmatched README.md || true
```

Biome does not lint Markdown; the command is a sanity check that no globbing rules are accidentally targeting it. Then visually inspect:

```bash
head -100 README.md
```

Expected: the Scripts table is well-formed, the Contributing list reads naturally with the new bullet 5.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: update scripts table and contributing for biome"
```

---

## Task 9: Final verification

No file changes. This is the gate before opening the PR.

- [ ] **Step 1: Clean install from scratch**

```bash
rm -rf node_modules
yarn install --frozen-lockfile
```

Expected: install completes; no peer-dependency warnings about missing ESLint plugins.

- [ ] **Step 2: Run all checks end to end**

```bash
yarn lint
yarn typecheck
yarn build
```

Expected: all three pass, exit 0.

- [ ] **Step 3: Confirm package counts match the spec**

```bash
node -e "
const p = require('./package.json');
const removed = ['eslint','@eslint/js','eslint-config-prettier','eslint-plugin-prettier','eslint-plugin-react','eslint-plugin-react-hooks','@typescript-eslint/eslint-plugin','@typescript-eslint/parser','globals','prettier'];
const stillThere = removed.filter(n => p.devDependencies?.[n] || p.dependencies?.[n]);
console.log('still present (should be empty):', stillThere);
console.log('biome present:', !!p.devDependencies['@biomejs/biome']);
"
```

Expected output:

```
still present (should be empty): []
biome present: true
```

- [ ] **Step 4: Confirm the deleted files are gone**

```bash
test ! -e eslint.config.mjs && echo "eslint config: gone"
test ! -e prettier.config.mjs && echo "prettier config: gone"
test -e biome.json && echo "biome.json: present"
test -x .husky/pre-push && echo "pre-push: present and executable"
```

Expected: all four lines print.

- [ ] **Step 5: Confirm the hook chain works on a real commit**

Make a trivial change, commit it, and check that Biome ran (look at the `lint-staged` output):

```bash
echo "" >> src/components/footer/footer.tsx
git add src/components/footer/footer.tsx
git commit -m "test: hook smoke test"
```

Expected: `lint-staged` output mentions `biome check --write`. Then revert:

```bash
git reset --hard HEAD~1
```

- [ ] **Step 6: Push and open a PR**

```bash
git push -u origin biome-migration
gh pr create --title "Switch lint/format toolchain to Biome (drop ESLint + Prettier)" --body "$(cat <<'EOF'
## Summary

- Replace ESLint (8 packages + plugins) and Prettier with `@biomejs/biome` 2.x.
- SCSS and Markdown fall back to EditorConfig only (no formatter tool).
- Add `.husky/pre-push` running `yarn typecheck` (folds in category F).
- CI lint step becomes `npx biome ci .`.

Spec: `docs/superpowers/specs/2026-05-03-biome-migration-design.md`
Plan: `docs/superpowers/plans/2026-05-03-biome-migration.md`

## Test plan

- [ ] CI green (build, typecheck, biome ci)
- [ ] Local `yarn lint && yarn typecheck && yarn build` pass
- [ ] `pre-commit` runs Biome on a sample commit
- [ ] `pre-push` runs `yarn typecheck` on a sample push
EOF
)"
```

Expected: PR opened, CI starts, all three jobs (build/typecheck/biome ci) pass.

---

## Self-Review Notes

- **Spec coverage**: every spec section has a task — §5.2 → T1, §5.3 → T1, §5.4 → T2, §5.5 → T6, §5.6 → T2, §5.7 → T7, §6 (deletions) → T4 + T5, §7 (steps 1-10) mapped to T1–T9, §8 R2 (README contributing note) → T8.
- **Placeholders**: none. Every command and code block is concrete.
- **Type/name consistency**: `biome.json` schema keys (`useExhaustiveDependencies`, `useHookAtTopLevel`, `assist.actions.source.organizeImports`) are used consistently. The plan flags that schema keys must be confirmed against the Biome 2.4.x schema in T1 step 3 — the implementer is told what to do if a key has moved.
- **Sequencing risk addressed**: T2 (switch lint-staged to Biome) runs _before_ T3 (bulk reformat) so the bulk-format commit is processed by Biome and not double-touched by Prettier.
