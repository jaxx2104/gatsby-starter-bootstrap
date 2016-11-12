---
id: 899
title: iOS Safari用 Evernoteのブックマークレットの作成
date: 2014-03-02T17:14:05+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=899
permalink: /ios-safari-evernote
image: /wp/images/2014/03/60008d9b64bb36ff4a6fd973c45bfcea-500x3871.png
categories:
  - iOS
  - JavaScript
---
iPad や iPhone でもWebのクリップを手軽にしたいので、

ブックマークレットを用意した、快適なEvernote Lifeを。



## 使い方

  1. Safariに適当なサイトのブックマークを追加
  2. そのブックマークの名前欄を「Evernoteに追加」とかにする。
  3. さらにURL欄は以下をコピペして保存する。

```
javascript:%28function%28%29 %7b%0d%0a%09EN_CLIP_HOST %3d %27http%3a%2f%2fwww%2eevernote%2ecom%27%3b%0d%0a%09try %7b%0d%0a%09%09var x %3d document%2ecreateElement%28%27SCRIPT%27%29%3b%0d%0a%09%09x%2etype %3d %27text%2fjavascript%27%3b%0d%0a%09%09x%2esrc %3d EN_CLIP_HOST %2b %27%2fpublic%2fbookmarkClipper%2ejs%3f%27 %2b %28new Date%28%29%2egetTime%28%29 %2f 100000%29%3b%0d%0a%09%09document%2egetElementsByTagName%28%27head%27%29%5b0%5d%2eappendChild%28x%29%3b%0d%0a%09%7d catch%28e%29 %7b%0d%0a%09%09location%2ehref %3d EN_CLIP_HOST %2b %27%2fclip%2eaction%3furl%3d%27 %2b encodeURIComponent%28location%2ehref%29 %2b %27%26title%3d%27 %2b encodeURIComponent%28document%2etitle%29%3b%0d%0a%09%7d%0d%0a%7d%29%28%29%3b
```

あとはEvernoteで保存したいサイトで登録したブックマークレットを押すと…。

<img src="/images/2014/03/60008d9b64bb36ff4a6fd973c45bfcea-500x387.png" alt="EvernoteCapture" class="img-rounded img-responsive alignnone size-large wp-image-906" srcset="/images/2014/03/60008d9b64bb36ff4a6fd973c45bfcea-500x387.png 500w, /images/2014/03/60008d9b64bb36ff4a6fd973c45bfcea-300x232.png 300w, /images/2014/03/60008d9b64bb36ff4a6fd973c45bfcea.png 1138w" sizes="(max-width: 500px) 100vw, 500px" />

こんな感じで、アプリとかページ遷移せずに保存できる。
