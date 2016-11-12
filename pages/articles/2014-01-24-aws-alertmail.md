---
id: 866
title: AWS での死活監視とアラートメールの送信方法
date: 2014-01-24T00:01:44+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=866
permalink: /aws-alertmail
dsq_thread_id:
  - "2163783293"
categories:
  - Amazon AWS
tags:
  - Twitter API
---
AWS での死活監視とアラートメールの送信方法がいくつかあり、
  
そのメリット、デメリットについて調べものをしたのでメモ。

## AWS Clowd Watch (AWS備え付けの監視ツール) を使う

監視からアラートメールまでAWS Consoleの設定で済む
  
ログが2週間しか残らないため非推奨とのこと。

> [CloudWatch]グラフの確認方法と確認できるグラフ一覧(EC2/ELB/RDS)
  
> http://dev.classmethod.jp/cloud/aws/cloudwatch-can-be-seen-graph/
  
> Amazon EC2編～EC2インスタンスを監視するには～
  
> http://recipe.kc-cloud.jp/archives/258 

## Zabbix + AWS SES (AWS のメールシステム) を使う

監視はZabbix アラートメールはAWS SES を使う方法
  
AWSにはELBやRDSなどZabbixで監視できない項目も多い。

> ZabbixのアラートメールをSESから送信してみた
  
> http://blog.youyo.info/blog/2013/01/31/sendmail-ses-on-zabbix/ 

## Zabbix + AWS Clowd Watch + AWS SES を使う

Zabbixサーバー内に AWS SDK を入れて CloudWatch API を利用する方法
  
ELBなどZabbixから監視できないようなClowdWatchのデータをZabbixに集積できる。

> ZabbixでAWS/CloudWatchの値を取得してみた。
  
> http://dev.classmethod.jp/cloud/aws/zabbix-with-cloudwatch/