---
id: 1068
title: Googleタグマネージャーを使ってスクロール計測
date: 2014-12-05T02:58:08+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=1068
permalink: /google-tagmanager
image: /wp/images/2014/12/Google-Tag-Manager-1.png
categories:
  - Google
  - JavaScript
---
GoogleAnalyticsで離脱率や平均セッションを見ていて、

ユーザーがページのどこまで目を通しているのか気になりました。

<img src="/images/2014/12/Google-Tag-Manager-1.png" alt="Google-Tag-Manager-1" class="img-rounded img-responsive aligncenter size-full wp-image-1072" />

海外の技術ブログやGithubでも評価のある、

「Scroll Depth」というライブラリを使用します。要件としてjQuery1.7以上です。

<!--more-->

> Scroll Depth
> http://scrolldepth.parsnip.io/

これとタグマネージャを連携してスクロール計測を行いたい思います。



## Dom Event の設定

まずは「Triggers」（旧:ルール）からイベントを登録します。

「Scroll Depth」を実行する際にスクロール幅の計算を行うため、

読み込み完了イベントの「gtm.dom」を「Dom Event」として登録します。

<img src="/images/2014/12/Google-Tag-Manager1-800x419.png" alt="Google Tag Manager1" class="img-rounded img-responsive aligncenter size-large wp-image-1079" srcset="/images/2014/12/Google-Tag-Manager1-800x419.png 800w, /images/2014/12/Google-Tag-Manager1-572x300.png 572w, /images/2014/12/Google-Tag-Manager1.png 967w" sizes="(max-width: 800px) 100vw, 800px" />

## Scroll Listener の設定

次に「Tags」（旧:タグ）からライブラリを「Scroll Listener」として登録します。

以下Githubの「jquery.scrolldepth.js」をscriptタグではさんで貼り付けて下さい。

> robflaherty/jquery-scrolldepth**
> https://github.com/robflaherty/jquery-scrolldepth

<img src="/images/2014/12/Google-Tag-Manager2-800x733.png" alt="Google Tag Manager2" class="img-rounded img-responsive aligncenter size-large wp-image-1087" srcset="/images/2014/12/Google-Tag-Manager2-800x733.png 800w, /images/2014/12/Google-Tag-Manager2-600x549.png 600w, /images/2014/12/Google-Tag-Manager2.png 969w" sizes="(max-width: 800px) 100vw, 800px" />

タグの最後に実行タグを追記します。

オプションで計測する項目のオンオフが出来ます。（他にも有り）

```
$.scrollDepth({
  minHeight: 1000, //計測実行する最小のページ高さ
  elements: ['#comments', 'footer'], //計測するスクロール要素
  percentage: true, //スクロール率の計測有無
  userTiming: false, //ユーザーのスクロールイベント有無
  pixelDepth: true //スクロール幅の計測有無
});
```

「Scroll Listener」を発行するタイミングは先ほど用意した「Dom Event」を使います。

## Scroll Event の条件設定

次に「Triggers」（旧:ルール）から「Scroll Listener」のイベント登録します。

イベント名は「ScrollDistance」と入力します。

<img src="/images/2014/12/Google-Tag-Manager3-800x418.png" alt="Google Tag Manager3" class="img-rounded img-responsive aligncenter size-large wp-image-1092" srcset="/images/2014/12/Google-Tag-Manager3-800x418.png 800w, /images/2014/12/Google-Tag-Manager3-600x313.png 600w, /images/2014/12/Google-Tag-Manager3.png 968w" sizes="(max-width: 800px) 100vw, 800px" />

## dataLayer の設定

次に「Variables」（旧:マクロ）から「Scroll Listener」の4つのデータレイヤ変数を登録します。

「eventCategory」

<img src="/images/2014/12/Google-Tag-Manager4-800x514.png" alt="Google Tag Manager4" class="img-rounded img-responsive aligncenter size-large wp-image-1093" srcset="/images/2014/12/Google-Tag-Manager4-800x514.png 800w, /images/2014/12/Google-Tag-Manager4-600x386.png 600w, /images/2014/12/Google-Tag-Manager4.png 971w" sizes="(max-width: 800px) 100vw, 800px" />

「eventAction」

<img src="/images/2014/12/Google-Tag-Manager5-800x514.png" alt="Google Tag Manager5" class="img-rounded img-responsive aligncenter size-large wp-image-1094" srcset="/images/2014/12/Google-Tag-Manager5-800x514.png 800w, /images/2014/12/Google-Tag-Manager5-600x385.png 600w, /images/2014/12/Google-Tag-Manager5.png 970w" sizes="(max-width: 800px) 100vw, 800px" />

「eventLabel」

<img src="/images/2014/12/Google-Tag-Manager6-800x515.png" alt="Google Tag Manager6" class="img-rounded img-responsive aligncenter size-large wp-image-1095" srcset="/images/2014/12/Google-Tag-Manager6-800x515.png 800w, /images/2014/12/Google-Tag-Manager6-600x386.png 600w, /images/2014/12/Google-Tag-Manager6.png 968w" sizes="(max-width: 800px) 100vw, 800px" />

「eventValue」

<img src="/images/2014/12/Google-Tag-Manager7-800x513.png" alt="Google Tag Manager7" class="img-rounded img-responsive aligncenter size-large wp-image-1097" srcset="/images/2014/12/Google-Tag-Manager7-800x513.png 800w, /images/2014/12/Google-Tag-Manager7-600x385.png 600w, /images/2014/12/Google-Tag-Manager7.png 969w" sizes="(max-width: 800px) 100vw, 800px" />

## Scroll Event の設定

最後に「Tags」（旧:タグ）からAnalytics のプロファイルを選択して、

各項目を入力すれば設定完了です。

<img src="/images/2014/12/Google_Tag_Manager8-800x1093.png" alt="Google_Tag_Manager8" class="img-rounded img-responsive aligncenter size-large wp-image-1100" srcset="/images/2014/12/Google_Tag_Manager8-800x1093.png 800w, /images/2014/12/Google_Tag_Manager8-600x819.png 600w, /images/2014/12/Google_Tag_Manager8.png 969w" sizes="(max-width: 800px) 100vw, 800px" />

デバックモードでPCからでもスマホからで取得できていれば完了です。

満足感で公開を忘れないよう気をつけて下さい。
