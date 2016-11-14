---
id: 820
title: Titanium 3.2 から statusbarの文字色を白くする方法が変更になった
date: 2013-12-26T09:07:10+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=820
path: /titanium-3-2-statusbar
dsq_thread_id:
  - "2093273586"
categories:
  - Titanium
tags:
  - LightContent
  - statusbar
  - tiapp.xml
  - Titanium
---
ナビゲーションや背景を暗くした時にstatusbarの文字色を白にしたかったんだけど、書き方が変わっていたのでメモ。

## Titanium 3.2

tiapp.xml

```
<ios>
    <plist>
        <dict>
            <key>UIStatusBarStyle</key>
            <string>UIStatusBarStyleLightContent</string>
        </dict>
    </plist>
</ios>
```
<!--more-->

## Titanium 3.1.3 以前

tiapp.xml

```
<statusbar-style>opaque_black</statusbar-style>
```


これで白になるかと思います。
