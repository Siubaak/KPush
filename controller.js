const fs = require('fs')
const ejs = require('ejs')
const model = require('./model')
const push = require('./push')
const errorView = fs.readFileSync('views/error.html')
const homeView = fs.readFileSync('views/home.html')
const pushView = fs.readFileSync('views/push.ejs', { encoding: 'utf-8' })
const searchView = fs.readFileSync('views/search.ejs', { encoding: 'utf-8' })

module.exports = {
  async error (ctx, next) {
    try { await next() } catch (err) {
      console.log(err)
      ctx.type = 'text/html'
      ctx.body = errorView
    }
  },
  async home (ctx) {
    ctx.type = 'text/html'
    ctx.body = homeView
  },
  async search (ctx) {
    const list = await model.getList(ctx.query.q)
    ctx.body = ejs.render(searchView, { query: ctx.query.q, list })
  },
  async push (ctx) {
    const url = await model.getUrl(ctx.query.i)
    const err = await push(url)
    ctx.body = ejs.render(pushView, { err })
  }
}