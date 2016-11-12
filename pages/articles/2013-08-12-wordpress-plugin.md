---
id: 561
title: WordPressのウィジェットプラグインを自作する
date: 2013-08-12T23:34:37+00:00
author: jaxx2104
layout: post
guid: http://jaxx2104.info/?p=561
permalink: /wordpress-plugin
dsq_thread_id:
  - "1600636335"
categories:
  - PHP
  - Wordpress
tags:
  - PHP
  - Twitter API
  - WordPress
  - ウィジェット
  - 自作
---
右カラムのつぶやきを1件表示するプラグインを作った時のメモ

このままだと[外観]->[ウィジェット]の欄に「Get Twitter」が追加され、
  
サイト上に「サンプルです」と表示されるので、この部分を置き換える。

```
/wp/wp-contents/plugin/test/test.php
```

<!--more-->

```
&lt;?php
/*
Plugin Name: Get Twitter
Plugin URI: http://jaxx2104.info
Description: Twitterを表示するプラグイン
Author: jaxx2104
Version: 0.1
Author URI: http://www.jaxx2104.info
 */

class GetTwitter_Widget extends WP_Widget {
  //1.[外観]-&gt;[ウィジェット] での表示
  public function __construct() {
    parent::__construct(
      'getTwitter_widget', // Base ID
      'Get Twitter', // Name
      array( 'description' =&gt; __('TwitterAPIを使って、つぶやきを表示するプラグイン', 'text_domain'), ) //desc
    );
  }

  //2.サイト上での表示
  public function widget($args, $instance) {
    extract($args);
    $title = apply_filters('widget_title', $instance['title']);
    echo $before_widget;
    if (!empty($title))
    echo $before_title . $title . $after_title;
    echo 'サンプルです'; //ウィジェット本体
    echo $after_widget;
  }

  //3.フォーム(4)の情報をサイト(2)へ渡す
  public function update( $new_instance, $old_instance ) {
    $instance = $old_instance;
    $instance['title'] = strip_tags($new_instance['title']);
    return $instance;
  }

  //4.[外観]-&gt;[ウィジェット] でのフォーム
  public function form( $instance ) {
    if ( $instance ) {
      $title = esc_attr($instance['title']);
    }
    else {
      $title = __('New title', 'text_domain');
    }
    echo sprintf('&lt;p&gt;&lt;label for="%s"&gt;%s&lt;/label&gt;&lt;input class="widefat" id="%s" name="%s" type="text" value="%s" /&gt;&lt;/p&gt;',$this-&gt;get_field_id('title'),_e('Title:'),$this-&gt;get_field_id('title'),$this-&gt;get_field_name('title'),$title);
  }
}

add_action('widgets_init',
           create_function('', 'register_widget("GetTwitter_widget");')
           );

?&gt;
```

プラグイン作るの楽しいぞ！