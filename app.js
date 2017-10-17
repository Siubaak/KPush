const Koa = require('koa')
const app = new Koa()
const router = require('./router')

app.use(router)

if (module.parent) module.exports = app
else {
  const config = require('./config')
  app.listen(config.port)
}