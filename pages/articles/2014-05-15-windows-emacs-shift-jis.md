---
id: 956
title: windows版 emacsで日本語ディレクトリ内のファイルがおかしくなった時の対処方法
date: 2014-05-15T02:02:42+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=956
path: /windows-emacs-shift-jis
categories:
  - Emacs
tags:
  - Emacs
  - init.el
  - Mac
---
Windowマシンにemacsを入れた際に、  
日本語ディレクトリ内のファイルを開くと中身が空の状態になってしまいます。

## 原因は文字コードのせい

init.elもしくは.emacsに以下の一文を追加して下さい。

```
(setq default-file-name-coding-system 'japanese-shift-jis)
```
これで問題なくファイルが開けるはずです。
