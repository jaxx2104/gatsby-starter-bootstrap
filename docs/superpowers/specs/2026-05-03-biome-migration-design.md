# S2: Biome Migration (Drop Prettier Entirely) — Design

Status: draft
Owner: jaxx2104
Date: 2026-05-03
Scope tag: S2 (with F merged in)

## 1. Goal

Consolidate the lint/format toolchain on **Biome alone** so that
`devDependencies` and configuration files for code style shrink to the smallest
viable surface, lowering the cost of dependency updates and configuration
maintenance.

## 2. Success Criteria

- Remove the entire ESLint and Prettier toolchain from `devDependencies`
  (10 packages) and replace with `@biomejs/biome` (1 package).
- `yarn lint`, `yarn lint:fix`, and `yarn format` each resolve to a single
  Biome invocation.
- The CI lint job is `npx biome ci .` (one line).
- `pre-commit` runs Biome on staged files; `pre-push` runs `yarn typecheck`.
- A clean local run of `yarn lint && yarn typecheck && yarn build` passes.
- No semantic regression in lint coverage for code we actually rely on
  (React 19 hooks rules, JSX correctness, unused imports/vars).

## 3. Scope

### In scope

- Lint and format of `*.{ts,tsx,js,mjs,json}` via Biome.
- Replace `eslint.config.mjs` with `biome.json`.
- Delete `prettier.config.mjs`.
- Update `package.json` scripts and `lint-staged` config.
- Update `.husky/pre-commit` (no behavior change) and add `.husky/pre-push`
  running `yarn typecheck` (folds in category **F**).
- Update `.github/workflows/ci.yml` lint step.
- Update `README.md` Scripts table.

### Out of scope / explicit non-goals

- **SCSS formatting**: handled by EditorConfig + the IDE. The repo has six
  SCSS files; introducing a stylelint or dprint dependency would defeat the
  consolidation goal.
- **Markdown formatting**: handled by EditorConfig + the author. `textlint`
  remains for Japanese prose linting under `content/`.
- **typescript-eslint type-checked rules**: never adopted; nothing is lost.
- **No new tools** beyond `@biomejs/biome` (no stylelint, no dprint, no
  markdownlint).

## 4. Toolchain (after migration)

| Role            | Tool                     | Targets                         |
| --------------- | ------------------------ | ------------------------------- |
| Lint            | Biome 2.x                | `*.{ts,tsx,js,mjs,json}`        |
| Format          | Biome 2.x                | `*.{ts,tsx,js,mjs,json}`        |
| Import ordering | Biome (organize imports) | same as above                   |
| Prose lint (JA) | textlint                 | `content/**/*.md`               |
| pre-commit      | husky + lint-staged      | runs Biome on staged JS/TS/JSON |
| pre-push        | husky                    | runs `yarn typecheck`           |
| Style files     | EditorConfig only        | `*.scss`, `*.md`                |

## 5. Key Design Decisions

### 5.1 Biome version

Adopt Biome 2.x (latest stable). Verified to support TypeScript 5.6, React 19,
JSX, and ES2024 syntax. The single dependency replaces ten.

### 5.2 `biome.json` baseline

- Enable Biome's `recommended` ruleset (`linter.rules.recommended = true`).
- React 19 uses the automatic JSX runtime; the equivalent of
  `react/react-in-jsx-scope` is not enforced (Biome does not require it).
- Import ordering: enable Biome's organize-imports assist
  (`assist.actions.source.organizeImports = "on"` — confirm exact key
  against the Biome 2.x schema during implementation).
- Formatter settings mirror the existing Prettier config to minimize churn:
  - `indentStyle = "space"`, `indentWidth = 2`
  - `lineWidth = 80`
  - `quoteStyle = "single"` (JS), `jsxQuoteStyle = "double"`
  - `trailingCommas = "es5"`
  - `semicolons = "asNeeded"`

### 5.3 React-hooks coverage

Enable as `error` (rule paths to be confirmed against the Biome 2.x docs at
implementation time — the categories below match Biome 2 at the time of
writing):

- `correctness/useExhaustiveDependencies`
- `correctness/useHookAtTopLevel`

These cover what `eslint-plugin-react-hooks` enforces today. If a rule has
moved category in the Biome version pinned by the PR, update the path; do not
disable the rule.

### 5.4 lint-staged

```jsonc
{
  "lint-staged": {
    "*.{ts,tsx,js,mjs,json}": ["biome check --write --no-errors-on-unmatched"],
  },
}
```

SCSS and Markdown entries are removed deliberately — they are no longer
formatted by tooling.

### 5.5 Husky hooks (folds in F)

- `.husky/pre-commit`: unchanged content (`yarn lint-staged`).
- `.husky/pre-push` (new): runs `yarn typecheck` and aborts the push on
  failure. `yarn typecheck` completes in seconds today, so the friction is
  acceptable.

### 5.6 `package.json` scripts

```jsonc
{
  "scripts": {
    "lint": "biome lint .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write .",
    "ci:lint": "biome ci .",
    // lint:text and lint:textfix kept as-is
  },
}
```

### 5.7 CI workflow

`.github/workflows/ci.yml` lint step becomes:

```yaml
- run: npx biome ci .
```

`biome ci` runs format, lint, and import checks in a CI-tuned mode (no
auto-fix, non-zero exit on any finding). Local development continues to use
`yarn lint` (= `biome lint .`) and `yarn lint:fix` (= `biome check --write .`).
Build and typecheck steps remain unchanged.

## 6. Package Diff

### Removed (10)

- `eslint`
- `@eslint/js`
- `eslint-config-prettier`
- `eslint-plugin-prettier`
- `eslint-plugin-react`
- `eslint-plugin-react-hooks`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `globals`
- `prettier`

### Added (1)

- `@biomejs/biome`

### Retained

- `husky`, `lint-staged`, `textlint`, `textlint-rule-preset-japanese`,
  `typescript`.

### Files removed

- `eslint.config.mjs`
- `prettier.config.mjs`

### Files added

- `biome.json`
- `.husky/pre-push`

## 7. Migration Steps (high level)

1. Add `@biomejs/biome` to devDependencies.
2. Create `biome.json` per §5.2 / §5.3.
3. Run `yarn biome check --write .` to apply formatting and safe fixes
   across the repo.
4. Review the diff: it should be mechanical (quote style, import order,
   whitespace). Spot-check a few hot files.
5. Delete the ten ESLint/Prettier packages and the two config files.
6. Rewrite `package.json` `scripts` and `lint-staged` per §5.4 / §5.6.
7. Add `.husky/pre-push` per §5.5.
8. Update `.github/workflows/ci.yml` per §5.7.
9. Update `README.md` Scripts table.
10. Verify locally: `yarn lint`, `yarn typecheck`, `yarn build` pass; commit
    a sample file to confirm `pre-commit` runs Biome; trigger a pre-push to
    confirm typecheck runs.

## 8. Risks and Mitigations

- **R1 — Biome rules diverge from ESLint**: new findings or missed findings
  may appear.
  - _Mitigation_: review `biome check .` output during the migration PR;
    enable/disable individual rules to match intent.
- **R2 — SCSS/MD style drift across contributors**: no formatter enforces
  layout.
  - _Mitigation_: add a one-line note in `README.md` (Contributing) that
    SCSS and Markdown follow EditorConfig only. Surface area is small
    (six SCSS files; Markdown is mostly the author's blog posts).
- **R3 — `pre-push` typecheck slows pushes**: friction during rapid commits.
  - _Mitigation_: `yarn typecheck` is fast on this codebase. If it grows,
    revisit `tsc --incremental` or move typecheck to CI-only.
- **R4 — Biome major bumps**: Biome is on a fast cadence and may change
  defaults.
  - _Mitigation_: pin a minor in `package.json` (`^2.x`) and rely on the
    soon-to-be-restored update flow (S1: Dependabot) for visibility.

### Rollback

The migration is a single PR. Reverting that PR restores the prior toolchain.

## 9. Out-of-PR Follow-ups

- Category F (pre-push typecheck) is folded into this PR; no follow-up.
- README documentation update for Contributing is in scope (§7 step 9 / R2).
- If Biome later adds SCSS or Markdown support, revisit §3 to bring those
  files back under tooling.
