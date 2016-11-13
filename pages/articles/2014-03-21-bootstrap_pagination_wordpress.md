---
id: 915
title: WordPressでBootstrapのPaginationを実装する
date: 2014-03-21T12:28:51+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=915
permalink: /bootstrap_pagination_wordpress
image: /wp/images/2014/03/pagenation-01-500x3751.png
categories:
  - PHP
  - Wordpress
tags:
  - bootstrap
  - PHP
  - WordPress
---
こんにちは、今日から三連休ということで、ワークスペースを利用してブログ書きます。

ではWordPressでBootstrapのPaginationを実装方法について、

メモしていきたいと思います。

<img src="/images/2014/03/pagenation-01-500x375.png" alt="pagenation-01" class="img-rounded img-responsive alignnone size-large wp-image-929" srcset="/images/2014/03/pagenation-01-500x375.png 500w, /images/2014/03/pagenation-01-300x225.png 300w, /images/2014/03/pagenation-01.png 800w" sizes="(max-width: 500px) 100vw, 500px" />


> bootstarap の Pagenation
> http://getbootstrap.com/components/#pagination

<!--more-->

このHTMLタグをWordpressのpageに合わせて、

phpで動的に生成すればいいわけです。以下がfunctions.php

Pagenationって人によって動作に微妙に違いがあるかとおもうのですが、

自分は常に9個のPagenationを出します。



Pagenationを出力したい任意の箇所で以下のコードを書けばOKです。

```
<?php jaxx_pagination(); ?>
```
