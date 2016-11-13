---
id: 962
title: 正規表現で特定の文字を含まない方法
date: 2014-08-02T11:44:09+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=962
permalink: /preg_not_match
categories:
  - 正規表現
---
正規表現を使って以下の対象URLをマッチさせる。

対象文字列

`http://jaxx2104.tumblr.com/post/76844550315`

## スラッシュを含まない文字列にマッチ

パターン文字列

> [^¥/]*

<!--more-->

マッチした文字列

```
http:
jaxx2104.tumblr.com
post
76844550315
```

スラッシュ以外の文字を含まないようにしたければ、

「¥/」を任意の文字に変えればいいし、

ワイルドカードの部分を変えればもうちょい複雑なマッチが出来る。
