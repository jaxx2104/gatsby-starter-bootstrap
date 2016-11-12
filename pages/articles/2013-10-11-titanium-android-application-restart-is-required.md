---
id: 655
title: Titaniumで作ったAndroidアプリ起動時に"application restart is required"が出る
date: 2013-10-11T00:24:18+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=655
permalink: /titanium-android-application-restart-is-required
dsq_thread_id:
  - "1843307779"
image: /wp/images/2013/10/TitaniumSDK-500x5001.png
categories:
  - Titanium
tags:
  - 3.1.3
  - Android
  - application restart is required
  - bug2373
  - disableDetection
  - finishfalseroot
  - Titanium
---
今日は Titanium のはなし。

Google Play に公開したアプリにおいて、 Google Play の「開く」かアプリのショートカットから起動すると &#8220;application restart is required&#8221; と表示されるエラーに悩まされた。

## 環境

起動時にこんなエラーが出る

<img src="/images/2013/10/IMG_1495-281x500.jpg" alt="IMG_1495" class="img-rounded aligncenter size-large wp-image-656" srcset="/images/2013/10/IMG_1495-281x500.jpg 281w, /images/2013/10/IMG_1495-168x300.jpg 168w, /images/2013/10/IMG_1495.jpg 720w" sizes="(max-width: 281px) 100vw, 281px" />

  * Titanium SDK 3.1.3
  * GALAXY S2 Android 4.0.2
  * Xperia Z Android 4.1.3

<!--more-->

## 修正方法

tiapp.xmlに以下の1行を加える。

```
&lt;property name="ti.android.bug2373.finishfalseroot" type="bool"&gt;true&lt;/property&gt;
```

場所に注意が必要でこやつの下に加えないといけない。

```
&lt;ti:app xmlns:ti="http://ti.appcelerator.org"&gt;
```

Androidのみのエラーだからって<android>の下に加えると問題は修正されません。

```
&lt;android xmlns:android="http://schemas.android.com/apk/res/android"&gt;
```

## こんなのもあったけど&#8230;

あと以下のプロパティを使っているものもあったけど少し情報が古いみたい。

finishfalserootの1行のみでエラーは回避できてた。

```
&lt;property name="ti.android.bug2373.disableDetection" type="bool"&gt;true&lt;/property&gt;
&lt;property name="ti.android.bug2373.restartDelay" type="int"&gt;500&lt;/property&gt;
&lt;property name="ti.android.bug2373.finishDelay" type="int"&gt;0&lt;/property&gt;
&lt;property name="ti.android.bug2373.skipAlert" type="bool"&gt;true&lt;/property&gt;
&lt;property name="ti.android.bug2373.message"&gt;Initializing&lt;/property&gt;
&lt;property name="ti.android.bug2373.title"&gt;Restart Required&lt;/property&gt;
&lt;property name="ti.android.bug2373.buttonText"&gt;Continue&lt;/property&gt;
```

## bug2373の原因

原因はTitaniumっていうよりGoogleのIntent周りのバグみたい。

```
TitaniumのISSUE
&lt;a href="https://jira.appcelerator.org/browse/TIMOB-9285" title="Android: Message "An application restart is required" fires incorrectly." target="_blank">https://jira.appcelerator.org/browse/TIMOB-9285&lt;/a>
```

```
GoogleのISSUE
<a href="https://code.google.com/p/android/issues/detail?id=2373" title="Issue 2373:	Activity stack behaves incorrectly during the first run of an app when started from Eclipse" target="_blank">https://code.google.com/p/android/issues/detail?id=2373</a>
```

Titanium SDK 2.0の頃からこのエラーはあったようで、
  
いろんな策が講じられて、&#8221;ti.android.bug2373&#8243;とかで検索すると
  
エラーの回避方法みたいな内容がブログなどにも書かれているけど
  
人によって書き方が微妙に違うのと、ちょっと古い情報もあったりして迷った。