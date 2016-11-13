---
id: 876
title: Zabbix と AWS SES による死活監視とアラートメールの送信方法
date: 2014-01-26T14:50:56+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=876
permalink: /zabbix-aws-ses
dsq_thread_id:
  - "2176475586"
dsq_needs_sync:
  - "1"
categories:
  - Amazon AWS
tags:
  - Emacs
  - Mac
  - PHP
---
## Zabbix のメールスクリプトを設置

参考 : http://www.zabbix.jp/node/1441

```
# cd /usr/local/src/
# git clone git://github.com/zabbix-jp/plugins.git
# mv plugins zabbix-jp-plugins
# cp -a /usr/local/src/zabbix-jp-plugins/notification/sendmessage-smtp-php /etc/zabbix/alertscripts/
# chmod 755 /etc/zabbix/alertscripts/sendmessage-smtp-php/sendmessage_smtp_php.sh
```

<!--more-->

## メールスクリプトの設定

メールスクリプトのSMTP認証の設定をします。

AWSコンソールから各項目の値を取得できます。HOSTのポート番号は465です。

また動作しない場合は $mailer->SMTPDebug = 1; と追加することで、

デバックモードを有効にしてエラーを知ることもできます。

```
# emacs /var/lib/zabbix/sendmessage-smtp-php/sendmessage_smtp_php.sh
```

> $MAIL\_SMTP\_HOST = &#8216;email-smtp.us-east-1.amazonaws.com:465&#8217;;

> $MAIL\_SMTP\_USER = &#8216;SMTP-USERNAME&#8217;;

> $MAIL\_SMTP\_PASS = &#8216;SMTP-USERPASS&#8217;;

> $mailer->SMTPDebug = 1;

Zabbixの設定ファイルにメールスクリプトのパスを記します。

```
# emacs /var/lib/zabbix/zabbix_server.conf
```

> AlertScriptsPath=/etc/zabbix/alertscripts

## コマンドで確認

```
php sendmessage-smtp-php/sendmessage_smtp_php.sh mail@sample.com title body
```

success が返れば成功

php の OpenSSL が有効になっていないと怒られたので、

-with-openssl 追加し再コンパイルし直し。その後受信確認できました。

## スクリプトを登録

あとは通常通りZabbixの管理画面からスクリプトを登録します、

管理 -> メディアタイプ -> メディアタイプの作成 をクリックし、

  * 説明 : sendmessage\_smtp\_php.sh
  * タイプ : スクリプト
  * 名前 : sendmessage\_smtp\_php/sendmessage\_smtp\_php.sh

と入力し登録。ユーザーとアクションを設定すれば完了です。
