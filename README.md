# fis-prepackager-css-image-set

A FIS prepackager for css image-set

一个[fis](http://oak.baidu.com/)插件，用于移动端，给不同的手机屏幕适配不同清晰度的背景图片，优化加载速度

### 介绍、原理

自动为css文件增加-webkit-image-set规则，并对目标图片进行缩放

### 安装

    npm install -g fis-prepackager-css-image-set

### 配置

在fis-config.js中加入以下配置

    fis.config.set('modules.prepackager', fis.config.get('modules.prepackager') + ',css-image-set');

### 编译
    fisp release -Domupl

### Thanks for

https://github.com/fouber/fis-preprocessor-image-set

https://github.com/fis-dev/fis-prepackager-css-scale