---
layout: post
title: Markdown Showcase
path: /markdown-showcase
category: Reference
tags: [markdown, shiki]
description: A short tour of the Markdown features the starter renders out of the box.
date: 2026-05-03
---

# Heading 1

## Heading 2

### Heading 3

A paragraph with **bold**, _italic_, and `inline code`. Visit the [Gatsby site](https://www.gatsbyjs.com/) for more.

> Blockquotes render with the `.blockquote` class via the post template.

- bullet one
- bullet two

1. ordered one
2. ordered two

```ts
export const greet = (name: string): string => `Hello, ${name}!`
```

```js
const fib = (n) => (n < 2 ? n : fib(n - 1) + fib(n - 2))
```

```sh
yarn build
```

```json
{ "name": "gatstrap", "version": "4.0.0" }
```

Inline code uses the Bootstrap default style: `npm install`.
