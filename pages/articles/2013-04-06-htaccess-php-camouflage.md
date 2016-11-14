---
id: 119
title: .htaccessとphpを使って画像ファイルパスを偽装する。
date: 2013-04-06T23:56:43+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=119
path: /htaccess-php-camouflage
dsq_thread_id:
  - "1191076854"
image: /wp/images/2013/04/3402955869_5c79c8c7ef.jpg
categories:
  - PHP
tags:
  - .htaccess
  - apache
  - PHP
---
<img src="/images/2013/04/3402955869_5c79c8c7ef.jpg" alt="By: Chris Dlugosz" class="img-rounded size-full wp-image-138" srcset="/images/2013/04/3402955869_5c79c8c7ef.jpg 500w, /images/2013/04/3402955869_5c79c8c7ef-300x168.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" />

サーバーの特定のディレクトリにある画像ファイルを閲覧者に予想されURL直接打ったりなどして覗かれないよう架空のファイルパスを表示する仕組みを作った。

ディレクトリツリー

  * /root
  * /explode.php
  * /rebuild.php
  * /.htaccess
  * /画像ファイル

<!--more-->

**explode.php**

画像を掲載する側のphp

imgタグにファイルパスを暗号化したものを埋め込む。

```
<?php
$str = "画像ファイル名";
$encodeStr = base64_encode($str);
$encodeUrl = urlencode($encodeStr)
?>
<html>
<body>
<img src="<?php echo $encodeUrl; ?>.gif"/>
</body>
</html>
```

**.htaccess**

explode.phpから画像ファイルパスのリクエストを受け

rebuild.phpにクエリを投げる

```
RewriteEngine on
RewriteBase /
RewriteCond %{HTTP_REFERER} ^localhost
RewriteRule ^(画像ファイル名.gif)$ $1 [L]
RewriteRule ^(.*)\.gif$ rebuild.php?f=$1 [L,QSA]
```

**rebuild.php**

暗号化されたクエリを受け取り、

復号化してサーバーから画像ファイルを読み込む

```
<?php
$encodeUrl = $_GET&#91;'f'&#93;;
$encodeStr = urldecode($encodeUrl);
$decodeStr = base64_decode($encodeStr);

if(file_exists($decodeStr . ".gif")){
	header("Content-Type: text/html; charset=UTF-8");
	header("Content-Type: image/jpeg");

	readfile($decodeStr . ".gif");
}else{
	header("HTTP/1.1 404 Not Found");
}
?>
```

こうすることで元の画像ファイルパスをURL欄に直打ちしても403エラーを吐くが、

ホストからリダイレクトを経て暗号化された画像ファイルパスのみ画像を閲覧する事が可能

サイトで画像を小出しにして運用するときに便利かも。
