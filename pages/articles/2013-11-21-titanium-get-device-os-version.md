---
id: 715
title: TitaniumでデバイスのOSバージョンの取得
date: 2013-11-21T02:48:24+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=715
permalink: /titanium-get-device-os-version
dsq_thread_id:
  - "2001577798"
image: /wp/images/2013/11/f19313ab36c560af5c9a4d02c866846d-500x4571.jpg
categories:
  - Titanium
tags:
  - iOS7
  - Ti.Platform.version
  - Titanium
---
アプリをiOS7のデザインに対応するときに新しいナビゲーション部分に回りこんでしまうため、iOS7のみで分岐が必要になってきます。

[<img src="/images/2013/11/f19313ab36c560af5c9a4d02c866846d-500x457.jpg" alt="titanium_ios7" class="img-rounded alignnone size-large wp-image-717" srcset="/images/2013/11/f19313ab36c560af5c9a4d02c866846d-500x457.jpg 500w, /images/2013/11/f19313ab36c560af5c9a4d02c866846d-300x274.jpg 300w, /images/2013/11/f19313ab36c560af5c9a4d02c866846d.jpg 640w" sizes="(max-width: 500px) 100vw, 500px" />](/images/2013/11/f19313ab36c560af5c9a4d02c866846d.jpg)

<small>正直この分岐は納得いかない。</small>

<!--more-->

## Ti.Platform.version を使う

メジャーバージョンのみを見るので小数点以下は切り捨てます。

```
var version = Math.floor(Ti.Platform.version);
```

あとバージョンに負の数はあたらないだろうから下でも動く。

```
var version = ~~(Ti.Platform.version);
```

むしろこっちのほうが速い。



ただ0以上2147483648未満の少数でなくてはいけない。

iOS2147483648になるのはいつなのか気になるけども、そのころには端末も義眼とかなんですかね？なんなんですかね？

## iOS7で分岐させる例

```
var version = ~~(Ti.Platform.version);
if (OS_IOS && version >= 7){
    $.window.setTop(64);
}
```

こういう感じで使う。
