---
id: 850
title: iOS , Androidアプリ内WebView での User Agent について
date: 2014-01-11T23:21:37+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=850
permalink: /webview-user-agent
dsq_thread_id:
  - "2108496253"
categories:
  - Android
  - iOS
tags:
  - Android
  - iOS7
  - Mac
---
## WebView での User Agent ってどうなるんだろう？

WebViewで構成されたハイブリッドアプリを開発しようと思った。

既存のウェブサイトでも User Agent でアプリかウェブかを判断できれば、

CSSでスタイルの切り分けとかが出来ていいんじゃないかと思った。

## iOS

iOS7 Safari の User Agent

> Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53

iOS7 WebView の User Agent

> Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465

<!--more-->

## Android

Android4.4 Kitkat Chrome の User Agent

> Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/KRT16M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36

Android4.4 Kitkat WebView の User Agent

> Mozilla/5.0 (Linux; Android 4.4; Nexus 5 Build/BuildID) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36

iOSもAndroidどちらともデフォルトのブラウザとWebViewをUser Agentによって判断することは可能。

ただ、Androidに関してはChromeがデフォルトのブラウザに統合されたのが最近なので遡って調べないといけさそう。

## WebView での User Agent は変更（偽装）できるのか？

iOSもAndroidどちらとも変更（偽装）可能。

User Agentを独自なものにすることで出し分けはできるみたい。

実用的かどうかはまだちょっとわからない。
