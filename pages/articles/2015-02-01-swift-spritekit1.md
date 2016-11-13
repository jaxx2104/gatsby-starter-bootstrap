---
id: 1168
title: SwiftとSpriteKitでアプリ開発1:プロジェクト作成からシミュレータ実行まで
date: 2015-02-01T15:10:50+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=1168
permalink: /swift-spritekit1
image: /wp/images/2015/01/swift-logo-hero-1.jpg
categories:
  - iOS
  - SpriteKit
  - Swift
  - Xcode
tags:
  - iOS
---
iOSの新プログラミング言語Swiftをゲームアプリを作りながら触りたいと思います。

フレームワークはSpriteKitを使います。

<img class="img-rounded img-responsive aligncenter size-large wp-image-1177" src="/images/2015/01/swift-logo-hero-1-800x450.jpg" alt="swift-logo-hero-1" srcset="/images/2015/01/swift-logo-hero-1-800x450.jpg 800w, /images/2015/01/swift-logo-hero-1-600x337.jpg 600w, /images/2015/01/swift-logo-hero-1.jpg 950w" sizes="(max-width: 800px) 100vw, 800px" />

## プロジェクトの作成

まずXcodeをAppStoreからインストールし立ち上げ、[File] -> [New] -> [Project] -> [Game] と選択します。LanguageはSwiftで、GameTechnologyはSpriteKitにします。

<!--more-->

nextを押すとプロジェクトの保存場所を聞かれます。

<img class="img-rounded img-responsive aligncenter size-full wp-image-1174" src="/images/2015/01/861597b59102c894571b612d973661ad.png" alt="スクリーンショット_2015_01_29_1_18" srcset="/images/2015/01/861597b59102c894571b612d973661ad.png 730w, /images/2015/01/861597b59102c894571b612d973661ad-600x353.png 600w" sizes="(max-width: 730px) 100vw, 730px" />

プロジェクトが出来ました。GameScene.swiftがアプリの初期画面です。コードを少しだけ見てみましょう。

<small>GameScene.swift</small>

<img src="/images/2015/02/63480dac3b503da40037d59769614a18-800x546.png" alt="スクリーンショット_2015_02_01_13_48" class="img-rounded img-responsive aligncenter size-large wp-image-1204" srcset="/images/2015/02/63480dac3b503da40037d59769614a18-800x546.png 800w, /images/2015/02/63480dac3b503da40037d59769614a18-600x410.png 600w, /images/2015/02/63480dac3b503da40037d59769614a18.png 1400w" sizes="(max-width: 800px) 100vw, 800px" />

まず、**import SpriteKit** でSpriteKitを利用しています。

クラスのGameScene の**SKScene** は1画面の役割です。

`didMoveToView`は画面が呼ばれた際に実行されるメソッド、初期状態ではSKLabelNodeで&#8221;Hello World&#8221;とセットしています。`touchesBegan`は画面がタップされた時に実行されるメソッド、タッチした座標にSKSpriteNodeで画像を表示・回転しています。`update`は画面が毎フレームごと実行されるメソッドです。

## シミュレータ実行

iOSシュミレーターでアプリ動かしてみましょう。

デバイスを「iPhone6」選択し、再生アイコンを押します。

<img src="/images/2015/02/iOS-Simulator-Screen-Shot-2015.02.01-13.47.19-337x600.png" alt="iOS Simulator Screen Shot 2015.02.01 13.47.19" class="img-rounded img-responsive aligncenter size-medium wp-image-1201" srcset="/images/2015/02/iOS-Simulator-Screen-Shot-2015.02.01-13.47.19-337x600.png 337w, /images/2015/02/iOS-Simulator-Screen-Shot-2015.02.01-13.47.19-450x800.png 450w, /images/2015/02/iOS-Simulator-Screen-Shot-2015.02.01-13.47.19.png 750w" sizes="(max-width: 337px) 100vw, 337px" />

iOSシュミレーターが起動しアプリが実行されればOKです。

次回から実際に作って行きたいと思います。
