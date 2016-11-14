---
id: 286
title: さくらレンタルサーバーからVPSに移行しました。
date: 2013-04-29T01:42:08+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=286
path: /sakura-vps
dsq_thread_id:
  - "1255348091"
image: /wp/images/2013/09/vps-01-011-500x312.png
categories:
  - Apache
  - CentOS
  - Linux
  - MySQL
  - PHP
tags:
  - apache
  - CentOS
  - Emacs
  - Mac
  - PHP
  - VPS
  - WordPress
  - さくら
---
ゴールデンウィークの前半3日は天気もよくて楽しかった。

今回勉強も兼ねて、さくらレンタルサーバーからVPSにサイトを全て移行しました。

初期設定からLAMP環境構築までやり、Wordpressはそのまま移行しました。

<img src="/images/2013/04/vps-01-011-500x312.jpg" alt="vps-01-01" class="img-rounded alignnone size-large wp-image-312" />

なのでその時のメモ。

<!--more-->


## 初期設定

ssh接続

```
$ ssh root@***.***.***.*** -p ポート番号
```

rootのパスワードを変更

```
# passwd
```

SELinux無効化

```
# setenforce 0
# getenforce
# emacs /etc/sysconfig/selinux
```

```
SELINUX=enforcing
↓
SELINUX=disabled
```

emacsインストール

```
# yum install emacs
```

日本語環境

```
# emacs /etc/sysconfig/i18n
```

```
LANG="ja_JP.UTF-8"
SYSFONT="latarcyrheb-sun16"
```

NTP設定

```
# yum -y install ntp
# emacs /etc/ntp.conf
```

```
restrict 192.168.1.0 mask 255.255.255.0 nomodify notarp

server ntp.nict.jp
server ntp.jst.mfeed.ad.jp
```

```
# /etc/rc.d/init.d/ntpd start
# chkconfig ntpd on
# ntpq -p
```

ユーザーの作成

```
# useradd ユーザー名
# passwd ユーザー名
# exit
```

一般ユーザーでログイン後root権限に昇格

```
# su -
```

```
$ emacs /etc/ssh/sshd_config
```

```
ポート番号を設定
Port XXXX;

rootでのログインを禁止
PermitRootLogin No;
```

```
# /etc/init.d/sshd restart
```

iptables

SH、HTTP、HTTPS、POP3、SMTP、サブミッションポートのみ通す。sshのポート番号は先ほど指定したもの

```
# emacs /etc/sysconfig/iptables
```

```
*filter
:INPUT   ACCEPT [0:0]
:FORWARD ACCEPT [0:0]
:OUTPUT  ACCEPT [0:0]
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
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 80    -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 20    -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 21    -j ACCEPT
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 3306  -j ACCEPT

-A RH-Firewall-1-INPUT -j REJECT --reject-with icmp-host-prohibited

COMMIT
```

```
/etc/rc.d/init.d/iptables restart
```

不要なサービスの停止

ip6tables

```
# /etc/rc.d/init.d/ip6tables stop
# chkconfig ip6tables off
```

パッケージのアップデート

```
# yum update
```

SFTPの設定

```
# yum -y install vsftpd

# emacs /etc/vsftpd/vsftpd.conf
```

```
# 以下を編集
anonymous_enable=NO
ascii_upload_enable=YES
ascii_download_enable=YES

# 以下を追加
text_userdb_names=YES
use_localtime=YES
```

```
# /etc/rc.d/init.d/vsftpd start
# chkconfig vsftpd on
```

## Apache

```
# yum -y install httpd

# emacs /etc/httpd/conf/httpd.conf
```

```
HTTPレスポンスヘッダのServerヘッダの情報を最小限にする
＃ServerTokens OS
ServerTokens Prod

エラーページに表示されるメールアドレスを設定。エラーがあった際はここに設定したメールアドレスに通知がいく
#ServerAdmin root@localhost
ServerAdmin webmaster@linuxserver.jp

サーバーの名前を設定
#ServerName www.example.com:80
ServerName XX.XX.XX.XX:80

DocumentRootを設定
DocumentRoot /var/www/html


Indexes         ファイルが指定されていない時にファイル一覧表示
FollowSymLinks  シンボリックリンクの許可
Includes        SSIを有効にする
ExecCGI         CGIの実行を許可

#Options Indexes FollowSymLinks
Options ExecCGI FollowSymLinks Includes


ディレクトリごとに「.htaccess」を使用できるようにする。
#AllowOverride None
AllowOverride ALL

Order allow,deny
Allow from all


.html・.php・.cgiの内のいづれかがディレクトリ内にある場合、先に記述したファイル名から順に検索され表示される。
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
chown user:group /var/www/html/
```

```
$ /sbin/chkconfig httpd on
# /etc/rc.d/init.d/httpd start
$ /sbin/chkconfig --list httpd
httpd 0:off 1:off 2:on 3:on 4:on 5:on 6:off
```

## MySQLインストール

```
# yum -y install mysql-server

# emacs /etc/my.cnf
```

```
以下を追記
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

MySQLの起動

```
# /etc/rc.d/init.d/mysqld start
# chkconfig mysqld on
# mysql_secure_installation

既存のパス（デフォルトは空）
新しいパス
あとはすべてYES
```

## PHP

```
# yum -y install php
# yum -y install php-mysql php-gd php-mbstring php-imap php-xml php-xmlrpc
# yum -y install php-pear php-ecrypt
# pear list
# pear upgrade PEAR
```

```
# emacs /etc/php.ini
```

```
mbstring.language = Japanese
```

Apache再起動

```
# /etc/rc.d/init.d/httpd restart
```

## phpmyadmin

```
# yum -y install phpmyadmin

# emacs /etc/httpd/conf.d/phpMyAdmin.conf
```

```
<Directory /usr/share/phpMyAdmin/>
#   <IfModule mod_authz_core.c>
     # Apache 2.4
#     <RequireAny>
#       Require ip 127.0.0.1
#       Require ip ::1
#     </RequireAny>
#   </IfModule>
#   <IfModule !mod_authz_core.c>
     # Apache 2.2
#     Order Deny,Allow
#     Deny from All
#     Allow from 127.0.0.1
#     Allow from ::1
#   </IfModule>
</Directory>
```

Apache再起動

```
# /etc/rc.d/init.d/httpd restart
```

basic認証のパスワードはMySQLのrootパスワード

## WordPress

WordPress用MySQLユーザの作成

```
# mysql -uroot -p

# create database データベース名

grant create,select,insert,update,delete on (作成したDB名).* to 'ユーザ名'@'ホスト名' identified by 'パスワード'

flush privileges;
```

とこんな感じで移行完了。

もうちょっと調整しないといけないと思ってます。

## ー テスト ー

http://jaxx2104.info/wp/
