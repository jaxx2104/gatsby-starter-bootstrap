---
id: 1299
title: node.jsとnpmインストールとアップデート
date: 2016-03-11T00:41:12+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=1299
permalink: /node-js-install-update
image: /wp/images/2016/03/nodejs-image-processing-600x300-1.png
categories:
  - CentOS
  - JavaScript
  - node.js
---
<img src="/images/2016/03/nodejs-image-processing-600x300.png" alt="nodejs-image-processing" class="img-rounded img-responsive aligncenter size-medium wp-image-1303" />

node.js と npm インストール
```
$ sudo yum install nodejs npm -enablerepo=epel
$ sudo yum install gcc gcc-c++
```

n のインストール
```
$ sudo npm install -g n
```

n を使って node.js のアップデート
```
$ n -stable
$ sudo n -stable
$ sudo n -latest
$ sudo n latest
```

nam のアップデート
```
$ sudo npm update -g npm
$ sudo npm update -g
$ sudo npm outdated -g
```

こんな感じでサーバーでJSが動く

```
$ node
> console.log("hello world!")
hello world
```
