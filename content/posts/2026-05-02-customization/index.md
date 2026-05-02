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
