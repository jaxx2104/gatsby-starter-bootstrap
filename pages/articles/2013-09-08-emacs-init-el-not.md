---
id: 617
title: emacsのinit.elが読み込めないときの対処方法
date: 2013-09-08T12:48:17+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=617
permalink: /emacs-init-el-not
dsq_thread_id:
  - "1730068840"
image: /wp/images/2013/09/emacs_initel-500x5001.png
categories:
  - Emacs
tags:
  - Emacs
  - init.el
  - Mac
---
開発環境を移行したときemacsの設定ファイルのinit.elが読み込めなくって、ちょっと困ったけどあっさり解決したので備忘録メモ。

<img src="/images/2013/09/emacs_initel-500x500.jpg" alt="emacs_initel" class="img-rounded aligncenter size-large wp-image-623" />

.emacs と .emacs.el が存在する場合は前者が優先的に読み込まれるので.emacsを削除すればよい。

```
~/.emacs  &lt;- こちらが優先的に読み込まれる
~/.emacs.d/init.el
```

これで読めました。

また他の方法としては
  
.emacs には ~/.emacs.d/init.el を読ませるだけで設定は init.el に書くっていうのもある。

```
(load (expand-file-name (concat (getenv "HOME") "/.emacs.d/init")))
```

こっちのほうが運用しやすいのかも。