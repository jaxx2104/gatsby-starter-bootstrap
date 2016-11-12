---
id: 581
title: Macでllコマンドを使えるようにする
date: 2013-08-24T22:48:39+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=581
permalink: /mac-ll-command
dsq_thread_id:
  - "1638054333"
categories:
  - Mac
tags:
  - Emacs
  - Mac
---
Linuxでよく使うんですが、Macは初期状態だと使えない。
  
なので.bahs_profileにエイリアスを設定します。

```
$ emacs .bash_profile
```

```
alias ll='ls -l'
```