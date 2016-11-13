---
id: 221
title: TwitterAPI v1.1とPHPライブラリについて調べた。
date: 2013-04-19T00:52:25+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=221
permalink: /twitterapi-v1-1-php-library
dsq_thread_id:
  - "1221874753"
categories:
  - Twitter API
tags:
  - PHP
  - Twitter
  - Twitter API
---
TwitterAPIはv1.1になってからOAuth認証が必須となっています。
  
そのためライブラリで面倒な認証をなんとかしようと思って調べた。
  
Twitterが公式にライブラリをいくつか紹介してくれている。

```
TwitterDocument
<a href="https://dev.twitter.com/docs/twitter-libraries">https://dev.twitter.com/docs/twitter-libraries</a>
```

PHPで動作するライブラリで今回調べたものがこの3つ。

  * tmhOAuth by @themattharris
  * twitteroauth by @abraham
  * 140dev Twitter Framework by @140dev




  


## tmhOAuth by @themattharris

RESTAPI,StreamingAPIともに動作する、非常に気軽にTwitterAPIを楽しめる。

```
Github tmhOAuth by @themattharris
<a href="https://github.com/themattharris/tmhOAuth">https://github.com/themattharris/tmhOAuth</a>
```

導入に関してはサンプルファイルまで公開されているので参考にしながら制作できる。

```
Github tmhOAuth-examples
<a href="https://github.com/themattharris/tmhOAuth-examples">https://github.com/themattharris/tmhOAuth-examples</a>
```

ただしデメリットはライブラリのファイル数がちょっと多いことくらい。
  
いまからTwitterAPI触って見ようかなって思っている人はこのライブラリがいいかも。

## twitteroauth by @abraham

```
Github twitteroauth by @abraham
<a href="https://github.com/abraham/twitteroauth">https://github.com/abraham/twitteroauth</a>
```

たぶんtmhOAuthよりも参考になるエントリーが多い（気がする）、
  
そしてファイル数が少なく認証も手軽にできるライブラリ。
  
残念なのが更新が最近ないようなことと、StreamingAPIが動作しないこと。

## 140dev Twitter Framework by @140dev

```
140dev Twitter Framework
<a href="http://140dev.com/free-twitter-api-source-code-library/">http://140dev.com/free-twitter-api-source-code-library/</a>
```

海外のエントリーで多く紹介されているライブラリ、初心者でもTwitterAPIの仕組みをフレームワークによって簡単に理解できるように作られている。
  
メールアドレス登録しないとファイル貰えないがpdfファイルの説明書やらも付いてくる。Twitterのコピーみたいなサイトを作るときはこれかな。