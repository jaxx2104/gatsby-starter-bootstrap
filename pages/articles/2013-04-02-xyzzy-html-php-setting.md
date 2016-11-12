---
id: 80
title: xyzzyをhtmlやphpを書くときの設定
date: 2013-04-02T23:35:00+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=80
permalink: /xyzzy-html-php-setting
dsq_thread_id:
  - "1182081508"
image: /wp/images/2013/09/xyzzy-e1364919322419-1024x617.png
categories:
  - 雑記
tags:
  - PHP
  - xyzzy
---
Windowsでコードを書くとき自分はxyzzyを使っています。

<img src="/images/2013/04/xyzzy-e1364919322419-1024x617.jpg" alt="" class="img-rounded alignnone size-large wp-image-113" />

HTMLやPHP書いてて色付けや補完があったほうが便利だし

コード書くのも楽しいから、作業も捗ります。

自分が設定していく中でまとまった情報が無くて手間取ったのでメモ

## xyzzyのダウンロード

> xyzzy - 窓の杜ライブラリ
> <a href="http://www.forest.impress.co.jp/library/software/xyzzy/">http://www.forest.impress.co.jp/library/software/xyzzy/</a>


<!--more-->

## 各種site-lispのダウンロード

自分が初めてxyzzyを使ったとき、ここでつまづきました&#8230;

それぞれsite-lispをダウンロードしてxyzzy/site-lispへ入れてください。

**html+-mode**

xyzzyにはhtml-modeというのが標準で入ってるでも+がつくだけあって必須

でもソースがどこにも無い！なので置いときますもしよかったら使ってください。

**php-mode**

php書くんだったら必要かと思います。


> Junk Scripts
> <a href="http://www7a.biglobe.ne.jp/~hat/xyzzy/php-mode.html">http://www7a.biglobe.ne.jp/~hat/xyzzy/php-mode.html</a>

**javascript-mode**

jsは書かないの？書くでしょ！！


> XyzzyWiki
> <a href="http://xyzzy.s53.xrea.com/wiki/index.php?%B3%C8%C4%A5lisp%2Fjavascript-mode">http://xyzzy.s53.xrea.com/wiki/index.php?%B3%C8%C4%A5lisp%2Fjavascript-mode</a>

**multi-major-mode**

これがすごく便利なもので複数のモードを切り替えて使うことができます。

PHPの中にHTMLやjsが出てきても色付けとかが綺麗に表示されます。


> しょぼじょぼすくりぷと
> <a href="http://www2.ocn.ne.jp/~cheerful/script/xyzzy/mode/multiMode.html">http://www2.ocn.ne.jp/~cheerful/script/xyzzy/mode/multiMode.html</a>


## バイトコンパイルする

xyzzyを起動して、先ほど入れたsite-lispをバイトコンパイルします。

バイトコンパイルってなんぞやって人は、以下の操作手順

ESC押しながらx、画面下部のコマンド欄にbyte-compile-fileと打ってEnter、ファイル名(html+-mode.lとか)を打ってEnter

## siteinit.lの書き換え

```
(load-library "multi-major-mode")

(setq ed::\*multi-mode-running\* t)

(setf \*multi-mode-text-attribute\* nil)

(require "html -mode")

(pushnew '("\\.s?html?$" . html -mode) \*auto-mode-alist\* :test 'equal)

(load-library "javascript-mode")

(push '("\\.js$" . javascript-mode) \*auto-mode-alist\*)

(load-library "php-mode")

(pushnew '("\\.php$" . html -mode) \*auto-mode-alist\*)

;(setq php-indent-level 4)

(setq c-indent-level 4)

(defun multi-html -mode ()

(multi-major-mode-start t "html -mode"

'("<!--?php" "?-->" "php-mode")



'("" "text-mode")

'("<script" "" "javascript-mode"))) (add-hook 'ed::\*html -mode-hook\* 'multi-html -mode) [/plain]
```
