const Koa = require('koa')
const path = require('path')
const router = require('./router')
const static = require('koa-static')
const parser = require('koa-bodyparser')
const Logger = require('./services/logger')

const app = new Koa()

app.context.log = new Logger()

app.use(static(path.resolve(__dirname, '../dist')))
app.use(parser())
app.use(router)

if (module.parent) {
  module.exports = app
} else {
  if (process.env.APP_ENV === 'dev') {
    const cors = require('koa2-cors')
    app.use(cors({ origin: 'http://localhost:8080' }))
  }
  app.listen(8081, () => app.context.log.w(`Dev server is listening at http://localhost:8081`))
}