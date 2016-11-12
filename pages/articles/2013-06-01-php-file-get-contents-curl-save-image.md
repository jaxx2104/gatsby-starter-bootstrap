---
id: 398
title: PHPで画像を保存
date: 2013-06-01T00:05:04+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=398
permalink: /php-file-get-contents-curl-save-image
dsq_thread_id:
  - "1344249080"
image: /wp/images/2013/09/2f1ef28cdb2a163186dcd87d21f60ea8-500x312.png
categories:
  - PHP
tags:
  - cURL
  - file_get_contents
  - PHP
  - Twitter API
---
PHPを使ってWEB上にある画像を自らのサーバー上に保存する。
  
スクレイピングやAPIを使用するときよく使うと思うのでメモ。

<img src="/images/2013/06/2f1ef28cdb2a163186dcd87d21f60ea8-500x312.jpg" alt="名称未設定-1-01" class="img-rounded alignnone size-large wp-image-402" />

## file\_get\_contents

<?php 
$url = 'http://k.yimg.jp/images/top/sp/logo.gif';
$data = file_get_contents($url);
file_put_contents('images/logo.jpg',$data);
[/php]

<!--more-->

これはfile\_get\_contentsを使ったもの。
  
画像もバイナリとして扱うことで保存ができる。

## cURL

<?php
$url = 'http://k.yimg.jp/images/top/sp/logo.gif';
$yahoo = curl_init();
curl_setopt( $yahoo, CURLOPT_URL, $url );
curl_setopt( $yahoo, CURLOPT_RETURNTRANSFER, true );
$data = curl_exec( $yahoo );
file_put_contents('images/logo.jpg',$data);
curl_close();
[/php]

cURLのほうが速いようです。
いずれも同じようにimagesディレクトリ配下にlogo.jpgを保存する。
実際にAPIを使って保存をするとき画像は一度に複数だと思うので、
元画像のファイルパスのユニークな値を利用して回してあげるといい。
</p>