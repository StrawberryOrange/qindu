# test

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


# qindu--轻量级移动端读书app
## 概述

利用vue+cubeui+axios，配合后端服务构建出网页版读书应用，独立个人开发，所以代码略有简陋。因为是初学vue，项目中有许多不完美之处，还请见谅。

项目地址：
https://github.com/StrawberryOrange/qindu

## 后端简介

服务采用flask部署，服务器已关闭，详细接口可参考namespace，或者手动编辑数据来运行

## 项目已实现功能

* 从云端加载书籍

* 注册登录退出的账号系统，将云端书库保存在数据库中

* 选择、切换书籍进行查看

* 设置阅读背景，字号等功能


## 桌面及移动端测试

* 桌面测试： `npm run dev` 后，打开***开发者工具*** `F12`，模拟手机预览 `Ctrl+Shift+M` (Chrome)
* 移动端测试： `npm run build` 后，把打包文件放在服务器，通过服务器进行访问。也可以将域名指向服务器，通过域名访问，美观方便。


## 感谢

感谢您的来访 ，如果对于您有帮助 ，麻烦您使劲的给个Star吧 ！ 并且欢迎讨论 ^_^


## 其他说明

* 由于是抱着边写边学的心态，所以可能会出现些不严谨的地方，或者明显的错误，关于这点，看到请反馈给我或者发issue，十分感谢。

* 从零到目前的进度，虽然功能简单，但还是花费了不少时间，把项目上传是希望能够对一些同样正在学习Vue的小伙伴有一些帮助。

* 由于是第一次独立的写较为完整的Vue项目，所以希望大家给个Star! ^_^。

***

## 技术栈

*  vue-cli
*  vue2
*  vue-router
*  vuex
*  axios
*  webpack2
*  cube-ui
*  flask
*  pyMySQL



## Build Setup

#### 轻读app，后期应该不会有更新完善计划。

``` bash
# 安装
npm install

# 运行
npm run dev

# 打包
npm run build
