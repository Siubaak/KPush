const Koa = require('koa')
const app = new Koa()
const router = require('./router')

app.use(router).listen(7001)