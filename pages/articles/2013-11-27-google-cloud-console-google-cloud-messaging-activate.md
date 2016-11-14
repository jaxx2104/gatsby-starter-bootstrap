---
id: 758
title: Google Cloud Console から Google Cloud Messaging を有効にする
date: 2013-11-27T01:40:45+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=758
path: /google-cloud-console-google-cloud-messaging-activate
dsq_thread_id:
  - "2001604140"
categories:
  - Google
tags:
  - Android
  - GCM
  - Google APIs Console
  - Google Cloud Console
  - Google Cloud Messaging
  - Twitter API
---
## Google APIs Console じゃなくなった。

Google APIs Console から Google Cloud Console に変わって、見た目も随分変わってしまいました。

## プロジェクト単位の管理画面

Create Project を押すと本人確認を求められます。

自分は電話認証にしました、非通知でかかってきた電話に出て、言われた通りに認証番号を入力します。

<!--more-->
  
認証が終わればプロジェクト作成の画面に遷移します。

## Google Cloud Messaging を有効にする。

APIs & auth > APIs でAPIの一覧画面が表示されます。

その中の「Google Cloud Messaging for Android」の右側にある「OFF」を押して、しばらくすると「ON」になります。



続いて APIs & auth > Registered apps でアプリを登録します。

名前やプラットフォーム、アプリ情報を入力していきます。

SHA1のフィンガープリントを求められるので以下のコマンドで調べます。

```
keytool -list -keystore -v xxxxx.keystore
```

以上で有効化されると思います。
