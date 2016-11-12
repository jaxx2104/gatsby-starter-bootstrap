---
id: 705
title: MacのターミナルのプロンプトをLinuxっぽく変える
date: 2013-11-11T00:13:03+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=705
permalink: /mac-terminal-prompt-linux-like
dsq_thread_id:
  - "1953492079"
categories:
  - Mac
tags:
  - .bash_profile
  - Emacs
  - Mac
  - Terminal
  - ターミナル
  - プロンプト
---
初期状態だとこんな感じ

```
iMac:~ jaxx2104$
```

## 変更

このサイトでどんな表示になるのかを確認しながら変更できる。

```
Bash $PS1 Generator
<a href="http://www.kirsle.net/wizards/ps1.html" title="Bash $PS1 Generator" target="_blank">http://www.kirsle.net/wizards/ps1.html</a>
```

出力結果を.bash_profileに書けばいいだけ

```
emacs .bash_profile
```

自分はこう書いてます。

```
export PS1="[\u@\h \W]\\$ "
```

## 反映

```
sourse .bash_profile
```

するとこんな感じになる。

```
[jaxx2104@iMac ~] $
```

おしまい。