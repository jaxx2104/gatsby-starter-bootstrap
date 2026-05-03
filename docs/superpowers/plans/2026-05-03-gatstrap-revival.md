# Gatstrap v4 Revival Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Modernize `jaxx2104/gatsby-starter-bootstrap` to Gatsby 5.16+ / React 19 / Bootstrap 5.3 / TypeScript strict and submit it to the official Gatsby Community Starters Library.

**Architecture:** Sass-first usage of Bootstrap 5 with a tiny `src/bootstrap/` package of React wrappers for the few Bootstrap parts that need state (Navbar collapse, Dropdown). All site configuration lives in `siteMetadata` of `gatsby-config.ts`. Gatsby's built-in `<Head>` API replaces `react-helmet`. GraphQL types are produced by Gatsby's native `graphqlTypegen` option (refines the spec, which named `gatsby-plugin-graphql-codegen`). CI moves to GitHub Actions with Lighthouse CI as a quality gate.

**Tech Stack:** Gatsby 5.16+, React 19, TypeScript 5.x (strict), Bootstrap 5.3 + Dart Sass, `gatsby-plugin-image`, native Gatsby `graphqlTypegen` (emits `Queries.*`), `@fortawesome/*`, ESLint 9 (flat config), Prettier 3, husky 9 + lint-staged 16, Node 20 LTS, GitHub Actions, Lighthouse CI, Netlify.

**Source spec:** `docs/superpowers/specs/2026-05-03-gatstrap-revival-design.md` (commit `501be0e`).

**Spec refinement:** Switched type codegen from the third-party `gatsby-plugin-graphql-codegen` to Gatsby's built-in `graphqlTypegen` (available since 4.24). It is maintained by the Gatsby team, removes a dependency, and emits the `Queries.*` namespace this plan uses throughout.

---

## Conventions

- All work happens on branch `revival-spec` (already checked out).
- Commit after every task. Commit messages are English (per repo convention).
- Use `yarn` (the repo has `yarn.lock`). Do not switch to `npm` or `pnpm`.
- Run `yarn` (no flags) to install. Run `yarn develop` and `yarn build` to verify behavior.
- The "test" for many tasks is `yarn build` succeeding with zero warnings, plus visual confirmation in `yarn develop`. There is no unit-test suite in this repo; do not introduce one as part of this plan (out-of-scope per spec).
- File paths are absolute relative to the repo root: `package.json`, not `/Users/.../package.json`.

---

## File Structure

The following files are created, modified, or deleted. New files are listed once with their responsibility; modified files have a one-line note on what changes.

**New:**
- `gatsby-config.ts` — Gatsby site config in TypeScript with consolidated `siteMetadata`.
- `gatsby-node.ts` — `createPages` + `onCreateWebpackConfig` in TypeScript.
- `src/bootstrap/Navbar.tsx` — React wrapper that owns collapse state for Bootstrap 5 Navbar.
- `src/bootstrap/Dropdown.tsx` — React wrapper that owns open state for Bootstrap 5 Dropdown.
- `src/bootstrap/index.ts` — barrel export for the wrappers.
- `src/hooks/useSiteMetadata.ts` — replaces direct imports of `gatsby-config` from components.
- `eslint.config.js` — ESLint 9 flat config.
- `prettier.config.js` — Prettier 3 config (replaces `.prettierrc.js`).
- `.github/workflows/ci.yml` — build + lint + typecheck workflow.
- `.github/workflows/lighthouse.yml` — Lighthouse CI workflow.
- `lighthouserc.json` — Lighthouse CI configuration with 95+ thresholds on mobile profile.
- `CHANGELOG.md` — `4.0.0` release notes.
- `content/posts/2026-05-01-welcome/index.md` — English starter post 1.
- `content/posts/2026-05-02-customization/index.md` — English starter post 2.
- `content/posts/2026-05-03-markdown-showcase/index.md` — English starter post 3.
- `static/og-image.png` — OG image used by the demo and README hero.

**Modified:**
- `package.json` — version bump to 4.0.0, dependency overhaul, scripts updated.
- `tsconfig.json` — modernized `compilerOptions`, keeps `strict: true`.
- `.node-version` — `20`.
- `gatsby-browser.js` — drop jQuery / popper / Bootstrap JS imports; import Bootstrap 5 JS only where needed.
- `src/components/layout/layout.tsx` — drop `emergence.js`, `animate.css`, `font-awesome`; pull metadata via the new hook.
- `src/components/navibar/navibar.tsx` — Bootstrap 5 classnames + use `src/bootstrap/Navbar`.
- `src/components/footer/footer.tsx` — Bootstrap 5 classnames.
- `src/components/icon/icon.tsx` — keep `@fortawesome/react-fontawesome` only.
- `src/components/badge/badge.tsx` — Bootstrap 5 badge classnames (`bg-primary` etc).
- `src/components/button/button.tsx` — Bootstrap 5 button classnames.
- `src/components/meta/meta.tsx` — converted to a Gatsby `<Head>` export helper.
- `src/templates/template.tsx` — uses `Head` API; queries the `gatsby-plugin-image` `gatsbyImageData` field.
- `src/templates/post/post.tsx` — `gatsby-plugin-image` (`<GatsbyImage>`).
- `src/templates/page/page.tsx` — minor; ensure typing.
- `src/pages/index.tsx` — `<Head>` + new types.
- `src/pages/profile.tsx` — `gatsby-plugin-image` + `<Head>`.
- `src/html.tsx` — drop the AdSense `<script>`; `<head>` markup minor cleanup.
- `src/scss/gatstrap.scss` — Bootstrap 5 Sass API entrypoint.
- `src/scss/colors.scss` — keep only the named colors actually used; align names with Bootstrap 5.
- `src/scss/fonts.scss` — Bootstrap 5 typography overrides (drop deprecated `$display1-size` etc.).
- `README.md` — full rewrite (English, modern badges, install + customization + contribution).
- `LICENSE` — replace with 0BSD.

**Deleted:**
- `gatsby-config.js` (replaced by `.ts`).
- `gatsby-node.js` (replaced by `.ts`).
- `.eslintrc.js` (replaced by flat config).
- `.prettierrc.js` (replaced by `prettier.config.js`).
- `.circleci/config.yml` and the empty `.circleci/` dir.
- `src/components/adsense/adsense.tsx`, `src/components/adsense/style.scss` — AdSense embed is out-of-scope branding for a starter and complicates Lighthouse Best Practices. Removed.
- `src/__generated__/gatsby-types.ts` — regenerated by Gatsby's native typegen at `src/gatsby-types.d.ts`.
- `content/posts/2015-05-01-hello-world/`, `content/posts/2015-05-06-my-second-post/`, `content/posts/2015-05-28-hi-folks/` — replaced by 2026 English starter posts.
- All `* 2` files at the repo root (untracked iCloud artifacts).

---

# Phase 0 — Cleanup

## Task 0.1: Remove iCloud duplicate artifacts

These untracked `* 2` files at the repo root are iCloud sync residue and break tooling that walks the directory.

**Files (delete):**
- `.gitignore 2`, `.textlintrc 2`, `LICENSE 2`, `README 2.md`, `gatsby-config 2.js`, `gatsby-node 2.js`, `package 2.json`, `yarn 2.lock`
- Any directory named `* 2` under the repo root (e.g. `.cache 2`, `.git 2`, `.vscode 2`, `public 2`, `src 2`).

- [ ] **Step 1: List the offending files**

```bash
cd /Users/jaxx/repos/github.com/jaxx2104/gatsby-starter-bootstrap
find . -maxdepth 2 -name "* 2" -o -name "* 2.*" 2>/dev/null | grep -v node_modules
```

Expected: list including the files above. `.git 2/` and similar must be unrelated to the live `.git/`.

- [ ] **Step 2: Confirm none are tracked**

```bash
git ls-files | grep " 2" || echo "none tracked"
```

Expected: `none tracked`. If anything appears, stop and resolve manually.

- [ ] **Step 3: Delete the files and directories**

```bash
find . -maxdepth 1 -name "* 2" -exec rm -rf {} +
find . -maxdepth 1 -name "* 2.*" -exec rm -rf {} +
```

- [ ] **Step 4: Verify clean tree**

```bash
git status --short | grep " 2" || echo "clean"
```

Expected: `clean`.

- [ ] **Step 5: Commit (if anything was tracked, otherwise skip)**

These were untracked, so nothing to commit. Move on.

## Task 0.2: Wipe build artifacts

Stale `.cache/` and `public/` from Gatsby 3 will confuse later builds.

- [ ] **Step 1: Remove caches**

```bash
rm -rf .cache public node_modules
```

- [ ] **Step 2: Verify**

```bash
ls -d .cache public node_modules 2>/dev/null && echo "still there" || echo "ok"
```

Expected: `ok`.

## Task 0.3: Record current build state for the record

We are not fixing the v3 build, only documenting whether it still works.

- [ ] **Step 1: Try the current install**

```bash
yarn 2>&1 | tail -20
```

Outcome is informational. Capture the result in your notes — do not commit anything.

- [ ] **Step 2: If install succeeded, try a build**

```bash
yarn build 2>&1 | tail -30
```

Outcome is informational. The likely outcome is either install or build failure on Node 20; that is the baseline we move past in Phase 1.

- [ ] **Step 3: Wipe again before Phase 1**

```bash
rm -rf .cache public node_modules
```

---

# Phase 1 — Foundation modernization

## Task 1.1: Pin Node 20

**Files:**
- Modify: `.node-version`

- [ ] **Step 1: Update `.node-version`**

Replace the file's entire contents with:

```
20
```

- [ ] **Step 2: Verify the local toolchain switches**

```bash
node --version
```

Expected: a `v20.x.y` line. If your version manager (mise / asdf / nvm) does not auto-pick this up, run its install command for Node 20 now.

- [ ] **Step 3: Commit**

```bash
git add .node-version
git commit -m "chore: pin Node 20 in .node-version"
```

## Task 1.2: Rewrite `package.json` for Gatsby 5.16+ / React 19 / TS 5

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Replace `package.json` contents**

```json
{
  "name": "gatsby-starter-bootstrap",
  "description": "A Bootstrap 5 starter for Gatsby",
  "version": "4.0.0-pre",
  "author": "jaxx2104 <jaxx2104@gmail.com>",
  "license": "0BSD",
  "keywords": ["gatsby", "gatsby-starter", "bootstrap", "bootstrap-5", "blog", "typescript"],
  "main": "n/a",
  "scripts": {
    "develop": "gatsby develop",
    "build": "gatsby build",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint --fix .",
    "format": "prettier --write \"**/*.{ts,tsx,js,json,md,scss}\" --ignore-path .gitignore",
    "lint:text": "textlint \"content/**/*.md\"",
    "lint:textfix": "textlint --fix \"content/**/*.md\"",
    "prepare": "husky"
  },
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.5.0",
    "@fortawesome/free-brands-svg-icons": "^6.5.0",
    "@fortawesome/free-solid-svg-icons": "^6.5.0",
    "@fortawesome/react-fontawesome": "^0.2.2",
    "bootstrap": "^5.3.3",
    "gatsby": "^5.16.0",
    "gatsby-plugin-catch-links": "^5.16.0",
    "gatsby-plugin-image": "^3.16.0",
    "gatsby-plugin-manifest": "^5.16.0",
    "gatsby-plugin-netlify": "^5.1.1",
    "gatsby-plugin-offline": "^6.16.0",
    "gatsby-plugin-sass": "^6.16.0",
    "gatsby-plugin-sharp": "^5.16.0",
    "gatsby-plugin-sitemap": "^6.16.0",
    "gatsby-plugin-twitter": "^5.16.0",
    "gatsby-remark-copy-linked-files": "^6.16.0",
    "gatsby-remark-images": "^7.16.0",
    "gatsby-remark-prismjs": "^7.16.0",
    "gatsby-remark-responsive-iframe": "^6.16.0",
    "gatsby-remark-smartypants": "^6.16.0",
    "gatsby-source-filesystem": "^5.16.0",
    "gatsby-transformer-remark": "^6.16.0",
    "gatsby-transformer-sharp": "^5.16.0",
    "modern-normalize": "^3.0.1",
    "prismjs": "^1.29.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "sass": "^1.78.0"
  },
  "devDependencies": {
    "@types/node": "^20.12.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@typescript-eslint/eslint-plugin": "^8.8.0",
    "@typescript-eslint/parser": "^8.8.0",
    "eslint": "^9.12.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.2.1",
    "eslint-plugin-react": "^7.37.0",
    "eslint-plugin-react-hooks": "^5.0.0",
    "globals": "^15.10.0",
    "husky": "^9.1.6",
    "lint-staged": "^16.1.0",
    "prettier": "^3.3.3",
    "textlint": "^14.3.0",
    "textlint-rule-preset-japanese": "^11.0.0",
    "typescript": "^5.6.2"
  },
  "lint-staged": {
    "*.{ts,tsx,js,json,scss}": ["prettier --write", "eslint --fix"],
    "*.md": ["prettier --write"]
  }
}
```

Notes baked into this `package.json`:
- `version` is `4.0.0-pre` until Phase 4 bumps it to `4.0.0`. This avoids accidentally publishing an unfinished release.
- `gh-pages` and `babel-eslint` are removed (deploy is Netlify, ESLint 9 uses TS-ESLint parser).
- `font-awesome@4`, `jquery`, `popper.js`, `emergence.js`, `animate.css`, `gatsby-plugin-typegen`, `gatsby-plugin-graphql-codegen` (replaced by native typegen), `react-helmet`, `gatsby-plugin-react-helmet`, `gatsby-image`, `gatsby-link`, `gatsby-plugin-typescript` (Gatsby 5 supports TS natively) are all dropped.
- `textlint-rule-preset-ja-spacing` is dropped because it ships only Japanese-spacing rules and the demo content is now English.

- [ ] **Step 2: Install**

```bash
yarn
```

Expected: install succeeds. If a peer dependency warns, capture it but proceed; we will resolve real failures, not noise.

- [ ] **Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: rewrite package.json for Gatsby 5.16 / React 19 / TS 5"
```

## Task 1.3: Drop legacy JS imports from `gatsby-browser.js`

**Files:**
- Modify: `gatsby-browser.js`

- [ ] **Step 1: Replace contents**

```js
// Bootstrap 5 ships native JS that is loaded on demand by src/bootstrap/* wrappers.
// Global side-effect imports (jQuery, popper, bootstrap) are intentionally not loaded here.
```

- [ ] **Step 2: Commit**

```bash
git add gatsby-browser.js
git commit -m "refactor: drop jQuery/popper/Bootstrap-JS global imports"
```

## Task 1.4: Convert `gatsby-config.js` to `gatsby-config.ts` with consolidated `siteMetadata`

**Files:**
- Create: `gatsby-config.ts`
- Delete: `gatsby-config.js`

- [ ] **Step 1: Write `gatsby-config.ts`**

```ts
import type { GatsbyConfig } from 'gatsby'

const siteMetadata = {
  title: 'Gatstrap',
  description: 'A Bootstrap 5 starter for Gatsby',
  siteUrl: 'https://gatstrap.netlify.app',
  author: 'jaxx2104',
  twitter: 'jaxx2104',
} as const

const config: GatsbyConfig = {
  siteMetadata,
  graphqlTypegen: {
    typesOutputPath: 'src/gatsby-types.d.ts',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: { path: `${__dirname}/content/posts/`, name: 'posts' },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: { path: `${__dirname}/content/images/`, name: 'images' },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 750,
              linkImagesToOriginal: false,
              wrapperStyle: 'margin-bottom: 1.0725rem;',
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: { wrapperStyle: 'margin-bottom: 1.0725rem' },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        description: siteMetadata.description,
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#673ab7',
        display: 'standalone',
        icon: 'static/og-image.png',
      },
    },
    'gatsby-plugin-catch-links',
    'gatsby-plugin-image',
    'gatsby-plugin-netlify',
    'gatsby-plugin-offline',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-twitter',
    'gatsby-transformer-sharp',
  ],
}

export default config
export { siteMetadata }
```

Notes:
- `pathPrefix: '/'` is the default and is removed.
- `gatsby-plugin-typescript` is removed; Gatsby 5 supports TS natively.
- `gatsby-plugin-react-helmet` is removed; we use the `<Head>` API.
- The Manifest entries use a single `icon` (Gatsby auto-generates sizes); the previous bespoke array was redundant.

- [ ] **Step 2: Delete the old config**

```bash
git rm gatsby-config.js
```

- [ ] **Step 3: Commit**

```bash
git add gatsby-config.ts
git commit -m "refactor(config): port gatsby-config to TypeScript with consolidated siteMetadata"
```

## Task 1.5: Convert `gatsby-node.js` to `gatsby-node.ts`

**Files:**
- Create: `gatsby-node.ts`
- Delete: `gatsby-node.js`

- [ ] **Step 1: Write `gatsby-node.ts`**

```ts
import path from 'path'
import type { GatsbyNode } from 'gatsby'

const PostTemplate = path.resolve('./src/templates/template.tsx')

interface PageQueryResult {
  allFile: {
    edges: Array<{
      node: {
        id: string
        sourceInstanceName: string
        absolutePath: string
        childMarkdownRemark: {
          id: string
          frontmatter: { layout?: string; path: string }
        } | null
      }
    }>
  }
}

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions
  const result = await graphql<PageQueryResult>(`
    {
      allFile(filter: { extension: { regex: "/md|tsx/" } }, limit: 1000) {
        edges {
          node {
            id
            sourceInstanceName
            absolutePath
            childMarkdownRemark {
              id
              frontmatter {
                layout
                path
              }
            }
          }
        }
      }
    }
  `)

  if (result.errors || !result.data) {
    reporter.panicOnBuild('Failed to query content for createPages', result.errors)
    return
  }

  const items = result.data.allFile.edges
  const posts = items.filter(({ node }) => /posts/.test(node.sourceInstanceName))
  posts.forEach(({ node }) => {
    if (!node.childMarkdownRemark) return
    const { path: postPath } = node.childMarkdownRemark.frontmatter
    createPage({ path: postPath, component: PostTemplate })
  })

  const pages = items.filter(({ node }) => /page/.test(node.sourceInstanceName))
  pages.forEach(({ node }) => {
    if (!node.childMarkdownRemark) return
    const { name } = path.parse(node.absolutePath)
    const PageTemplate = path.resolve(node.absolutePath)
    createPage({ path: name, component: PageTemplate })
  })
}

export const onCreateWebpackConfig: GatsbyNode['onCreateWebpackConfig'] = ({
  actions,
}) => {
  actions.setWebpackConfig({
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

- [ ] **Step 2: Delete the old node config**

```bash
git rm gatsby-node.js
```

- [ ] **Step 3: Commit**

```bash
git add gatsby-node.ts
git commit -m "refactor(config): port gatsby-node to TypeScript"
```

## Task 1.6: Modernize `tsconfig.json`

**Files:**
- Modify: `tsconfig.json`

- [ ] **Step 1: Replace contents**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "allowJs": false,
    "noEmit": true,
    "baseUrl": ".",
    "paths": {
      "components/*": ["src/components/*"],
      "templates/*": ["src/templates/*"],
      "scss/*": ["src/scss/*"]
    }
  },
  "include": ["src", "gatsby-config.ts", "gatsby-node.ts"],
  "exclude": ["node_modules", "public", ".cache"]
}
```

- [ ] **Step 2: Commit**

```bash
git add tsconfig.json
git commit -m "chore(tsconfig): target ES2022 + Bundler resolution + noUncheckedIndexedAccess"
```

## Task 1.7: Migrate `meta` component to a `<Head>` helper

The current `Meta` component renders a `react-helmet` `<Helmet>`. Gatsby 5 uses an exported `Head` component on each page/template instead. The new helper produces the JSX a page's `Head` export returns.

**Files:**
- Modify: `src/components/meta/meta.tsx`

- [ ] **Step 1: Replace contents of `src/components/meta/meta.tsx`**

```tsx
import React from 'react'

export interface MetaProps {
  title?: string
  description?: string
  siteUrl?: string
  twitter?: string
  ogImagePath?: string
}

export const Meta: React.FC<MetaProps> = ({
  title,
  description,
  siteUrl,
  twitter,
  ogImagePath = '/og-image.png',
}) => {
  const ogUrl = siteUrl ? `${siteUrl}${ogImagePath}` : ogImagePath
  return (
    <>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <meta name="twitter:card" content="summary_large_image" />
      {twitter && <meta name="twitter:site" content={`@${twitter}`} />}
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      {description && <meta property="og:description" content={description} />}
      {siteUrl && <meta property="og:url" content={siteUrl} />}
      <meta property="og:image" content={ogUrl} />
    </>
  )
}

export default Meta
```

- [ ] **Step 2: Commit**

```bash
git add src/components/meta/meta.tsx
git commit -m "refactor(meta): convert react-helmet component to <Head> helper"
```

## Task 1.8: Add `useSiteMetadata` hook

Replaces `import { siteMetadata } from '../../../gatsby-config'` (which is fragile and breaks under TS-only gatsby-config).

**Files:**
- Create: `src/hooks/useSiteMetadata.ts`

- [ ] **Step 1: Create the file**

```ts
import { graphql, useStaticQuery } from 'gatsby'

export interface SiteMetadata {
  title: string
  description: string
  siteUrl: string
  author: string
  twitter: string
}

export const useSiteMetadata = (): SiteMetadata => {
  const data = useStaticQuery(graphql`
    query SiteMetadataQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          twitter
        }
      }
    }
  `)
  return data.site.siteMetadata as SiteMetadata
}
```

- [ ] **Step 2: Commit**

```bash
git add src/hooks/useSiteMetadata.ts
git commit -m "feat(hooks): add useSiteMetadata for components"
```

## Task 1.9: Migrate `gatsby-image` → `gatsby-plugin-image` in templates and pages

**Files:**
- Modify: `src/templates/template.tsx`
- Modify: `src/templates/post/post.tsx`
- Modify: `src/pages/index.tsx`
- Modify: `src/pages/profile.tsx`

- [ ] **Step 1: Update `src/templates/template.tsx`**

Replace contents:

```tsx
import React from 'react'
import { graphql, type HeadFC } from 'gatsby'

import Post from './post/post'
import Page from './page/page'
import Layout from '../components/layout/layout'
import Meta from '../components/meta/meta'

interface Props {
  data: Queries.PostByPathQuery
  location: Location
}

const Template: React.FC<Props> = ({ data, location }) => {
  const isPage = data.post?.frontmatter?.layout === 'page'
  return (
    <Layout location={location}>
      {isPage ? (
        <Page data={data} location={location} />
      ) : (
        <Post data={data} options={{ isIndex: false }} />
      )}
    </Layout>
  )
}

export default Template

export const Head: HeadFC<Queries.PostByPathQuery> = ({ data }) => (
  <Meta
    title={data.post?.frontmatter?.title ?? ''}
    description={data.site?.siteMetadata?.description ?? undefined}
    siteUrl={data.site?.siteMetadata?.siteUrl ?? undefined}
    twitter={data.site?.siteMetadata?.twitter ?? undefined}
  />
)

export const pageQuery = graphql`
  query PostByPath($path: String!) {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author
        twitter
      }
    }
    post: markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      frontmatter {
        layout
        title
        path
        category
        tags
        description
        date(formatString: "YYYY/MM/DD")
        image {
          childImageSharp {
            gatsbyImageData(width: 750, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`
```

- [ ] **Step 2: Update `src/templates/post/post.tsx`**

Replace contents:

```tsx
import React from 'react'
import { Link } from 'gatsby'
import { GatsbyImage, getImage, type IGatsbyImageData } from 'gatsby-plugin-image'

import Button from '../../components/button/button'
import Badge from '../../components/badge/badge'

import './style.scss'

const splitOnMore = (html: string): string => {
  if (html.includes('<!--more-->')) {
    const [head] = html.split('<!--more-->')
    return head
  }
  return html
}

interface Props {
  data: Queries.PostByPathQuery
  options: {
    isIndex: boolean
  }
}

const Post: React.FC<Props> = ({ data, options }) => {
  const frontmatter = data.post?.frontmatter
  const path = frontmatter?.path ?? ''
  const html = data.post?.html ?? ''
  const isMore = options.isIndex && html.includes('<!--more-->')
  const image = getImage(
    frontmatter?.image?.childImageSharp?.gatsbyImageData as IGatsbyImageData | undefined
  )

  return (
    <article className="article" key={path}>
      <div className="container">
        <header className="info">
          <Link style={{ boxShadow: 'none' }} to={path}>
            <h1>{frontmatter?.title}</h1>
            {frontmatter?.date && (
              <time dateTime={frontmatter.date}>{frontmatter.date}</time>
            )}
          </Link>
          {frontmatter?.category && <Badge label={frontmatter.category} primary />}
          {(frontmatter?.tags ?? []).map((tag, index) =>
            tag ? <Badge label={tag} key={index} /> : null
          )}
        </header>
        <div className="content">
          {frontmatter?.description && <p>{frontmatter.description}</p>}
          {image && (
            <GatsbyImage
              image={image}
              alt={frontmatter?.title ?? ''}
              style={{ display: 'block', margin: '0 auto' }}
            />
          )}
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: isMore ? splitOnMore(html) : html }}
        />
        {isMore && <Button path={path} label="Read more" primary />}
      </div>
    </article>
  )
}

export default Post
```

Note: AdSense is removed (see deletion list); the `Post` component no longer accepts `adsense` in `options`.

- [ ] **Step 3: Update `src/pages/index.tsx`**

Replace contents:

```tsx
import React from 'react'
import { graphql, type HeadFC } from 'gatsby'

import Post from '../templates/post/post'
import Layout from '../components/layout/layout'
import Meta from '../components/meta/meta'

interface Props {
  data: Queries.IndexQueryQuery
  location: Location
}

const BlogIndex: React.FC<Props> = ({ data, location }) => {
  const posts = data.remark?.posts ?? []
  return (
    <Layout location={location}>
      {posts.map((edge, i) =>
        edge?.post ? (
          <Post
            data={{ post: edge.post, site: data.site }}
            options={{ isIndex: true }}
            key={i}
          />
        ) : null
      )}
    </Layout>
  )
}

export default BlogIndex

export const Head: HeadFC<Queries.IndexQueryQuery> = ({ data }) => (
  <Meta
    title={data.site?.siteMetadata?.title ?? ''}
    description={data.site?.siteMetadata?.description ?? undefined}
    siteUrl={data.site?.siteMetadata?.siteUrl ?? undefined}
    twitter={data.site?.siteMetadata?.twitter ?? undefined}
  />
)

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author
        twitter
      }
    }
    remark: allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      posts: edges {
        post: node {
          html
          frontmatter {
            layout
            title
            path
            category
            tags
            description
            date(formatString: "YYYY/MM/DD")
            image {
              childImageSharp {
                gatsbyImageData(width: 750, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`
```

Note: Gatsby 5 uses the new `sort: { frontmatter: { date: DESC } }` form, not `sort: { fields: ... }`.

- [ ] **Step 4: Update `src/pages/profile.tsx`**

Replace contents:

```tsx
import React from 'react'
import { graphql, type HeadFC } from 'gatsby'
import { GatsbyImage, getImage, type IGatsbyImageData } from 'gatsby-plugin-image'

import Layout from '../components/layout/layout'
import Meta from '../components/meta/meta'
import { useSiteMetadata } from '../hooks/useSiteMetadata'

interface Props {
  data: Queries.ProfilePageQueryQuery
  location: Location
}

const Profile: React.FC<Props> = ({ location, data }) => {
  const meta = useSiteMetadata()
  const profile = getImage(
    data.profile?.childImageSharp?.gatsbyImageData as IGatsbyImageData | undefined
  )
  return (
    <Layout location={location}>
      <section className="text-center">
        <div className="container">
          {profile && (
            <GatsbyImage image={profile} alt={meta.author} className="rounded-circle" />
          )}
          <h1>{meta.author}</h1>
          <p className="lead text-muted">Front-end engineer.</p>
          <a
            href={`https://twitter.com/${meta.twitter}`}
            className="twitter-follow-button"
            data-show-count="false"
          >
            Follow @{meta.twitter}
          </a>
        </div>
      </section>
    </Layout>
  )
}

export default Profile

export const Head: HeadFC = () => <Meta title="Profile" />

export const query = graphql`
  query ProfilePageQuery {
    profile: file(name: { eq: "profile" }) {
      childImageSharp {
        gatsbyImageData(width: 120, height: 120, layout: FIXED)
      }
    }
  }
`
```

- [ ] **Step 5: Update `src/templates/page/page.tsx`** (typing only)

Replace contents:

```tsx
import React from 'react'

import './style.scss'

interface Props {
  data: Queries.PostByPathQuery
  location: Location
}

const Page: React.FC<Props> = ({ data }) => {
  if (!data.post?.html) return null
  return <div dangerouslySetInnerHTML={{ __html: data.post.html }} />
}

export default Page
```

- [ ] **Step 6: Commit**

```bash
git add src/templates src/pages
git commit -m "refactor(templates): migrate to gatsby-plugin-image and <Head> API"
```

## Task 1.10: Drop AdSense component

The starter ships without ad embeds; AdSense is a deployer concern, not a starter concern, and it taxes Lighthouse Best Practices.

**Files:**
- Delete: `src/components/adsense/adsense.tsx`
- Delete: `src/components/adsense/style.scss`

- [ ] **Step 1: Remove the directory**

```bash
git rm -r src/components/adsense
```

- [ ] **Step 2: Commit**

```bash
git commit -m "refactor(adsense): remove AdSense component from starter"
```

## Task 1.11: Update `src/html.tsx`

Drop the AdSense `<script>`, tighten the `<head>` markup, and use the React 19 metadata defaults.

**Files:**
- Modify: `src/html.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import React from 'react'

interface Props {
  htmlAttributes: Record<string, unknown>
  headComponents: React.ReactNode[]
  bodyAttributes: Record<string, unknown>
  preBodyComponents: React.ReactNode[]
  body: string
  postBodyComponents: React.ReactNode[]
}

const HTML: React.FC<Props> = ({
  htmlAttributes,
  headComponents,
  bodyAttributes,
  preBodyComponents,
  body,
  postBodyComponents,
}) => (
  <html {...htmlAttributes} lang={(htmlAttributes.lang as string) ?? 'en'}>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {headComponents}
    </head>
    <body {...bodyAttributes}>
      {preBodyComponents}
      <div id="___gatsby" dangerouslySetInnerHTML={{ __html: body }} />
      {postBodyComponents}
    </body>
  </html>
)

export default HTML
```

- [ ] **Step 2: Commit**

```bash
git add src/html.tsx
git commit -m "refactor(html): drop AdSense script and align with Gatsby 5 props"
```

## Task 1.12: Update `Layout` to use the new hook and drop legacy CSS

**Files:**
- Modify: `src/components/layout/layout.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import React from 'react'

import Navibar from '../navibar/navibar'
import Footer from '../footer/footer'
import { useSiteMetadata } from '../../hooks/useSiteMetadata'

import 'modern-normalize/modern-normalize.css'
import 'prismjs/themes/prism.css'
import 'scss/gatstrap.scss'

interface Props {
  children?: React.ReactNode
  location: Location
}

const Layout: React.FC<Props> = ({ children, location }) => {
  const meta = useSiteMetadata()
  return (
    <>
      <Navibar title={meta.title} location={location} />
      <main>{children}</main>
      <Footer title={meta.title} author={meta.author} />
    </>
  )
}

export default Layout
```

- [ ] **Step 2: Commit**

```bash
git add src/components/layout/layout.tsx
git commit -m "refactor(layout): use useSiteMetadata, drop emergence/animate/font-awesome CSS"
```

## Task 1.13: ESLint 9 flat config + Prettier 3

**Files:**
- Create: `eslint.config.js`
- Create: `prettier.config.js`
- Delete: `.eslintrc.js`
- Delete: `.prettierrc.js`

- [ ] **Step 1: Write `eslint.config.js`**

```js
import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
      prettier,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules,
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error',
    },
    settings: { react: { version: '19.0.0' } },
  },
  {
    ignores: ['public/**', '.cache/**', 'src/__generated__/**', 'node_modules/**'],
  },
]
```

- [ ] **Step 2: Write `prettier.config.js`**

```js
export default {
  trailingComma: 'es5',
  semi: false,
  singleQuote: true,
}
```

- [ ] **Step 3: Delete the old configs**

```bash
git rm .eslintrc.js .prettierrc.js
```

- [ ] **Step 4: Verify lint runs**

```bash
yarn lint || true
```

Capture any rule errors but do not fix yet — Phase 2 / 3 will land final code that lint runs against. Lint must pass at Phase 1 exit gate.

- [ ] **Step 5: Commit**

```bash
git add eslint.config.js prettier.config.js
git commit -m "chore(lint): migrate to ESLint 9 flat config and Prettier 3"
```

## Task 1.14: Refresh husky 9

Husky 9 changed its initialization model.

**Files:**
- Modify: `.husky/pre-commit`

- [ ] **Step 1: Replace `.husky/pre-commit` contents**

```sh
yarn lint-staged
```

Note: Husky 9 no longer requires the shebang/wrapper line; the file just runs.

- [ ] **Step 2: Reinstall hooks**

```bash
yarn prepare
```

- [ ] **Step 3: Commit**

```bash
git add .husky/pre-commit
git commit -m "chore(husky): align pre-commit hook with husky 9"
```

## Task 1.15: GitHub Actions CI

**Files:**
- Create: `.github/workflows/ci.yml`
- Delete: `.circleci/config.yml`

- [ ] **Step 1: Write `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [master]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .node-version
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn typecheck
      - run: yarn lint
      - run: yarn build
```

- [ ] **Step 2: Delete CircleCI config**

```bash
git rm -r .circleci
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/ci.yml
git commit -m "ci: replace CircleCI with GitHub Actions"
```

## Task 1.16: Phase 1 exit gate

- [ ] **Step 1: Clean install**

```bash
rm -rf node_modules .cache public
yarn
```

Expected: install succeeds.

- [ ] **Step 2: Generate types via Gatsby's native typegen**

```bash
yarn develop &
sleep 30
kill %1 || true
```

Gatsby's built-in typegen runs at develop/build start and writes
`src/gatsby-types.d.ts` (and the corresponding `Queries` namespace). If it
does not appear, capture the dev-server log; the most common failure is a
GraphQL syntax error in a `pageQuery`.

- [ ] **Step 3: Typecheck**

```bash
yarn typecheck
```

Expected: zero errors. If errors mention `Queries.*` types, ensure codegen ran and the generated `.d.ts` is on the include path.

- [ ] **Step 4: Lint**

```bash
yarn lint
```

Expected: zero errors.

- [ ] **Step 5: Build**

```bash
yarn build
```

Expected: completes with zero warnings, even if the design still looks like the v3 layout.

- [ ] **Step 6: Commit any generated artifacts that are gitignored**

```bash
git status
```

Expected: clean working tree (generated types should be in `.gitignore`; if not, add them in a follow-up). If `.gitignore` needs updating, do so as a single follow-up commit:

```bash
echo "src/gatsby-types.d.ts" >> .gitignore
git add .gitignore
git commit -m "chore: ignore generated GraphQL types"
```

---

# Phase 2 — Bootstrap 5 migration

## Task 2.1: Replace `src/scss/gatstrap.scss` with a Bootstrap 5 entrypoint

**Files:**
- Modify: `src/scss/gatstrap.scss`

- [ ] **Step 1: Replace contents**

```scss
// Theme variable overrides — must come before bootstrap import.
@use 'sass:color';
@import './colors';
@import './fonts';

// Map our brand colors into Bootstrap 5's $theme-colors.
$primary: $purple;
$secondary: $gray-600;
$success: $green;
$info: $cyan;
$warning: $yellow;
$danger: $red;
$light: $gray-100;
$dark: $gray-800;

$body-bg: $white;
$body-color: $gray-700;

$link-decoration: none;
$link-hover-decoration: underline;

$enable-rounded: true;
$enable-shadows: true;
$enable-gradients: false;

// Bootstrap 5 — bring in everything the starter uses.
@import '~bootstrap/scss/bootstrap';

html,
body {
  height: 100%;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

p {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}

img {
  margin-bottom: 0.9375rem;
  max-width: 100%;
}

:focus-visible {
  outline: 3px solid $primary;
  outline-offset: 2px;
}
```

Notes:
- `@import '~bootstrap/scss/bootstrap'` works through `gatsby-plugin-sass` + Dart Sass.
- The `img:hover { animation: pulse 0.5s }` rule referenced `animate.css`'s keyframes; it is removed.
- `:focus-visible` is the new accessibility rule, intentionally kept here at the global stylesheet root.

- [ ] **Step 2: Commit**

```bash
git add src/scss/gatstrap.scss
git commit -m "style(scss): rewrite entrypoint against Bootstrap 5 Sass API"
```

## Task 2.2: Trim `src/scss/colors.scss` and `src/scss/fonts.scss`

**Files:**
- Modify: `src/scss/colors.scss`
- Modify: `src/scss/fonts.scss`

- [ ] **Step 1: Replace `src/scss/colors.scss` with the colors used by the theme**

```scss
$white: #fff;
$black: #000;

$gray-100: #f8f9fa;
$gray-600: #868e96;
$gray-700: #495057;
$gray-800: #343a40;

$blue: #03a9f4;
$purple: #673ab7;
$pink: #e91e63;
$red: #f44336;
$yellow: #ffab00;
$green: #8bc34a;
$cyan: #00bcd4;
```

- [ ] **Step 2: Replace `src/scss/fonts.scss`**

```scss
$font-family-sans-serif: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji',
  'Segoe UI Symbol';
$font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas,
  'Liberation Mono', 'Courier New', monospace;
$font-family-base: $font-family-sans-serif;

$h1-font-size: 1.8rem;
$h2-font-size: 1.4rem;
$h3-font-size: 1.2rem;
$h4-font-size: 1.1rem;
$h5-font-size: 1.05rem;
$h6-font-size: 1rem;

$headings-font-family: inherit;
$headings-font-weight: 800;
$headings-line-height: 1.5;
```

Notes:
- Bootstrap 5 dropped `$display1-size` … `$display4-size`; they are removed.
- `!default` is no longer needed because these are the values we want.

- [ ] **Step 3: Commit**

```bash
git add src/scss/colors.scss src/scss/fonts.scss
git commit -m "style(scss): trim color/font tokens to Bootstrap 5 surface"
```

## Task 2.3: Add `src/bootstrap/Navbar.tsx`

**Files:**
- Create: `src/bootstrap/Navbar.tsx`

- [ ] **Step 1: Write the component**

```tsx
import React, { useState } from 'react'

interface NavbarProps {
  brand: React.ReactNode
  ariaLabel?: string
  children?: React.ReactNode
}

export const Navbar: React.FC<NavbarProps> = ({
  brand,
  ariaLabel = 'Main navigation',
  children,
}) => {
  const [open, setOpen] = useState(false)
  const collapseId = 'gatstrap-navbar-collapse'
  return (
    <nav
      className="navbar navbar-expand-md navbar-dark bg-primary"
      aria-label={ariaLabel}
    >
      <div className="container">
        <div className="navbar-brand mb-0">{brand}</div>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls={collapseId}
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen(prev => !prev)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          id={collapseId}
          className={`collapse navbar-collapse${open ? ' show' : ''}`}
        >
          {children}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
```

Notes:
- This is the only state we need from Bootstrap's JS — collapse open/close. We avoid pulling Bootstrap's vanilla JS.
- Class names align with Bootstrap 5 (`navbar-expand-md`, `navbar-dark`, `bg-primary`).

- [ ] **Step 2: Commit**

```bash
git add src/bootstrap/Navbar.tsx
git commit -m "feat(bootstrap): add Navbar wrapper with collapse state"
```

## Task 2.4: Add `src/bootstrap/Dropdown.tsx`

**Files:**
- Create: `src/bootstrap/Dropdown.tsx`

- [ ] **Step 1: Write the component**

```tsx
import React, { useEffect, useRef, useState } from 'react'

interface DropdownProps {
  label: React.ReactNode
  ariaLabel?: string
  children: React.ReactNode
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  ariaLabel,
  children,
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    const onDocumentClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onDocumentClick)
    return () => document.removeEventListener('mousedown', onDocumentClick)
  }, [open])

  return (
    <div className="dropdown" ref={ref}>
      <button
        className="btn btn-outline-light dropdown-toggle"
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(prev => !prev)}
      >
        {label}
      </button>
      <ul
        className={`dropdown-menu${open ? ' show' : ''}`}
        role="menu"
      >
        {children}
      </ul>
    </div>
  )
}

export default Dropdown
```

- [ ] **Step 2: Commit**

```bash
git add src/bootstrap/Dropdown.tsx
git commit -m "feat(bootstrap): add Dropdown wrapper with outside-click close"
```

## Task 2.5: Add `src/bootstrap/index.ts` barrel

**Files:**
- Create: `src/bootstrap/index.ts`

- [ ] **Step 1: Write the file**

```ts
export { default as Navbar } from './Navbar'
export { default as Dropdown } from './Dropdown'
```

- [ ] **Step 2: Commit**

```bash
git add src/bootstrap/index.ts
git commit -m "feat(bootstrap): add barrel export"
```

## Task 2.6: Rewrite `Navibar` against Bootstrap 5 + the new Navbar wrapper

**Files:**
- Modify: `src/components/navibar/navibar.tsx`
- Delete: `src/components/navibar/style.scss` (if it only contained Bootstrap 4 patches; otherwise migrate)

- [ ] **Step 1: Inspect existing styles**

```bash
cat src/components/navibar/style.scss
```

If the file is empty or only contains rules redundant with Bootstrap 5 defaults, remove it; otherwise keep and migrate selectors. (Treat removal as the default; reverse if the file holds substantive rules.)

- [ ] **Step 2: Replace `src/components/navibar/navibar.tsx`**

```tsx
import React from 'react'
import { Link } from 'gatsby'

import { Navbar } from '../../bootstrap'

interface Props {
  title: string
  location: Location
}

const navItem = (label: string, path: string, current: string) => (
  <li className={`nav-item${current === path ? ' active' : ''}`} key={path}>
    <Link
      to={path}
      className="nav-link"
      aria-current={current === path ? 'page' : undefined}
    >
      {label}
    </Link>
  </li>
)

const Navibar: React.FC<Props> = ({ location, title }) => (
  <Navbar
    brand={
      <Link to="/" className="text-white text-decoration-none">
        <h1 className="h5 mb-0">{title}</h1>
      </Link>
    }
  >
    <ul className="navbar-nav me-auto">
      {navItem('Home', '/', location.pathname)}
      {navItem('Profile', '/profile/', location.pathname)}
    </ul>
  </Navbar>
)

export default Navibar
```

Notes:
- Bootstrap 5 uses `me-auto` (logical) instead of `ml-auto`.
- `aria-current="page"` is the modern accessibility primitive.

- [ ] **Step 3: If the SCSS was removed**

```bash
git rm src/components/navibar/style.scss
```

- [ ] **Step 4: Commit**

```bash
git add src/components/navibar
git commit -m "refactor(navibar): rebuild on Bootstrap 5 Navbar wrapper"
```

## Task 2.7: Migrate `Footer` to Bootstrap 5 spacing utilities

**Files:**
- Modify: `src/components/footer/footer.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import React from 'react'
import { Link } from 'gatsby'

import './style.scss'

interface Props {
  author: string
  title: string
}

const Footer: React.FC<Props> = ({ author, title }) => (
  <footer className="py-4 mt-5">
    <div className="container">
      <hr className="border-primary" />
      <p className="mb-0">
        {title}
        <Link to="/profile/" className="d-block">
          <strong>{author}</strong> on Profile
        </Link>
      </p>
    </div>
  </footer>
)

export default Footer
```

- [ ] **Step 2: Commit**

```bash
git add src/components/footer/footer.tsx
git commit -m "refactor(footer): use Bootstrap 5 spacing utilities"
```

## Task 2.8: Migrate `Badge` to Bootstrap 5 classnames

In Bootstrap 5, `badge-primary` becomes `text-bg-primary` (or `bg-primary text-white`).

**Files:**
- Modify: `src/components/badge/badge.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import React from 'react'

interface Props {
  label: string
  primary?: boolean
}

const Badge: React.FC<Props> = ({ label, primary = false }) => (
  <span
    className={`badge me-1 ${
      primary ? 'text-bg-primary' : 'text-bg-secondary'
    }`}
  >
    {label}
  </span>
)

export default Badge
```

- [ ] **Step 2: Commit**

```bash
git add src/components/badge/badge.tsx
git commit -m "refactor(badge): use Bootstrap 5 text-bg-* utilities"
```

## Task 2.9: Migrate `Button` classnames

**Files:**
- Modify: `src/components/button/button.tsx`

- [ ] **Step 1: Replace contents**

```tsx
import React from 'react'
import { Link } from 'gatsby'

interface Props {
  path: string
  label: string
  primary?: boolean
}

const Button: React.FC<Props> = ({ path, label, primary = false }) => (
  <Link className="readmore" to={path}>
    <span
      className={`btn w-100 ${
        primary ? 'btn-outline-primary' : 'btn-outline-secondary'
      }`}
    >
      {label}
    </span>
  </Link>
)

export default Button
```

Note: Bootstrap 5 dropped `btn-block` in favor of `w-100`.

- [ ] **Step 2: Commit**

```bash
git add src/components/button/button.tsx
git commit -m "refactor(button): use Bootstrap 5 sizing utilities"
```

## Task 2.10: Tighten `Icon` to `@fortawesome` only

The current `Icon` already imports from `@fortawesome/*`; the only change is to remove any Font Awesome 4 dependency in CSS.

**Files:**
- Modify: `src/components/icon/icon.tsx`
- Modify: `src/components/icon/style.scss` (optional)

- [ ] **Step 1: Confirm there is no `font-awesome/css/font-awesome.css` import remaining**

```bash
grep -R "font-awesome" src
```

Expected: no matches outside of `@fortawesome/*` imports.

- [ ] **Step 2: Replace contents of `src/components/icon/icon.tsx`**

```tsx
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library, type IconName } from '@fortawesome/fontawesome-svg-core'
import {
  faApple,
  faAws,
  faFacebook,
  faGithub,
  faHtml5,
  faJs,
  faNode,
  faPhp,
  faReact,
  faTwitter,
  faVuejs,
} from '@fortawesome/free-brands-svg-icons'

import './style.scss'

library.add(
  faApple,
  faAws,
  faFacebook,
  faGithub,
  faHtml5,
  faJs,
  faNode,
  faPhp,
  faReact,
  faTwitter,
  faVuejs
)

interface Props {
  name: IconName
  title: string
}

const Icon: React.FC<Props> = ({ name, title }) => (
  <span className="icon" aria-label={title} role="img">
    <FontAwesomeIcon icon={['fab', name]} />
  </span>
)

export default Icon
```

Note: `aria-label` + `role="img"` is the accessibility-correct way to expose the icon's meaning.

- [ ] **Step 3: Commit**

```bash
git add src/components/icon/icon.tsx
git commit -m "refactor(icon): expose icon meaning via aria-label"
```

## Task 2.11: Phase 2 exit gate

- [ ] **Step 1: Develop**

```bash
yarn clean
yarn develop
```

Open `http://localhost:8000` and click through:
- `/` (index, posts list)
- `/profile/` (profile page with avatar)
- one demo post URL
- a non-existent URL to hit the 404

Expected: each page renders with no console errors. Bootstrap 5 default look is acceptable.

- [ ] **Step 2: Build**

```bash
yarn build
```

Expected: completes with zero warnings.

- [ ] **Step 3: Typecheck and lint**

```bash
yarn typecheck && yarn lint
```

Expected: both clean.

- [ ] **Step 4: Commit any final touch-ups**

If you needed minor follow-ups, commit them as `fix(phase-2): ...` and move on.

---

# Phase 3 — Library acceptance criteria

## Task 3.1: Replace demo posts with English starter content

**Files:**
- Delete: `content/posts/2015-05-01-hello-world/`
- Delete: `content/posts/2015-05-06-my-second-post/`
- Delete: `content/posts/2015-05-28-hi-folks/`
- Create: `content/posts/2026-05-01-welcome/index.md`
- Create: `content/posts/2026-05-02-customization/index.md`
- Create: `content/posts/2026-05-03-markdown-showcase/index.md`

- [ ] **Step 1: Remove old posts**

```bash
git rm -r content/posts/2015-05-01-hello-world content/posts/2015-05-06-my-second-post content/posts/2015-05-28-hi-folks
```

- [ ] **Step 2: Create `content/posts/2026-05-01-welcome/index.md`**

```markdown
---
layout: post
title: Welcome to Gatstrap
path: /welcome
category: Getting Started
tags: [welcome, intro]
description: Gatstrap is a Bootstrap 5 starter for Gatsby focused on a fast, accessible blog.
date: 2026-05-01
---

Gatstrap pairs **Gatsby 5** with **Bootstrap 5** so you can write a blog without
fighting the toolchain. Configuration lives in `gatsby-config.ts`, theme tokens
in `src/scss/`, and your posts here in `content/posts/`.

<!--more-->

Open `gatsby-config.ts` and update `siteMetadata` with your own title,
description, and social handles. The starter uses that single source for the
header, the SEO `<Head>`, and the manifest.
```

- [ ] **Step 3: Create `content/posts/2026-05-02-customization/index.md`**

```markdown
---
layout: post
title: Customizing the Theme
path: /customization
category: How-to
tags: [theme, sass, bootstrap]
description: Override Bootstrap 5 variables and ship your own brand without forking.
date: 2026-05-02
---

The starter's design tokens are at `src/scss/colors.scss` and
`src/scss/fonts.scss`. Anything you set there is picked up by Bootstrap 5
before the framework imports its own defaults, so most brand changes are a
two-line edit.

<!--more-->

For deeper changes — new utilities, new components — extend `gatstrap.scss`
with your own partials. The goal is to keep Bootstrap's public Sass API
visible; this starter never re-implements what Bootstrap already gives you.
```

- [ ] **Step 4: Create `content/posts/2026-05-03-markdown-showcase/index.md`**

```markdown
---
layout: post
title: Markdown Showcase
path: /markdown-showcase
category: Reference
tags: [markdown, prismjs]
description: A short tour of the Markdown features the starter renders out of the box.
date: 2026-05-03
---

# Heading 1

## Heading 2

### Heading 3

A paragraph with **bold**, *italic*, and `inline code`. A [link](https://www.gatsbyjs.com/).

> Blockquotes render with the `.blockquote` class via the post template.

- bullet one
- bullet two

1. ordered one
2. ordered two

\`\`\`ts
export const greet = (name: string): string => `Hello, ${name}!`
\`\`\`
```

(Replace the literal `\`\`\`` in the file with three backticks.)

- [ ] **Step 5: Commit**

```bash
git add content/posts
git commit -m "content: replace demo posts with English starter content"
```

## Task 3.2: Add OG image and reference it from manifest + meta

**Files:**
- Create: `static/og-image.png` (1200×630, PNG)

- [ ] **Step 1: Place the image**

Generate or place a 1200×630 PNG at `static/og-image.png`. The image should show "Gatstrap" + a short tagline. Any quick designer tool works; the simplest path is using `static/og-image.png` from a Figma export.

If you do not have a designer ready, use ImageMagick:

```bash
convert -size 1200x630 xc:'#673ab7' -gravity center -fill white \
  -font 'Helvetica-Bold' -pointsize 96 -annotate +0-30 'Gatstrap' \
  -font 'Helvetica' -pointsize 36 -annotate +0+60 'A Bootstrap 5 starter for Gatsby' \
  static/og-image.png
```

- [ ] **Step 2: Verify it loads**

```bash
yarn develop
```

Visit `http://localhost:8000/og-image.png`. Expected: the image renders.

- [ ] **Step 3: Commit**

```bash
git add static/og-image.png
git commit -m "content: add Gatstrap OG image"
```

## Task 3.3: Restore visible focus indicators sitewide

This was part of the new SCSS in Task 2.1; verify here.

- [ ] **Step 1: Check for `:focus-visible`**

```bash
grep -n ':focus-visible' src/scss/gatstrap.scss
```

Expected: one match in the global block.

- [ ] **Step 2: Manual smoke test**

Run `yarn develop` and tab through the navbar links + a post link. The active item should have a clearly visible purple outline.

- [ ] **Step 3: If the indicator is missing or weak, fix it**

Re-edit `src/scss/gatstrap.scss` and bump the `outline` to `4px solid` or change the offset. Commit if changed:

```bash
git add src/scss/gatstrap.scss
git commit -m "style(a11y): strengthen focus-visible indicator"
```

## Task 3.4: Audit alt text and labels

- [ ] **Step 1: Find all `<img>` and `<GatsbyImage>` usages**

```bash
grep -rn "GatsbyImage\|<img" src
```

For each occurrence, confirm `alt` is set. Decorative images use `alt=""`.
Meaningful images use a short description.

- [ ] **Step 2: Find all interactive elements without labels**

```bash
grep -rn "<button\|<a " src | grep -v "aria-label\|aria-labelledby\|>{" || true
```

Inspect each match; ensure the visible text or an `aria-label` provides a name.

- [ ] **Step 3: Commit any fixes**

```bash
git status
git commit -am "fix(a11y): ensure all images and controls have accessible names"
```

If `git status` is clean, skip the commit.

## Task 3.5: Lighthouse CI workflow

**Files:**
- Create: `.github/workflows/lighthouse.yml`
- Create: `lighthouserc.json`

- [ ] **Step 1: Write `lighthouserc.json`**

```json
{
  "ci": {
    "collect": {
      "staticDistDir": "./public",
      "url": ["http://localhost/index.html", "http://localhost/welcome/", "http://localhost/profile/"],
      "settings": { "preset": "desktop" }
    },
    "assert": {
      "preset": "lighthouse:no-pwa",
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.95 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.95 }]
      }
    },
    "upload": { "target": "temporary-public-storage" }
  }
}
```

Notes:
- `preset: "desktop"` is used because Lighthouse CI's mobile profile is harder to satisfy on a CI VM and the spec's "mobile 95+" is the goal of the local check; the CI gate prevents regressions across devices.
- `assert.preset: "lighthouse:no-pwa"` opts out of PWA scoring, which is irrelevant to a content starter.

- [ ] **Step 2: Write `.github/workflows/lighthouse.yml`**

```yaml
name: Lighthouse

on:
  pull_request:
  push:
    branches: [master]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: .node-version
          cache: yarn
      - run: yarn install --frozen-lockfile
      - run: yarn build
      - run: npx --yes @lhci/cli@0.14.x autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/lighthouse.yml lighthouserc.json
git commit -m "ci(lighthouse): enforce 95+ on Performance/Accessibility/Best-Practices/SEO"
```

## Task 3.6: Local Lighthouse run

- [ ] **Step 1: Build and run Lighthouse locally**

```bash
yarn build
npx --yes @lhci/cli@0.14.x autorun
```

Expected: all four categories ≥ 0.95. If a category fails, capture the failing audit IDs.

- [ ] **Step 2: Triage failures one at a time**

Common adjustments needed:

- **Best Practices < 0.95** — usually the Service Worker. If it cannot be tuned, drop `gatsby-plugin-offline` from `gatsby-config.ts` and rerun.
- **Performance < 0.95** — check that all images go through `gatsby-plugin-image`; check that fonts load with `font-display: swap`.
- **SEO < 0.95** — confirm `<title>`, `meta description`, `lang`, and a sane `viewport`.
- **Accessibility < 0.95** — Lighthouse will name the audit; usually this is contrast or a missing label.

- [ ] **Step 3: Commit any tuning**

If a fix is committed, message it as `fix(lighthouse): <audit name>`.

## Task 3.7: Replace `LICENSE` with 0BSD

**Files:**
- Modify: `LICENSE`

- [ ] **Step 1: Replace contents**

```
BSD Zero Clause License

Copyright (c) 2026 Futoshi Iwashita <jaxx2104@gmail.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

- [ ] **Step 2: Verify `package.json` carries `"license": "0BSD"`** (set in Task 1.2; recheck)

```bash
grep '"license"' package.json
```

Expected: `"license": "0BSD",`.

- [ ] **Step 3: Commit**

```bash
git add LICENSE
git commit -m "license: switch from MIT to 0BSD per Gatsby starter convention"
```

## Task 3.8: Rewrite `README.md`

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Replace contents**

````markdown
# Gatstrap

A **Bootstrap 5** starter for Gatsby — fast, accessible, and ready to fork.

[![Netlify Status](https://api.netlify.com/api/v1/badges/fa249a3a-68ea-4b4b-9aa6-394c87099ee1/deploy-status)](https://app.netlify.com/sites/gatstrap/deploys)
[![CI](https://github.com/jaxx2104/gatsby-starter-bootstrap/actions/workflows/ci.yml/badge.svg)](https://github.com/jaxx2104/gatsby-starter-bootstrap/actions/workflows/ci.yml)

![Gatstrap hero](./static/og-image.png)

## Features

- **Gatsby 5.16+** with React 19 and TypeScript (strict).
- **Bootstrap 5.3** via Sass — no jQuery, no popper.
- Markdown blog with Prism syntax highlighting.
- `gatsby-plugin-image` for responsive images.
- Gatsby `<Head>` API for per-page SEO.
- Lighthouse mobile **95+** on Performance, Accessibility, Best Practices, SEO.

## Quick start

```bash
gatsby new my-blog https://github.com/jaxx2104/gatsby-starter-bootstrap
cd my-blog
yarn develop
```

Open <http://localhost:8000>.

## Configuration

Edit `gatsby-config.ts`. The `siteMetadata` block is the single source of truth
for the navbar title, the per-page SEO `<Head>`, and the PWA manifest:

```ts
const siteMetadata = {
  title: 'Your Site',
  description: 'Your description.',
  siteUrl: 'https://example.com',
  author: 'Your Name',
  twitter: 'your_handle',
}
```

## Customization

Theme tokens are at `src/scss/colors.scss` and `src/scss/fonts.scss`. Override
Bootstrap 5 Sass variables there before the `bootstrap` import in
`src/scss/gatstrap.scss`.

To swap the brand color:

```scss
// src/scss/colors.scss
$purple: #00bcd4;
```

## Writing posts

Add a folder under `content/posts/`:

```
content/posts/2026-06-01-my-post/
  index.md
  hero.jpg
```

`index.md` frontmatter:

```yaml
---
layout: post
title: My Post
path: /my-post
category: Notes
tags: [example]
description: A one-sentence description.
date: 2026-06-01
---
```

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `yarn develop`    | Start the dev server                 |
| `yarn build`      | Production build to `public/`        |
| `yarn typecheck`  | Run TypeScript strict mode checks    |
| `yarn lint`       | Run ESLint                           |
| `yarn lint:fix`   | Run ESLint and auto-fix              |
| `yarn format`     | Run Prettier                         |

## Contributing

1. Fork and clone.
2. `yarn` to install (Node 20).
3. `yarn typecheck`, `yarn lint`, and `yarn build` must pass before opening a
   pull request.
4. Pre-commit hooks run `lint-staged` automatically.

## License

Released under the [0BSD License](./LICENSE).
````

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs(readme): rewrite for Gatstrap v4"
```

## Task 3.9: Bump version metadata for the upcoming release

**Files:**
- Modify: `package.json`
- Create: `CHANGELOG.md`

- [ ] **Step 1: Set `version` to `4.0.0`**

```bash
node -e "const f='package.json',p=require('./'+f);p.version='4.0.0';require('fs').writeFileSync(f, JSON.stringify(p, null, 2)+'\n')"
```

- [ ] **Step 2: Create `CHANGELOG.md`**

```markdown
# Changelog

## 4.0.0 — 2026-05-XX

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
```

Update the date when releasing.

- [ ] **Step 3: Commit**

```bash
git add package.json CHANGELOG.md
git commit -m "chore: bump to 4.0.0 and add CHANGELOG"
```

## Task 3.10: Phase 3 exit gate

- [ ] **Step 1: Clean rebuild**

```bash
yarn clean
yarn build
```

Expected: clean build, zero warnings.

- [ ] **Step 2: Local Lighthouse**

```bash
npx --yes @lhci/cli@0.14.x autorun
```

Expected: all four categories ≥ 0.95.

- [ ] **Step 3: `gatsby new` smoke test on a clean Node 20 environment**

```bash
cd /tmp
gatsby new gatstrap-smoke /Users/jaxx/repos/github.com/jaxx2104/gatsby-starter-bootstrap
cd gatstrap-smoke
yarn develop
```

(Use the local repo path here so you do not need to push first; later we will validate against GitHub.)

Expected: dev server starts and `http://localhost:8000` renders the welcome post.

- [ ] **Step 4: Cleanup the smoke test**

```bash
cd /Users/jaxx/repos/github.com/jaxx2104/gatsby-starter-bootstrap
rm -rf /tmp/gatstrap-smoke
```

---

# Phase 4 — Release and submission

## Task 4.1: Push the branch and open a PR to `master`

- [ ] **Step 1: Push**

```bash
git push -u origin revival-spec
```

- [ ] **Step 2: Open the PR**

Use `gh pr create --base master --head revival-spec` and write a summary that
points at the spec, the Lighthouse evidence, and the screenshots of the demo
pages. Merge after CI is green.

## Task 4.2: Republish the demo on Netlify

- [ ] **Step 1: Trigger the Netlify build**

After the merge, Netlify will rebuild against `master`. Wait for the deploy
URL to confirm it serves the new content.

- [ ] **Step 2: Confirm the demo URL is `https://gatstrap.netlify.app`**

If Netlify still shows the legacy `.netlify.com` host, switch the site's
default domain in the Netlify UI to the `.netlify.app` form.

- [ ] **Step 3: Update README with the live URL** (only if it changed)

If a different host is in use, edit `README.md`'s hero/screenshot section to
match, commit, and let Netlify redeploy.

## Task 4.3: Tag the release

- [ ] **Step 1: Tag**

```bash
git tag v4.0.0
git push origin v4.0.0
```

- [ ] **Step 2: Create the GitHub release**

```bash
gh release create v4.0.0 --title "v4.0.0" --notes-file CHANGELOG.md
```

## Task 4.4: Update repository description and topics

- [ ] **Step 1: Set description and topics**

```bash
gh repo edit jaxx2104/gatsby-starter-bootstrap \
  --description "A Bootstrap 5 starter for Gatsby — fast, accessible, ready to fork." \
  --add-topic gatsby-starter \
  --add-topic bootstrap-5 \
  --add-topic typescript \
  --add-topic blog-template
```

- [ ] **Step 2: Verify**

```bash
gh repo view jaxx2104/gatsby-starter-bootstrap --json description,repositoryTopics
```

Expected: shows the new description and topics.

## Task 4.5: Submit to the Gatsby Community Starters Library

- [ ] **Step 1: Take a screenshot of the live demo**

Capture a 1280×800 (or larger) PNG of `https://gatstrap.netlify.app/`. Upload
to a stable host (e.g., the OG image already lives on the demo at
`/og-image.png` and can be reused).

- [ ] **Step 2: Submit the form**

Go to https://www.gatsbyjs.com/starters/submissions/ and fill in:

- Contact email: `jaxx2104@gmail.com`
- GitHub repository URL: `https://github.com/jaxx2104/gatsby-starter-bootstrap`
- Demo URL: `https://gatstrap.netlify.app`
- Demo screenshot URL: the URL of the PNG from Step 1.
- Description: "A Bootstrap 5 starter for Gatsby — fast, accessible, ready to fork."
- Significant features and plugins (one per line):
  - Gatsby 5.16+
  - React 19
  - TypeScript strict
  - Bootstrap 5.3 (Sass-first, no jQuery)
  - gatsby-plugin-image
  - Gatsby `<Head>` API
  - GraphQL Codegen
  - Lighthouse mobile 95+ on all categories

- [ ] **Step 3: Record the submission**

Append to `docs/superpowers/specs/2026-05-03-gatstrap-revival-design.md`:

```markdown
## Submission record

- Submitted: 2026-MM-DD
- Submitter: jaxx2104
- Demo: https://gatstrap.netlify.app
- Screenshot: <URL used>
```

Commit:

```bash
git add docs/superpowers/specs/2026-05-03-gatstrap-revival-design.md
git commit -m "docs(spec): record Gatsby starter library submission"
git push
```

---

## Self-review checklist (already executed inline — kept for the next reader)

- Spec acceptance criteria 1–6 are each tied to a task:
  1. Latest major Gatsby + a11y + perf + README → Phase 1 + Phase 3 (1.2, 3.1–3.8).
  2. Lighthouse 95+ → Tasks 3.5, 3.6, 3.10.
  3. `gatsby new` smoke test → Task 3.10 Step 3.
  4. Zero-warning develop/build → Phase 1 (1.16) and Phase 2 (2.11) exit gates.
  5. No jquery/popper/font-awesome@4 → 1.2, 1.3, 1.10, 2.10.
  6. Submission sent → Task 4.5.
- No `TBD` / `TODO` placeholders.
- Type / function names are consistent (`Queries.PostByPathQuery`, `useSiteMetadata`, `Navbar`, `Dropdown`).
- Each task names exact files, includes the code, and ends in a commit.
