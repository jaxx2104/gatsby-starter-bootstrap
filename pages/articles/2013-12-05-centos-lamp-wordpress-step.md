---
id: 798
title: CentOSにLAMP環境構築からWordPressインストールまでの手順
date: 2013-12-05T00:56:38+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=798
path: /centos-lamp-wordpress-step
dsq_thread_id:
  - "2024174432"
categories:
  - CentOS
  - Linux
tags:
  - apache
  - CentOS
  - Emacs
  - Mac
  - PHP
  - WordPress
---
LAMP環境構築を数カ月ぶりにやったらいろいろと変更している部分があったので更新。

WordPressのインストールは実際の作業ではやっていないので少し省いてます。

## CentOS バージョン確認

サーバーにCentOSをインストールしたらバージョンを確認します。

> $ rpm -qa | grep centos-release

## yum アップデート

> $ yum -y update

## 開発ツール一式

必要最小限の構成の場合はひとつひとつ入れますが今回は一気にインストールします。CentOS6の場合「開発ツール」の後ろ全角スペースが必要でした注意してください。

<!--more-->

```
$ yum -y groupinstall “開発ツール　”
$ yum groupinfo “開発ツール　”
```

## emacs,get,tree 追加

テキストエディタはemacsを使用しているで、この段階で必要なものをインストールします。

```
$ yum -y install emacs
$ yum -y install get
$ yum -y install tree
```

## SELINUX 確認・無効

SELINUXは無効にします。SELINUXとは、なぜ無効にするかは調べて下さい。

```
$ getenforce
$ setenforce 0
$ emacs /etc/sysconfig/selinux
```

```
SELINUX=disabled
```

## 日本語環境

日本語環境にしますが、個人の気分だと思います

```
$ emacs /etc/sysconfig/i18n
```

```
LANG="ja_JP.UTF-8"
SYSFONT="latarcyrheb-sun16"
```

## NTP

NTPを使ってサーバーの時刻合わせを行います。

```
$ yum -y install ntp
$ emacs /etc/ntp.conf
```

```
restrict 192.168.1.0 mask 255.255.255.0 nomodify notrap
server ntp.nict.jp
server ntp.jst.mfeed.ad.jp
```

サービスの開始・自動起動

```
$ /etc/rc.d/init.d/ntpd start
$ chkconfig ntpd on
$ ntpq -p
```

## ユーザーの作成

```
$ useradd ユーザー名
$ passwd ユーザー名
```

ポート番号設定とrootでのログインを禁止

```
$ emacs /etc/ssh/sshd_config
```

```
Port XXX.XXX.XXX.XXX;
PermitRootLogin No;
```

## iptables

SH、HTTP、HTTPS、POP3、SMTP、サブミッションポートのみ通す。sshのポート番号は先ほど指定したもの

```
$ emacs /etc/sysconfig/iptables
```

```
*filter
:INPUT ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT ACCEPT [0:0]
:RH-Firewall-1-INPUT - [0:0]
-A INPUT -j RH-Firewall-1-INPUT
-A FORWARD -j RH-Firewall-1-INPUT
-A RH-Firewall-1-INPUT -i lo -j ACCEPT
-A RH-Firewall-1-INPUT -p icmp --icmp-type any -j ACCEPT
-A RH-Firewall-1-INPUT -p 50 -j ACCEPT
-A RH-Firewall-1-INPUT -p 51 -j ACCEPT
-A RH-Firewall-1-INPUT -p udp --dport 5353 -d 224.0.0.251 -j ACCEPT
-A RH-Firewall-1-INPUT -p udp -m udp --dport 631 -j ACCEPT
-A RH-Firewall-1-INPUT -p tcp -m tcp --dport 631 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport XXXX -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 80 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 20 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 21 -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 3306 -j ACCEPT
-A RH-Firewall-1-INPUT -j REJECT --reject-with icmp-host-prohibited
COMMIT
```

再起動して有効化
```
$ /etc/rc.d/init.d/iptables restart
```

## 不要なサービスの停止(ip6tables)

```
$ /etc/rc.d/init.d/ip6tables stop
$ chkconfig ip6tables off
```

## yum リポジトリ追加

yum リポジトリダウンロード

```
$ wget http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm

（無い場合：http://dl.fedoraproject.org/pub/epel/6/x86_64/ からepal検索）

$ wget http://rpms.famillecollet.com/enterprise/remi-release-6.rpm

（無い場合：http://rpms.famillecollet.com/ から検索）

$ wget http://pkgs.repoforge.org/rpmforge-release/rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm

（無い場合：http://dag.wieers.com/rpm/packages/rpmforge-release/から検索）
```

yum リポジトリ追加
```
$ rpm -Uvh epel-release-6-8.noarch.rpm remi-release-6.rpm rpmforge-release-0.5.3-1.el6.rf.x86_64.rpm
```

追加したリポジトリを明示的に指定した時のみ使用

```
$ emacs /etc/yum.repos.d/epel.repo
$ emacs /etc/yum.repos.d/rpmforge.repo
```

```
enabled=0
```

## LAMP環境構築

この一行で一式をインストールするので不要なものは削って下さい。
```
$ yum -y -enablerepo=remi,epel,rpmforge install httpd-devel php-cli php-fpm php-devel php-gd php-mbstring php-mysql php-pdo php-pear php mysql-server phpMyAdmin vsftpd
```

## Appache
```
$ emacs /etc/httpd/conf/httpd.conf
```
```
HTTPレスポンスヘッダのServerヘッダの情報を最小限にする
#ServerTokens OS
ServerTokens Prod

エラーページに表示されるメールアドレスを設定。エラーがあった際はここに設定したメールアドレスに通知がいく
#ServerAdmin root@localhost
ServerAdmin webmaster@linuxserver.jp

サーバーの名前を設定
#ServerName www.example.com:80
ServerName XX.XX.XX.XX:80

DocumentRootを設定
DocumentRoot /var/www/html

Indexes ファイルが指定されていない時にファイル一覧表示
FollowSymLinks シンボリックリンクの許可
Includes SSIを有効にする
ExecCGI CGIの実行を許可
#Options Indexes FollowSymLinks
Options ExecCGI FollowSymLinks Includes

ディレクトリごとに「.htaccess」を使用できるようにする。
#AllowOverride None
AllowOverride ALL
Order allow,deny
Allow from all

.html・.php・.cgiの内のいずれかがディレクトリ内にある場合、先に記述したファイル名から順に検索され表示される。
#DirectoryIndex index.html index.html.var
DirectoryIndex index.html index.php index.cgi

エラーページ等でApacheのバージョンを表示しないようにする
#ServerSignature On
ServerSignature Off

デフォルトで文字コードを指定しないようにする
AddDefaultCharset UTF-8
#AddDefaultCharset UTF-8
```

ドキュメントルートの所有者を変更
```
$ chown user:group /var/www/html/
```
サービス開始
```
$ /sbin/chkconfig httpd on
$ /etc/rc.d/init.d/httpd start
$ /sbin/chkconfig -list httpd
```
## sftp
```
$ emacs /etc/vsftpd/vsftpd.conf
```
編集

```
anonymous_enable=NO
ascii_upload_enable=YES
```

追加

```
ascii_download_enable=YES
text_userdb_names=YES
use_localtime=YES
```

サービスの開始・自動起動
```
$ /etc/rc.d/init.d/vsftpd start
$ chkconfig vsftpd on
```
## MySQL
```
$ emacs /etc/my.cnf
```
追加

```
[mysqld]
datadir=/var/lib/mysql
socket=/var/lib/mysql/mysql.sock
user=mysql
# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0
default-character-set = utf8
skip-character-set-client-handshake
character-set-server = utf8
collation-server = utf8_general_ci
init-connect = SET NAMES utf8
[client]
default-character-set = utf8
[mysqldump]
default-character-set = utf8
[mysql]
default-character-set = utf8
[mysqld_safe]
log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid
```

サービス開始
```
$ /etc/rc.d/init.d/mysqld start
$ mysql\_install\_db
$ chkconfig mysqld on
$ mysql\_secure\_installation
```

以下の質問に答える

```
既存password（デフォルトは空）
新規password
yes
```

## php
```
$ emacs /etc/php.ini
```
```
mbstring.language = Japanese
```

## phpmyadmin

BASIC認証の場合
```
$ emacs /etc/httpd/conf.d/phpMyAdmin.conf
```
```
<Directory "/usr/share/phpmyadmin">
  Options FollowSymLinks
  AllowOverride All
  Order Deny,Allow
  Deny from all
  Allow from 127.0.0.1
  Allow from 192.168.11.
</Directory>
```

確認
```
$ /etc/rc.d/init.d/httpd restart
```
basic認証のパスワードはMySQLのrootパスワード

## WordPress

WordPress用MySQLユーザの作成

```
$ mysql -uroot -p
$ create database データベース名
grant create,select,insert,update,delete on (作成したDB名).* to 'ユーザ名'@&#8217;ホスト名' identified by 'パスワード'
flush privileges;
```

以上でLAMP環境構築からWordPressインストールまで完了です。

だいぶ省いている箇所もあるので参考程度にと思っています。

confファイルなどの細かな設定は使用状況に合わせて検討してください。
