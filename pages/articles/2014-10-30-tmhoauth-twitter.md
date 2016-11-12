---
id: 1043
title: tmhOAuthを使ってTwitterに画像付きで投稿する
date: 2014-10-30T23:06:40+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=1043
permalink: /tmhoauth-twitter
categories:
  - PHP
tags:
  - PHP
  - Twitter API
---
Twitter APIを使って画像付きで投稿する場合、
  
ライブラリのtmhOAuthで簡単に認証とリクエスト行うことが出来ます。

> themattharris/tmhOAuth
  
> <a href="https://github.com/themattharris/tmhOAuth" title="tmhOAuth" target="_blank">https://github.com/themattharris/tmhOAuth</a> 

## OAuth認証

Twitterへの認証の際に使う、認証鍵はTwitter Developersにて取得します。

> Twitter Developers
  
> <a href="https://dev.twitter.com/" title="Twitter Developers" target="_blank">https://dev.twitter.com/</a> 

<!--more-->

認証の際に「Problem with the SSL CA cert」と言われたので、
  
curl\_ssl\_verifypeerを 一時的に false にしました。

```
$twConf = array(
    'consumer_key'    => '****************************',
    'consumer_secret' => '**************************************************',
    'user_token'      => '**************************************************',
    'user_secret'     => '*********************************************',
    'curl_ssl_verifypeer' => false
);

require './tmhOAuth.php';
$tmhOAuth = new tmhOAuth($twConf);
```

## 画像を投稿する

試しに同じ階層にある画像を読んで投稿します。

```
$image = "/var/www/html/sample.jpg";
$message = "ロボットからの投稿テスト";

$endpoint = $tmhOAuth->url('1.1/statuses/update_with_media');
$imageName  = basename($image);
$params = array(
    'media[]'  => "@{$image};type=image/jpeg;filename={$imageName}",
    'status'   => "{$message}"
);
$code = $tmhOAuth->request('POST', $endpoint, $params, true, true);
if ($tmhOAuth->response["code"] == 200){ // $codeにもステータスは返ってきます
    var_dump($tmhOAuth->response["response"]);
} else {
    var_dump($tmhOAuth->response["error"]);
}
```

ツイートが投稿出来ました。

<blockquote class="twitter-tweet" lang="ja">
  <p>
    ロボットからの投稿テスト <a href="http://t.co/JJnCpKsK2c">pic.twitter.com/JJnCpKsK2c</a>
  </p>
  
  <p>
    &mdash; jaxx2104 (@jaxx2104) <a href="https://twitter.com/jaxx2104/status/524807599380631552">2014, 10月 22</a>
  </p>
</blockquote>