---
id: 147
title: MAMPでいれたMySQLをターミナル操作
date: 2013-04-14T00:17:29+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=147
path: /mamp-mysql-terminal
dsq_thread_id:
  - "1212655925"
categories:
  - 雑記
tags:
  - Emacs
  - Mac
  - MAMP
  - mysql
---
MacにMAMPを入れた。
  
MySQLをターミナルからコマンドで作業したときのメモ

ターミナル開いてmysqlと叩いて呼べるようにパスを通す。

```
cd
emacs .bash_profile
```

mysqlまでのパスを環境変数に入力する。

```
export PATH=$PATH:/Applications/MAMP/Library/bin
```

```
source ~/.bash_profile
```

これで完了あら簡単。初回起動はuserとpassはroot

```
mysql -u root -p
```