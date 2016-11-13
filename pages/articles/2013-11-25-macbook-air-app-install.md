---
id: 735
title: Macbook Air 買ったので環境構築します
date: 2013-11-25T01:14:59+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=735
permalink: /macbook-air-app-install
dsq_thread_id:
  - "1995259545"
image: /wp/images/2013/11/IMG_1593-500x5001-e1385313381165.jpg
categories:
  - Mac
tags:
  - Android
  - Emacs
  - Genymotion
  - Mac
  - Titanium
---
今週末 Macbook Air 13インチの梅買いました。

メモリ４GB でも xcodeサクサクです。

[<img src="/images/2013/11/IMG_1593-500x5001-e1385313381165.jpg" alt="IMG_1593-500x5001" class="img-rounded img-responsive alignnone wp-image-753" srcset="/images/2013/11/IMG_1593-500x5001-e1385313381165.jpg 500w, /images/2013/11/IMG_1593-500x5001-e1385313381165-150x150.jpg 150w, /images/2013/11/IMG_1593-500x5001-e1385313381165-300x300.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" />](/images/2013/11/IMG_1593-500x5001-e1385313381165.jpg)

## 経緯

今まで ThinkPad の T420si を使ってたんですが、NVIDIA 搭載していて3D CADなんかもバリバリ動いてたんだけど勉強会で持ち運んだりアプリ作ったりっていう使い方になってきたのでオークションに出品して、それを元に買いました。

<!--more-->

## 環境

## ブラウザ

Chrome Canary

インストール作業の一番最初にこれ入れる。

http://www.google.co.jp/intl/ja/chrome/browser/canary.html

## ターミナル

iTerm2

Mac標準のターミナルより便利

http://www.iterm2.com/#/section/home

テーマはこれ使ってます。

https://raw.github.com/episko/iterm2-monokai/master/Monokai.itermcolors

## パッケージ管理

Homebrew

いれたらbrew doctorしてね。

http://brew.sh/

その時に入れるとくといいやつ。

wget - curlでもいいけど慣れです。

npm - パッケージ管理

nodejs - いろいろ使う

あと .bash_profile をここで作った。

## テキストエディタ

Emacs 24

僕らのEmacs。Homebrew を使って入れた。

http://www.stuartgunter.org/emacs-setup-mac/

Sublime Text3

流行っているので入れた。まだ馴染みはない。

http://www.sublimetext.com/3

elisp とかは他のマシンからごっそり移行してます。

## 開発ツール

JDK

まずこれを入れておく。

Xcode

iOS開発ツール

Xcode Command Line Tool

Titanium で必要になる

Preference > Download > Command Line Tool

Android SDK

2.3.3 と4系最新あればいいかと、

Android Emulator が重い。

Titanium Moblile

アプリの開発は Titanium を使っています。

Javascriptで書いて各プラットフォームでビルドしてます。

## 仮想

VirtualBox

仮想マシンをたてる時に使うけど、airは用途的に

WindowsやLinux入れたりはしないかなあ。

Genymotion

Android Emulator を仮想化したやつ

立ち上がりも動作も早いので開発がスムーズに

## AppStore

evernote - メモ

Rocket − ブログ書くやつ

transmit − FTPクライアント

Windows Magnet − Windowsっぽく画面分割するやつ

Dash − 各言語のドキュメントが引けるやつ

Alfred − 検索型ランチャー

Caffeine − スリーブONOFF

key4remap

あと今回、keynote,Number,Pager が無料でついてくる。

こんな感じ。なにかいいソフトあれば教えて下さい。
