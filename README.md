# KPush

[![](https://img.shields.io/npm/v/kpush.svg)](https://www.npmjs.com/package/kpush)

定制个人专属的Kindle电子书推送服务

## 安装

首先需要安装Node.js环境，且版本大于8，[相关信息请戳这里](https://nodejs.org/en/download/current/)

### npm源

```bash
# 全局安装
$ npm i -g kpush
```

## 使用

帮助：

```bash
Usage: kpush [options]

Options:

  -V, --version          output the version number
  -c, --config <string>  set kpush custom config
  -p, --port <number>    set kpush server listening port
  -s, --smtp <string>    set stmp server of pushing mail
  -u, --user <string>    set user of pushing mail
  -w, --pass <string>    set password of pushing mail
  -k, --kindle <string>  set user of kindle received mail
  -h, --help             output usage information
```

所有设置都会自动保存，再次使用时无需再进行设置

运行：

```bash
$ kpush
```

配置设置并运行:

```bash
# 可以只设置其中几项
$ kpush -p 7001 -s smtp.163.com -u test@163.com -w test -k test@kindle.cn
```

以自定义配置运行：

```bash
# 请提供配置的绝对路径，以自定义配置运行时将忽略其他设置选项
$ kpush -c /usr/local/kpush/config.json
```

配置格式如下，字段含义见帮助：

```js
{
  "port": "7001",
  "smtp": "smtp.163.com",
  "user": "test@163.com",
  "pass": "test",
  "kindle": "test@kindle.cn"
}
```

运行后，浏览器访问KPush服务器监听端口即可使用，推荐移动端进行访问

## mobi源更换

这里默认用了[走读派](http://www.zoudupai.com/)作为mobi电子书源，感谢一下。若更换其他mobi源，请自行开发，仅需要实现model.js中getList和getUrl方法即可，约定如下：

```js
// KPush自带依赖，用于发送请求以及解析页面
const request = require('superagent')
const cheerio = require('cheerio')
// 导出model对象
module.exports = {
  /**
    * 获取mobi电子书搜索列表
    * 
    * @param {string} q - 查询关键词
    * @return {array} - 返回list数组
    * 
    * list数组元素为mobi对象，包含3个字段，均为string
    * mobi.id - mobi电子书唯一索引，用于查询源下载链接
    * mobi.img - mobi电子书封面图链接
    * mobi.ctx - mobi电子书简介
    */
  async getList (q) {
    let list = []
    list.push({
      id: '123',
      img: 'http://test.com/test1.jpg',
      ctx: '简介'
    })
    return list
  },
  /**
    * 获取mobi电子书下载链接
    * 
    * @param {string} i - mobi电子书索引
    * @return {string} - 返回源中mobi电子书下载链接
    */
  async getUrl (i) {
    let url = 'http://test.com/download/123'
    return url
  }
}
```