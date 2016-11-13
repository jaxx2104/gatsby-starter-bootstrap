---
id: 170
title: MySQLコマンド一覧
date: 2013-04-16T21:34:56+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=170
permalink: /mysql-command-memo
dsq_thread_id:
  - "1215041451"
image: /wp/images/2013/09/MySQL-01-500x312.png
categories:
  - MySQL
tags:
  - mysql
---
いまMySQLでの作業をさせて頂いてます。

<img src="/images/2013/04/MySQL-01-500x312.jpg" alt="MySQL-01" class="alignnone size-large wp-image-317" />

MySQLをいままでりんご1みかん2ぶどう3みたいな程度でしか使ってこなかった。
  
そんなわけでMySQLコマンド一覧



## データベースの操作

データベース接続

```
use データベース名
```

データベース表示

```
SHOW DATABASES
```

## テーブルの操作

テーブル表示

```
SHOW TABLES
```

テーブル削除

```
DROP TABLE テーブル名
```

フィールド表示

```
DESCRIBE テーブル名
```

全データ表示

```
SELECT * FROM テーブル名
```

テーブル作成

```
CREATE TABLE テーブル名(
  カラム1 NVARCHAR(10),
  カラム2 NVARCHAR(5),
  カラム3 NVARCHAR(20),
);
```

テーブル追加

```
ALTER TABLE jt_life ADD life_id INT(8) PRIMARY KEY FIRST;
```

テーブル編集

```
ALTER TABLE jt_shop CHANGE shop_road shop_road NVARCHAR(200);
```

## データの操作

データのインポート

```
LOAD DATA INFILE "/home/iwa/shop.csv" INTO TABLE jt_shop FIELDS TERMINATED BY ',';
```

データの全削除

```
DELETE FROM テーブル名
```

直近のWARNING表示

```
SHOW WARNINGS
```