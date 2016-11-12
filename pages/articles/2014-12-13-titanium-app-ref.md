---
id: 1067
title: Titaniumで初アプリを作った際に参考にしたサイト
date: 2014-12-13T03:59:22+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=1067
permalink: /titanium-app-ref
image: /wp/images/2014/12/b0edb59d97976fb1c698b9997460f6e3-e1458137465824.jpg
categories:
  - Alloy
  - iOS
  - Titanium
tags:
  - Android
  - Mac
  - Titanium
  - Twitter API
---
アプリを作った際に参考にしたサイトについて初心者目線ですが紹介したいと思います。

<a href="https://itunes.apple.com/jp/app/yomu-rss-reader/id924321598?mt=8&#038;uo=4" target="_blank"><img src="/images/2014/12/b0edb59d97976fb1c698b9997460f6e3-800x534.jpg" alt="yomu-rssreader" class="img-rounded img-responsive aligncenter size-large wp-image-1117" /></a>

Titaniumは以前に少しだけ触ったことがあって、その時は「Resources/app.js」に書くClassicなものでした。

数年さわっていない間にMVCフレームワーク「Alloy」が出ていて面白そうだったのと、個人的にアプリを作りたい衝動にかられて開発環境も不十分なくせに、iOS Developer Programに7,800円払ってしまったこともあり、Titaniumを使って初アプリを作ることにしました。

## ドキュメント

公式ドキュメントを読んで開発環境とAlloyの基本構成は理解出来ました。

> **Titanium 3.X - Appcelerator Docs**
> <a href="http://docs.appcelerator.com/titanium/3.0/#!/guide" title="http://docs.appcelerator.com/titanium/3.0/#!/guide" target="_blank">http://docs.appcelerator.com/titanium/3.0/#!/guide</a>

<!--more-->

ただTitaniumの各要素については調べる頻度が多いので、開発環境がMacの場合はDashに追加すると便利です。

> **Dash**
> <a href="http://kapeli.com/dash" title="http://kapeli.com/dash" target="_blank">http://kapeli.com/dash</a>

<img src="/images/2014/12/d9cdc0c81a52b1a3f646be6d5ebd04e1-800x568.png" alt="スクリーンショット_2014_12_08_1_33" class="img-rounded img-responsive aligncenter size-large wp-image-1126" srcset="/images/2014/12/d9cdc0c81a52b1a3f646be6d5ebd04e1-800x568.png 800w, /images/2014/12/d9cdc0c81a52b1a3f646be6d5ebd04e1-600x426.png 600w, /images/2014/12/d9cdc0c81a52b1a3f646be6d5ebd04e1.png 1297w" sizes="(max-width: 800px) 100vw, 800px" />

## サンプル

ドキュメント読んでいてもイマイチ理解できない時には、GithubのAlloyレポジトリ内にいくつかサンプルがあります。

ListViewを使うときには非常にお世話になりました。

> **appcelerator/alloy**
> <a href="https://github.com/appcelerator/alloy/tree/master/test/apps/ui" title="https://github.com/appcelerator/alloy/tree/master/test/apps/ui" target="_blank">https://github.com/appcelerator/alloy/tree/master/test/apps/ui</a>

## パフォーマンス

ある程度動くものが作れるようになった段階で、パフォーマンスを改善したいと思うようになりました。

対応方法はいくつかあると思うのですが、自分として効果が大きかったものをは以下3つです。

**1.リモート画像を使用する際はキャッシュする。**

同じ画像を複数回呼ぶ場合にはやったほうがいいなと思いました。

> **Image Best Practices**
> <a href="http://docs.appcelerator.com/titanium/latest/#!/guide/Image_Best_Practices-section-30082525_ImageBestPractices-Cachingremoteimages" title="http://docs.appcelerator.com/titanium/latest/#!/guide/Image_Best_Practices-section-30082525_ImageBestPractices-Cachingremoteimages" target="_blank">http://docs.appcelerator.com/titanium/latest/#!/guide/Image_Best_Practices-section-30082525_ImageBestPractices-Cachingremoteimages</a>

**2.メモリを管理する。**

「Alloy.Globals.navgroup = $.navgroup;」とか便利ですが、

なんでもかんでもグローバルにしちゃダメだよって内容です。

> **Memory Management | TiDev**
> <a href="http://www.tidev.io/2014/03/27/memory-management/" title="http://www.tidev.io/2014/03/27/memory-management/" target="_blank">http://www.tidev.io/2014/03/27/memory-management/</a>

## アイコンやスプラッシュスクリーン

iOS、Androidともに画像まわりは必要なものが多いのですが、以下のサイトでアイコンやスプラッシュスクリーンを一式揃えることが出来ます。

> **TiCons**
> <a href="http://ticons.fokkezb.nl/" title="http://ticons.fokkezb.nl/" target="_blank">http://ticons.fokkezb.nl/</a>

以上です。

公式のドキュメントやらサンプルの紹介だけで申し訳ないんですが、アプリをTitaniumで作ろうか考えている方に参考になればと思います。ちなみにTitaniumで初アプリ自分としては作りやすかったです。

<a href="https://itunes.apple.com/jp/app/yomu-rss-reader/id924321598?mt=8&#038;uo=4" target="itunes_store" style="display:inline-block;overflow:hidden;background:url(https://linkmaker.itunes.apple.com/htmlResources/assets/ja_jp//images/web/linkmaker/badge_appstore-lrg.png) no-repeat;width:135px;height:40px;@media only screen{background-image:url(https://linkmaker.itunes.apple.com/htmlResources/assets/ja_jp//images/web/linkmaker/badge_appstore-lrg.svg);}"></a>

アプリもiOS版だけストアに公開したのでよければDLして下さい。

Titanium Advent Calendar 2014 14日目は<a href="http://qiita.com/hntn" title="http://qiita.com/hntn" target="_blank">hntn</a>さんです。
