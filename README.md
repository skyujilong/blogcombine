blogcombine
===========

# 应用
## 启动项目
```node
    node index.js
```
## 注意事项
1. 下载项目到blog-pc根目录下
2. 端口占用为8080 修改端口在index.js中

## blog-pc的入口文件配置
```javascript
//pc 代理配置
var local = '/Users/jilong5/workspace/blog-pc';
var localServer = 'http://127.0.0.1:8080';
module.exports = [
  {
    pattern:/http:\/\/simg\.sinajs\.cn\/blog7style\/css\/([^\?]+)/,
    responder:local + '/style/dev/css/$1'
  },
  {
    pattern:/http:\/\/simg\.sinajs\.cn\/blog7style\/images\/([^\?]+)/,
    responder:local + '/style/dev/images/$1'
  },
  {
    pattern:/http:\/\/s(img\|js)\.sinajs\.cn\/blog7icp\/([^\.]+)\.js(.*)/,
    responder:localServer + '?product=icp/dev&pageid=$2'
  },
  {
    pattern:/http:\/\/sjs\.sinajs\.cn\/blog7activity\/([^\/.]+)\.js(.*)/,
    responder:localServer + '?product=activity/dev&pageid=$1'
  },
  {
    pattern:/http:\/\/s(img|js)\.sinajs\.cn\/blog7photo\/([^\.]+)\.js(.*)/,
    responder:localServer + '?product=photo/dev&pageid=$2'
  },
  {
    pattern:/http:\/\/s(img|js)\.sinajs\.cn\/blog7\/([^\.]+)\.js(.*)/,
    responder:localServer + '?product=main/dev&pageid=$2'
  },
  {
    pattern:/http:\/\/sjs\.sinajs\.cn\/blog7common\/([^\.]+)\.js(.*)/,
    responder:local + '/common/dev/$1.js'
  }
]

```

该配置是给nproxy配置的配置文件。
