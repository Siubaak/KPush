# KPush

[![](https://img.shields.io/npm/v/kpush.svg)](https://www.npmjs.com/package/kpush)

定制个人专属的Kindle电子书推送服务

## 安装

KPush需要安装版本8.0以上的Node环境，[相关信息请戳这里](https://nodejs.org/en/download/current/)

```bash
$ npm i -g kpush
```

当然，也可以直接通过npx安装使用，具体配置看下面使用帮助

```bash
$ npx kpush -h localhost -p 8081
```

## 使用

帮助：

```bash
Usage: kpush [options]

Options:

  -V, --version          output the version number
  -c, --config <string>  set kpush custom config
  -h, --host <string>    set kpush server listening host
  -p, --port <number>    set kpush server listening port
  -s, --smtp <string>    set stmp server of pushing mail
  -u, --user <string>    set user of pushing mail
  -w, --pass <string>    set password of pushing mail
  -k, --kindle <string>  set user of kindle received mail
  -h, --help             output usage information
```

所有设置都会自动保存，再次使用时无需再进行设置

配置设置并启动:

```bash
# 可以只设置其中几项
$ kpush -h localhost -p 8081 -s smtp.163.com -u test@163.com -w test -k test@kindle.cn
```

以自定义配置启动：

```bash
# 请提供配置的绝对路径，以自定义配置启动时将忽略其他设置选项
$ kpush -c /usr/local/kpush/config.json
```

配置格式如下，字段含义见帮助：

```js
{
  "host": "localhost",
  "port": "8081",
  "smtp": "smtp.163.com",
  "user": "test@163.com",
  "pass": "test",
  "kindle": "test@kindle.cn"
}
```

启动后，浏览器访问KPush服务器监听端口即可使用，推荐移动端进行访问

## mobi源更换

这里默认用了[KindleShare电子书搜索引擎](https://sk.kindleshare.cn)作为mobi电子书源，感谢一下。若更换其他mobi源，请自行fork以后重写`app/models/index.js`中getList方法，约定见注释