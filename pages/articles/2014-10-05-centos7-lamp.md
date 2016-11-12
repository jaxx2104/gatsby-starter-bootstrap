---
id: 988
title: 'CentOS7にLAMP環境とWordPress構築[さくらVPS]'
date: 2014-10-05T15:23:17+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=988
permalink: /centos7-lamp
image: /wp/images/2014/10/centos-500x1341.png
categories:
  - Apache
  - CentOS
  - MySQL
  - PHP
tags:
  - apache
  - CentOS
  - Emacs
  - Mac
  - PHP
  - WordPress
---
さくらVPSをCentOS7へアップデートしました。
  
いろいろ変更点あったので備忘録としてメモしました。
  
ご参考まで。

<img src="/images/2014/10/centos-500x134.png" alt="centos" class="img-rounded img-responsive size-large wp-image-1008" srcset="/images/2014/10/centos-500x134.png 500w, /images/2014/10/centos-300x80.png 300w, /images/2014/10/centos.png 1340w" sizes="(max-width: 500px) 100vw, 500px" />

## CentOS7 アップデート

OSのインストールとネットワーク周りはさくらの管理画面から。
  
「OS再インストール」->「カスタムOSインストール」
  
以下参照

```
CentOS 7 カスタムOSインストールガイド
<a href="http://support.sakura.ad.jp/manual/vps/cpanel/custom_centos7.html" title="http://support.sakura.ad.jp/manual/vps/cpanel/custom_centos7.html" target="_blank">http://support.sakura.ad.jp/manual/vps/cpanel/custom_centos7.html</a>
```

<!--more-->

## yum アップデート

> $ yum -y update 

## 日本語環境

> $ emacs /etc/locale.conf 

```
#LANG="en_US.UTF-8" 
LANG="ja_JP.UTF-8"
```

## SELINUX 確認・無効

> $ getenforce
  
> $ setenforce 0 

## ファイアウォール

初期設定だとsshのみしか許可していないのでhttpを追加。

> $ firewall-cmd -state
  
> $ firewall-cmd -list-services
  
> $ firewall-cmd -add-service=http 

## SSH

設定。SSHのポート番号は標準だと22ですが、
  
セキュリティ上任意の番号に変更します。

> $ emacs /etc/ssh/sshd_config 

```
Port ポート番号;
PermitRootLogin No;
```

ファイアウォールの設定もあわせて変更してください。

> $ emacs /usr/lib/firewalld/services/ssh.xml 

サービス開始

> $ systemctl restart sshd.service 

## LAMP環境構築

php,mysql,apache,emacs,wgetをyumでインストール

> yum -y install emacs wget php-mysql php php-gd php-mbstring mariadb mariadb-server httpd 

## Appache

使用状況によって違うので、必要最低限の設定。

> $ emacs /etc/httpd/conf/httpd.conf 

```
# サーバーの名前を設定
# ServerName www.example.com:80
ServerName XX.XX.XX.XX:80

# ディレクトリごとに「.htaccess」を使用できるようにする。
# AllowOverride None
AllowOverride ALL

# デフォルトで文字コードを指定しないようにする
# AddDefaultCharset UTF-8
```

サービス開始

> $ systemctl start httpd.service
  
> $ systemctl enable httpd.service 

## MySQL

mysqlはmariadbという名前になった様子。

> $ emacs /etc/my.cnf.d/server.cnf 

```
[mysqld]
character-set-server = utf8
plugin-load = handlersocket.so
```

WordPress用のユーザーと権限設定

> > create database データベース名;
  
> > grant all on データベース名.* to &#8216;ユーザー名&#8217;@&#8217;ホスト名&#8217; identified by &#8216;パスワード&#8217; 

サービス開始と初期設定

> $ systemctl start mariadb
  
> $ systemctl enable mariadb
  
> $ mysql\_secure\_installation 

```
既存password（デフォルトは空）
新規password
あとは全てyes
```

## WordPress

以下から最新バージョンを確認して4.0を入れます。
  
<a href="https://ja.wordpress.org/" title="https://ja.wordpress.org/" target="_blank">https://ja.wordpress.org/</a>

> $ cd /var/www/html/
  
> $ wget http://ja.wordpress.org/wordpress-4.0-ja.zip
  
> $ unzip wordpress-4.0-ja.zip
  
> $ mv -rf wordpress wp 

あとはウェブルートのwp配下からインストール作業。

以上駆け足で書いていきましたが、
  
CentOS7でファイアウォールやサービスの開始・終了など変更点ありました。
  
confファイルなどの細かな設定は使用状況に合わせて検討してください。