---
id: 445
title: Google AdSense をレスポンシブデザインに対応する方法
date: 2013-06-17T23:32:27+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=445
permalink: /google-adsense-responsive
dsq_thread_id:
  - "1407552097"
categories:
  - JavaScript
tags:
  - AdSense
  - Google
  - アドセンス
  - レスポンシブ
---
Googleアドセンスがレスポンシブに対応したとのことで、実際にサイドバーに埋め込んでみる。

```
<script type="text/javascript">
google_ad_client = "ca-publisher-id";
width = document.documentElement.clientWidth; //ウインドウ幅取得
google_ad_slot = "**********"; //広告のID、3箇所
google_ad_width = 320;
google_ad_height = 50;
if (width > 500) { //ウインドウ幅500以上
google_ad_slot = "**********";
google_ad_width = 468;
google_ad_height = 60;
}
if (width > 800) { //ウインドウ幅800以上
google_ad_slot = "**********";
google_ad_width = 728;
google_ad_height = 90;
}
</script>
<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js">
</script>
```

&nbsp;

PCブラウザの横幅をグイグイ変えて動的に変化させるのは、できなかった。
  
あと広告サイズを小さくしようとしたけどリサイズっていうよりトリムされる。

&nbsp;

でも、スマホで見た時に横幅はみ出してスクロールするとグラグラ〜（涙）
  
なんて事は無くなるのでよかった。

```
公式はこちら
<a href="https://support.google.com/adsense/answer/1354736?hl=en&#038;topic=1271508&#038;ctx=topic#sourceid=aso&#038;subid=ww-en-et-asblog_2013-05-23&#038;medium=link">Modification of the AdSense ad code</a>
```

&nbsp;