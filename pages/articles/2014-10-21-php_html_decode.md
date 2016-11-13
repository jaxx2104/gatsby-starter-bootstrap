---
id: 1019
title: PHPで特殊文字をデコードする
date: 2014-10-21T00:38:26+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=1019
permalink: /php_html_decode
categories:
  - PHP
tags:
  - PHP
---
Twitterなどでは絵文字が使えます。

Twitterの埋め込んだサイトのHTMLソースを利用する際など、
HTMLエンティティを含んだ文字列をこちらでデコードしたい場合。
以下のようにします。

```
$text = html_entity_decode($text);
$text = mb_decode_numericentity($text, array (0x0, 0xffff, 0, 0xffff), 'UTF-8');
```
