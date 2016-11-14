---
id: 1402
title: Raspberry Pi と irMagician を使って家をスマートホーム化する
date: 2016-07-20T09:02:29+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=1402
path: /homekit-irmagician
image: /wp/images/2016/07/e434d04ea420ba5f36d8a21409577ea2.gif
categories:
  - iOS
  - JavaScript
  - Linux
  - node.js
tags:
  - Mac
---
<img src="/images/2016/07/e434d04ea420ba5f36d8a21409577ea2.gif" alt="7月-19-2016 00-20-37" class="img-rounded img-responsive alignnone size-medium" />

暑い季節になってきました。夏の自由研究ということで電子工作とIoTに挑戦したいと思います。

エアコンをリモートコントロール出来たら快適だなぁと思ったので、家をスマートホーム化してみました。

## HomeKit と Homebridge

まずどうやってスマートホーム化するか。

iOSのHomekitというものを使えばiPhoneからHomekit対応した家電を操作することができます。

今後iOS10でHomeアプリも出て対応製品も出てくるはず、でも現在日本ではこれを扱った製品はあまり多くありません。

で既存製品でも対応できるようHomebridgeというnode.jsのライブラリが公開されています。

> nfarina/homebridge
> <https://github.com/nfarina/homebridge>

今回はこの Homebridge を使って開発しようと思います。

<!--more-->

## Raspberry Pi と irMagcian

<img src="/images/2016/07/IMG_4711-600x450.jpg" alt="IMG_4711" class="img-rounded img-responsive alignnone size-medium wp-image-1406" srcset="/images/2016/07/IMG_4711-600x450.jpg 600w, /images/2016/07/IMG_4711-768x576.jpg 768w, /images/2016/07/IMG_4711-800x600.jpg 800w" sizes="(max-width: 600px) 100vw, 600px" />

<small>左がirMagcian 右がRaspberry Pi３のモデルB</small>

いつでも家電を操作できるよう homebridge を常に起動しておきたいので、サーバーを用意する必要があります。なので以前から気になっていた Raspberry Pi を買いました。4000円で安くてびっくり。

> Raspberry Pi
> <https://www.raspberrypi.org/>

あわせてエアコンや照明を操作するため赤外線モジュールの irMagcian を買いました。これも4000円。

> irMagcian
> <http://www.omiya-giken.com/?page_id=837>

<img src="/images/2016/07/IMG_4716-600x450.jpg" alt="IMG_4716" class="img-rounded img-responsive alignnone size-medium wp-image-1438" srcset="/images/2016/07/IMG_4716-600x450.jpg 600w, /images/2016/07/IMG_4716-768x576.jpg 768w, /images/2016/07/IMG_4716-800x600.jpg 800w" sizes="(max-width: 600px) 100vw, 600px" />

<small>ケースに入れてUSBで接続</small>

## Raspberry Pi の設定をする

Raspberry Pi はスマートホーム用サーバーにする予定なので、家の中心に設置しました。

あとは以下の手順で設定しました。

  * Raspberry Pi の公式サイトで 「NOOBS」 をダウンロード
  * マイクロSDにフォーマットして 「NOOBS」 を書き込む
  * Raspberry Pi にマイクロSDとマウス、キーボード、HDMIを接続する
  * microUSBケーブルをつなぎ電源を入れる

<img src="/images/2016/07/IMG_4717-600x450.jpg" alt="IMG_4717" class="img-rounded img-responsive alignnone size-medium wp-image-1439" srcset="/images/2016/07/IMG_4717-600x450.jpg 600w, /images/2016/07/IMG_4717-768x576.jpg 768w, /images/2016/07/IMG_4717-800x600.jpg 800w" sizes="(max-width: 600px) 100vw, 600px" />

<small>起動時</small>

OS「RASPBIAN」インストール後、言語やLANなど設定します。
その後コンソールから`sudo apt-get update`と`sudo apt-get upgrade`してアップデート
`apt-get install fonts-ipaexfont`で日本語フォントのインストール
ローカルIP固定とポート開放して認証鍵でMacからsshで接続できるようにします

<img src="/images/2016/07/IMG_4718-600x450.jpg" alt="IMG_4718" class="img-rounded img-responsive alignnone size-medium wp-image-1440" srcset="/images/2016/07/IMG_4718-600x450.jpg 600w, /images/2016/07/IMG_4718-768x576.jpg 768w, /images/2016/07/IMG_4718-800x600.jpg 800w" sizes="(max-width: 600px) 100vw, 600px" />

<small>デスクトップ画面</small>

## irMagcian の設定をする

以下のURLで紹介されている irm.py を利用しました。

> 小型赤外線（IR）リモコン irMagician ファースト・インプレッション
> <http://netbuffalo.doorblog.jp/archives/4872290.html>

```
# sudo apt-get install python-pip
# sudo pip install pyserial
```

以下のコマンドでエアコン、ライト、テレビなどのリモコンを学習させます。

これでコマンドさえ叩けば家電を操作できるようになりました。

```
// エアコンの赤外線をirMagcianにキャプチャします。
$ python irm.py -c

// キャプチャしたデータをファイルとして保存します。
$ python irm.py -s -f ./data/fan/on.json

// 保存したデータを実行します。エアコンがつきます。
$ python irm.py -p -f ./data/fan/on.json
```

## Homebridge の設定をする

以下のURLにならって Homebridge をインストールし、デーモン化します。

> Running HomeBridge on a Raspberry Pi
> <https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi>

Homebridge を使ってコマンドを叩けるようにプラグインをインストール。

```
$ sudo npm install -g homebridge-cmd
```

`.homebridge/config.json` の設定ファイルを編集します。

```
{
    "bridge": {
        "name": "Homebridge",
        "username": "CC:22:3D:E3:CE:30",
        "port": 51826,
        "pin": "031-45-154"
    },
    "description": "test",
    "accessories": [
        {
            "accessory": "CMD",
            "name": "テレビ",
            "on_cmd": "sudo python irm.py -p -f ~/.homebridge/data/tv/on.json",
            "off_cmd": "sudo python irm.py -p -f ~/.homebridge/data/tv/off.json"
        },
        {
            "accessory": "CMD",
            "name": "ライト",
            "on_cmd": "sudo python irm.py -p -f ~/.homebridge/data/light/on.json",
            "off_cmd": "sudo python irm.py -p -f ~/.homebridge/data/light/off.json"
        },
        {
            "accessory": "CMD",
            "name": "寝室のエアコン",
            "on_cmd": "sudo python irm.py -p -f ~/.homebridge/data/fan/on.json",
            "off_cmd": "sudo python irm.py -p -f ~/.homebridge/data/fan/off.json"
        },
        {
            "accessory": "CMD",
            "name": "リビングのエアコン",
            "on_cmd": "sudo python irm.py -p -f ~/.homebridge/data/fan2/on.json",
            "off_cmd": "sudo python irm.py -p -f ~/.homebridge/data/fan2/off.json"
        }
    ]
}
```

`sudo service homebridge restart` で設定ファイルを反映します。

## iPhoneから使ってみる

HomeKit対応アプリから設定します。Insteonとういうアプリが有名みたいですが、自分はiOS10ベータにアップデートしてHomeアプリを使っています。
SiriもしくはHomeアプリから登録した家電のコントロールが出来るようになりました。

またAppleTVかiPadを持ってる人は外からのコントロールやオートメーション機能が使えます。
オートメーション機能では、時間や場所を起点として家電のオンオフを自動化できます。以下のようなことが出来ます。

  * 家から離れた時にエアコンとライトをオフ
  * 家から近づいた時にライトをオン
  * AM2:00にエアコンをオフ

以上でスマートホームの完成です。
今後やりたいことはこいつをBOT化してSlackからコントロールできるようにしたり、Arduinoも買ったので連携させたりしたいです。
