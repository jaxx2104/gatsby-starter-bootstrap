---
id: 583
title: WordPress3.6で「jquery-1.10.2.min.map not found」のエラーが出る
date: 2013-08-25T00:39:22+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=583
permalink: /jquery-1-10-2-min-map-not-found
dsq_thread_id:
  - "1638659893"
categories:
  - Wordpress
tags:
  - WordPress
---
Chromeのデバッグツールを開いてみると、
  
「jquery-1.10.2.min.map not found」のエラーが大量に出てました。
  
調べてみるとWordPressのバージョン3.6を使っていて、
  
プラグインのどれかでjqueryのエラーが出ているとのこと。

```
WordPress 3.6 and jQuery.BlockUI Version problem
<a href="http://wordpress.org/support/topic/wordpress-36-and-jqueryblockui-version-problem-solution" >http://wordpress.org/support/topic/wordpress-36-and-jqueryblockui-version-problem-solution</a>
```

自分はプラグイン側が対応するまで一旦停止することにしました。