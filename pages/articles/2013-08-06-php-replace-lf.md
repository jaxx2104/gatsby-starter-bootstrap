---
id: 530
title: PHPで改行コードを（LF）に統一する方法
date: 2013-08-06T00:22:48+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=530
path: /php-replace-lf
dsq_thread_id:
  - "1572526481"
image: /wp/images/2013/09/IMG_1003-500x500.jpg
categories:
  - PHP
tags:
  - LF
  - PHP
  - 改行コード
  - 置換
---
<img src="/images/2013/08/IMG_1003-500x500.jpg" alt="IMG_1003" class="img-rounded aligncenter size-large wp-image-533" srcset="/images/2013/08/IMG_1003-500x500.jpg 500w, /images/2013/08/IMG_1003-150x150.jpg 150w, /images/2013/08/IMG_1003-300x300.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" />
  
<small>最近アイスコーヒーばっかり飲んでる。</small>

PHPで改行コードをLF（¥n）に統一するには、

```
$str = preg_replace("/\r\n|\r/","\n",$str);
```

としてあげるだけ。