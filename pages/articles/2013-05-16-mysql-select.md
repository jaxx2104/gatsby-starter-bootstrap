---
id: 370
title: MySQLのSELECTを使いこなす！
date: 2013-05-16T22:36:35+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=370
permalink: /mysql-select
dsq_thread_id:
  - "1292386972"
image: /wp/images/2013/09/MySQL-01-500x3121.png
categories:
  - MySQL
tags:
  - mysql
  - SELECT
---
ブログのタイトルや日付情報が入っているデータベースから
  
SELECTで欲しいデータだけをズバッともらってくる。

<img src="/images/2013/04/MySQL-01-500x312.jpg" alt="MySQL-01" class="img-rounded alignnone size-large wp-image-317" />

サンプルで以下の2つのテーブルから

wp_entry

<table>
  <tr>
    <th>
      entry_id
    </th>
    
    <th>
      entry_title
    </th>
    
    <th>
      entry_text
    </th>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td>
      おとといの出来事
    </td>
    
    <td>
      本を買った。
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      昨日の出来事
    </td>
    
    <td>
      本が届くのが楽しみ
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      今日の出来事
    </td>
    
    <td>
      本が届いた！
    </td>
  </tr>
</table>

<!--more-->

wp\_entry\_meta

<table>
  <tr>
    <th>
      entry_meta_entry_id
    </th>
    
    <th>
      entry_meta_type
    </th>
    
    <th>
      entry_meta_vchar
    </th>
    
    <th>
      entry_meta_vdatetime
    </th>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td>
      entry_create_date
    </td>
    
    <td>
      null
    </td>
    
    <td>
      2013-05-14 21:35:15
    </td>
  </tr>
  
  <tr>
    <td>
      1
    </td>
    
    <td>
      entry_update_date
    </td>
    
    <td>
      null
    </td>
    
    <td>
      2013-05-14 21:37:34
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      entry_create_date
    </td>
    
    <td>
      null
    </td>
    
    <td>
      2013-05-15 12:56:54
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      entry_update_date
    </td>
    
    <td>
      null
    </td>
    
    <td>
      2013-05-15 12:56:54
    </td>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      entry_category
    </td>
    
    <td>
      blog
    </td>
    
    <td>
      null
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      entry_create_date
    </td>
    
    <td>
      null
    </td>
    
    <td>
      2013-05-16 23:00:41
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      entry_update_date
    </td>
    
    <td>
      null
    </td>
    
    <td>
      2013-05-16 23:43:01
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      entry_category
    </td>
    
    <td>
      blog
    </td>
    
    <td>
      null
    </td>
  </tr>
</table>

条件は記事作成日が5月16日の12時以降で、以下の項目を表示したい

  * 記事ID
  * 記事タイトル
  * 記事本文
  * 作成日

そういうときはこう書く。

```
SELECT entry_id, entry_title, substring(entry_text,1,10), entry_meta_vdatetime AS entry_time FROM wp_entry, mt_entry_meta WHERE entry_id=entry_meta_entry_id && entry_meta_type='entry_create_date' && entry_meta_vdatetime &gt; '2013-05-16 12:00:00';```


結果はこんな感じ

<table>
  <tr>
    <th>
      entry_id
    </th>
    
    <th>
      entry_title
    </th>
    
    <th>
      entry_text
    </th>
    
    <th>
      entry_time
    </th>
  </tr>
  
  <tr>
    <td>
      2
    </td>
    
    <td>
      昨日の出来事
    </td>
    
    <td>
      本が届くのが楽しみ
    </td>
    
    <td>
      2013-05-15 12:56:54
    </td>
  </tr>
  
  <tr>
    <td>
      3
    </td>
    
    <td>
      今日の出来事
    </td>
    
    <td>
      本が届いた！
    </td>
    
    <td>
      2013-05-16 23:00:41
    </td>
  </tr>
</table>

解説は眠たいので、また後日すいません（笑）

今日作業してて勉強になったのはこんな感じでした。
  
明日は午後からCMSのセミナーに行くので楽しみです。