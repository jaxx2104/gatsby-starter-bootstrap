---
id: 572
title: PHPで文字コードをUTF-8にする
date: 2013-08-20T00:57:59+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=572
path: /php-header-utf-8
dsq_thread_id:
  - "1617898710"
categories:
  - PHP
tags:
  - PHP
  - UTF-8
  - 文字コード
  - 文字化け
---
PHP部分で文字化けしていた時は、
  
この一行を追加する。

```
header('Content-Type: text/html; charset=UTF-8');
```