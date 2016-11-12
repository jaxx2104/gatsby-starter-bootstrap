---
id: 350
title: includeとrequireの違いって何だろう
date: 2013-05-10T01:01:53+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=350
permalink: /php-include-require
dsq_thread_id:
  - "1275478949"
image: /wp/images/2013/05/2f1ef28cdb2a163186dcd87d21f60ea81.png
categories:
  - PHP
tags:
  - include
  - PHP
  - require
---
プログラム書くときファイルを分けて書くと開発の効率も上がる。
  
それで外部ファイルを読み込みのときに使うのはincludeとrequire、あとinclude\_onceにrequire\_onceがあるけど、なんか先輩のコードを見たら書き分けてる。気になった。

<img src="/images/2013/05/2f1ef28cdb2a163186dcd87d21f60ea81.jpg" alt="2f1ef28cdb2a163186dcd87d21f60ea8.jpg" class="img-rounded img-responsive alignnone wp-image-351" />

調べていたら、以下の記事に出会う。

<!--more-->

[include と require_once の使いわけ](http://d.hatena.ne.jp/unau/20090122/1232574417)

```
外部のファイルをそこに差し込みたい場合は include を使い、外部のファイルに定義されたものを使いたい場合は require_once を使えばよい。```


非常にわかりやすい！
  
includeは機械の部品のようなもので、for文で繰り返し呼んだりしてつかうことができるのか。
  
一回しか読み込めないinclude_onceは使いどころあんまりないのか。

requireはもう一台の機械で、呼んだ時点でプログラムが走るからfor文で繰り返しつかえない、
  
includeとは逆にrequire_onceを使うと無駄がなく綺麗な呼び方ができるのか。
  
勉強になった、役割を理解して書こう。