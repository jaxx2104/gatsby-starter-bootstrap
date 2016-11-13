---
id: 1210
title: FuelPHP で「oops an unexpected error has occurred」の画面が出た場合
date: 2015-03-05T21:50:23+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=1210
permalink: /fuelphp-oops-an-unexpected-error-has-occurred
image: /wp/images/2015/03/1415367437FuelPHP-800x3231.jpg
categories:
  - FuelPHP
tags:
  - apache
  - PHP
---
<img src="/images/2015/03/1415367437FuelPHP-800x323.jpg" alt="1415367437FuelPHP" class="img-rounded img-responsive aligncenter size-large wp-image-1214" srcset="/images/2015/03/1415367437FuelPHP-800x323.jpg 800w, /images/2015/03/1415367437FuelPHP-600x243.jpg 600w, /images/2015/03/1415367437FuelPHP.jpg 940w" sizes="(max-width: 800px) 100vw, 800px" />

環境変数の値を変更するとエラー内容を表示できる。

## Apache の場合

**httpd.conf**

```
# SetEnv FUEL_ENV PRODUCTION
SetEnv FUEL_ENV DEVELOPMENT
```

<!--more-->

## Nginx の場合

**nginx.conf**

```
# fastcgi_param FUEL_ENV "PRODUCTION";
fastcgi_param FUEL_ENV "DEVELOPMENT";
```

> インストール方法 - インストール - FuelPHP ドキュメント

> <a href="http://fuelphp.jp/docs/1.8/installation/instructions.html" title="http://fuelphp.jp/docs/1.8/installation/instructions.html" target="_blank">http://fuelphp.jp/docs/1.8/installation/instructions.html</a>
