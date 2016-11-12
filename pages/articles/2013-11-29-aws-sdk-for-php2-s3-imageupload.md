---
id: 763
title: AWS SDK for PHP2 を使って S3 に画像をアップしてみた
date: 2013-11-29T23:58:21+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=763
permalink: /aws-sdk-for-php2-s3-imageupload
dsq_thread_id:
  - "2010092722"
categories:
  - Amazon AWS
tags:
  - PHP
  - Twitter API
---
AWS 登録してみたので早速触ってみました。
  
登録には携帯番号やクレジットカードが必要でした。

AWSの操作は以下４つの方法がある。

  * AWS Management Console
  * AWS SDK
  * AWS CLI
  * AWS Query API

## AWS Management Console

AWSのWeb管理画面上で手動で操作を行う。

## AWS SDK

SDKをインストールすることで、プログラムによって自動化したりすることができる。

<!--more-->

## AWS CLI

AWS Management Consoleをローカルで操作できます。

## AWS Query API

HTTPリクエストを使って操作する。アクセスする際の署名が少々煩わしい。



## サンプル

今回はAWS SDK for PHP2 を使って S3 に画像をアップしてみます。

```
class SampleAws {
  // Amazon SDKのインスタンス
  private $obj = null;

  /**
   * AWS にアクセスする際の鍵
   * @return {object} instance
   */
  public function getInstance() {
    if (is_null($this->obj)) {
      $this->obj = Aws::factory(array(
        'key'    => 'XXXXXXXXXXXXX',
        'secret' => 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        'region' => 'ap-northeast-1'
      ))->get('s3');
    }
    return $this->obj;
  }

  /**
   * s3に画像を保存
   * @return {object} EndpointArns 全てのエンドポイント
   */
  public function putObjectTest($tempFileName){
    $this->getInstance()->putObject(array(
      'Bucket' => 'jaxx2104',
      'Key'    => $tempFileName,
      'Body' => EntityBody::factory(fopen($tempFileName, 'r')),
    ));
  }
}
```

今回の勉強会でライトニングトークやらせて頂いたので、その時のスライドを載せときます。