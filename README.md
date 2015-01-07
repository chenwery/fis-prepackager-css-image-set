# fis-prepackager-css-image-set

A FIS prepackager for css image-set

一个[fis](http://oak.baidu.com/)插件，用于移动端

### 安装：

    npm install -g fis-prepackager-css-image-set

### 配置：

在fis-config.js中加入以下配置

    fis.config.set('modules.prepackager', fis.config.get('modules.prepackager') + ',css-image-set');

### 编译：
    fisp release -Domupl