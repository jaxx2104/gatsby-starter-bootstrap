---
id: 388
title: PHPの検索・分割・置換
date: 2013-05-23T22:43:07+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=388
permalink: /php-explode-spilit-replace
dsq_thread_id:
  - "1310299215"
image: /wp/images/2013/09/phplogo-500x3261.png
categories:
  - PHP
tags:
  - explode
  - PHP
  - preg_match_all
  - preg_replace
  - preg_split
  - split
  - str_replace
---
23歳になりました。すごく祝ってもらちゃって嬉しかったです。

お返ししていかなくてはいけませんな。有難うございました。

<img src="/images/2013/05/phplogo-500x326.jpg" alt="phplogo" class="img-rounded alignnone size-large wp-image-391" />

で、いきなりPHPの初歩的な話になるんですが文字列をイジイジしたいときに使う、関数のおさらいをしていこうと思います。

##

## 検索

```
$array = preg_match_all ( string $pattern, string $subject )```


<!--more-->



&nbsp;

## 分割

文字列を文字列で分割

```
$array = explode  ( string $delimiter, string $string ))```

文字列を正規表現で分割( 非推奨 )

```
$array = split ( string $pattern, string $string )<)```
文字列を正規表現で分割

```
$array = preg_split('/[\s]+||

<p>
  こうやると複数条件でかつ、こちらだけ後方参照.*?<\/p>/',$String,null,(PREG_SPLIT_DELIM_CAPTURE|PREG_SPLIT_NO_EMPTY));</;```


  <ul>
    <li>
      PREG_SPLIT_NO_EMPTY 空のものは返さない
    </li>


    <li>
      PREG_SPLIT_DELIM_CAPTURE 後方参照も返す
    </li>

  </ul>


  <h2>
    置換
  </h2>


  <p>
    文字列を文字列で置換
  </p>


  ```
$mixed = str_replace ( mixed $search, mixed $replace,mixed $subject )</p)```

  <p>
    文字列を正規表現で置換
  </p>


  ```
$mixed = preg_replace ( mixed $pattern, mixed $replace, mixed $subject )</pr)```
