---
id: 1030
title: htaccess によるURLパラメータの書き換え
date: 2014-10-23T01:42:18+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=1030
path: /htaccess-rewrite
categories:
  - Apache
tags:
  - PHP
---
URLパラメータの書き換えることってそんなに無いけど、
プログラムのアップデートやら改修やらで仕様変更などで旧仕様のパラメータを新仕様へと書き換える必要があったので備忘録としてメモります。

## URLパラメータの変更例

以下を例にしてみます。

変更前
> /test/index.php?page=1&mode=entry

変更後
> /test/index.php?type=entry&page=1



## mod_rewriteを使って書き換える

.htaccess を以下のように設定する。

```
RewriteBase /test/
RewriteCond %{REQUEST_URI} index.php
RewriteCond %{QUERY_STRING} ^page=(\d\d?)\&mode=(entry|comment).*?$
RewriteRule index.php index.php?type=%2&page=%1 [L,R=301]
```

これでOKです。

ページ番号が2桁まで、モードが記事orコメントとなっている部分、
サンプルなので要件に合わせてよく考えて設定して下さい。

最近よる冷えてきたので辛いもん食べたい。
