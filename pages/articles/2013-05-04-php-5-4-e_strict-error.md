---
id: 319
title: PHPを5.4にしたらE_STRICTエラーで困った。
date: 2013-05-04T17:08:05+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/wp/?p=319
permalink: /php-5-4-e_strict-error
dsq_thread_id:
  - "1260311375"
image: /wp/images/2013/09/phplogo-500x326.png
categories:
  - PHP
tags:
  - "5.4"
  - E_STRICT
  - PHP
---
PHPを5.3から5.4にしました。随分と動作が速くなってて満足。

ただPEARのXML-RPC2を動かしたときにE_STRICTエラーが出てくるので調べた。

<img src="/images/2013/05/phplogo-500x326.jpg" alt="phplogo" class="img-rounded alignnone size-large wp-image-391" />

## わかったこと

PHP5.4からはエラーレベルE\_STRICTがE\_ALLに含まれている。

以下その詳細と修正内容

<!--more-->

<table class="doctable table" id="errorfunc.constants.errorlevels">
  <caption><strong>エラーとロギング</strong></caption> <tr>
    <th>
      値
    </th>

    <th>
      定数
    </th>

    <th>
      説明
    </th>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-error">
    <td>
      1
    </td>

    <td>
      <strong><code>E_ERROR</code></strong>
    </td>

    <td>
      重大な実行時エラー。これは、メモリ確保に関する問題のように復帰できないエラーを示します。<br /> スクリプトの実行は中断されます。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-warning">
    <td>
      2
    </td>

    <td>
      <strong><code>E_WARNING</code></strong>
    </td>

    <td>
      実行時の警告 (致命的なエラーではない)。<br /> スクリプトの実行は中断されません。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-parse">
    <td>
      4
    </td>

    <td>
      <strong><code>E_PARSE</code></strong>
    </td>

    <td>
      コンパイル時のパースエラー。パースエラーはパーサでのみ生成されます。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-notice">
    <td>
      8
    </td>

    <td>
      <strong><code>E_NOTICE</code></strong>
    </td>

    <td>
      実行時の警告。エラーを発しうる状況に遭遇したことを示す。<br /> ただし通常のスクリプト実行の場合にもこの警告を発することがありうる。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-core-error">
    <td>
      16
    </td>

    <td>
      <strong><code>E_CORE_ERROR</code></strong>
    </td>

    <td>
      PHPの初期始動時点での致命的なエラー。<br /> <strong><code>E_ERROR</code></strong>に似ているがPHPのコアによって発行される点が違う。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-core-warning">
    <td>
      32
    </td>

    <td>
      <strong><code>E_CORE_WARNING</code></strong>
    </td>

    <td>
      （致命的ではない）警告。PHPの初期始動時に発生する。<br /> <strong><code>E_WARNING</code></strong>に似ているがPHPのコアによって発行される点が違う。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-compile-error">
    <td>
      64
    </td>

    <td>
      <strong><code>E_COMPILE_ERROR</code></strong>
    </td>

    <td>
      コンパイル時の致命的なエラー。<br /> <strong><code>E_ERROR</code></strong>に似ているがZendスクリプティングエンジンによって発行される点が違う。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-compile-warning">
    <td>
      128
    </td>

    <td>
      <strong><code>E_COMPILE_WARNING</code></strong>
    </td>

    <td>
      コンパイル時の警告（致命的ではない）。<br /> <strong><code>E_WARNING</code></strong>に似ているがZendスクリプティングエンジンによって発行される点が違う。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-user-error">
    <td>
      256
    </td>

    <td>
      <strong><code>E_USER_ERROR</code></strong>
    </td>

    <td>
      ユーザーによって発行されるエラーメッセージ。<br /> <strong><code>E_ERROR</code></strong>に似ているがPHPコード上で <span class="function">trigger_error()</span>関数を使用した場合に発行される点が違う。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-user-warning">
    <td>
      512
    </td>

    <td>
      <strong><code>E_USER_WARNING</code></strong>
    </td>

    <td>
      ユーザーによって発行される警告メッセージ。<br /> <strong><code>E_WARNING</code></strong>に似ているがPHPコード上で <span class="function">trigger_error()</span>関数を使用した場合に発行される点が違う。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-user-notice">
    <td>
      1024
    </td>

    <td>
      <strong><code>E_USER_NOTICE</code></strong>
    </td>

    <td>
      ユーザーによって発行される注意メッセージ。<br /> <strong><code>E_NOTICE</code></strong>にに似ているがPHPコード上で <span class="function">trigger_error()</span>関数を使用した場合に発行される点が違う。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-strict">
    <td>
      2048
    </td>

    <td>
      <strong><code>E_STRICT</code></strong>
    </td>

    <td>
      コードの相互運用性や互換性を維持するために PHP がコードの変更を提案する。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-recoverable-error">
    <td>
      4096
    </td>

    <td>
      <strong><code>E_RECOVERABLE_ERROR</code></strong>
    </td>

    <td>
      キャッチできる致命的なエラー。危険なエラーが発生したが、エンジンが不安定な状態になるほどではないことを表す。<br /> ユーザー定義のハンドラでエラーがキャッチされなかった場合( <span class="function">set_error_handler()</span> も参照ください) は、<strong><code>E_ERROR</code></strong> として異常終了する。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-deprecated-error">
    <td>
      8192
    </td>

    <td>
      <strong><code>E_DEPRECATED</code></strong>
    </td>

    <td>
      実行時の注意。これを有効にすると、将来のバージョンで動作しなくなるコードについての警告を受け取ることができる。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-user-deprecated">
    <td>
      16384
    </td>

    <td>
      <strong><code>E_USER_DEPRECATED</code></strong>
    </td>

    <td>
      ユーザー定義の警告メッセージ。<br /> これは<strong><code>E_DEPRECATED</code></strong> と同等だが、PHP のコード上で関数 <span class="function">trigger_error()</span>によって作成されるという点が異なる。
    </td>
  </tr>

  <tr id="errorfunc.constants.errorlevels.e-all">
    <td>
      32767
    </td>

    <td>
      <strong><code>E_ALL</code></strong>
    </td>

    <td>
      サポートされる全てのエラーと警告。<br /> <span style="color: #ff0000;">PHP 5.4.0 より前のバージョンでは、<strong><code>E_STRICT</code></strong> レベルのエラーは除く。</span>
    </td>
  </tr>
</table>

PHP5.4のerror_reportingはこんな感じ。

E\_DEPRECATEDやE\_STRICTといったエラーはPHP5から追加され、この2つは5.3までE-ALLに含まれなかったのですが、5.4からはE-ALLに全てのエラーが含まれるようになったそうです。

## じゃあどうするか、修正でしょ！

php.iniのerror_reportingの部分の定義を5.3と同じになるよう修正します。

```
# 修正前
# error_reporting = E_ALL
#
# 修正後
error_reporting = E_ALL ^ E_STRICT
```

これでE_STRICTを除く全てのエラーを表示することができます。
