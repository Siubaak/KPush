const Koa = require('koa')
const path = require('path')
const router = require('./router')
const static = require('koa-static')
const Logger = require('./services/logger')

const app = new Koa()

app.context.log = new Logger()

app.use(static(path.resolve(__dirname, '../dist')))
app.use(router)

if (module.parent) {
  module.exports = app
} else {
  const config = require('../config')
  app.listen(config.port, () => app.context.log.i(`KPush server is listening at ${config.port}`))
}