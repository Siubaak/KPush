const model = require('./model')
const mail = require('./mail')
const fs = require('fs')
const ejs = require('ejs')
const homeView = fs.readFileSync('views/home.html')
const searchView = fs.readFileSync('views/search.ejs', { encoding: 'utf-8'})
const pushView = fs.readFileSync('views/push.html')

module.exports = {
  async home (ctx) {
    ctx.type = 'text/html'
    ctx.body = homeView
  },
  async search (ctx) {
    const list = await model.list(ctx.query)
    ctx.type = 'text/html'
    ctx.body = ejs.render(searchView, { list })
  },
  async push (ctx) {
    const path = await model.path(ctx.query)
    const err = mail(path)
    if (err) {
      
      ctx.body = err
    }
    ctx.body = 'application/json'
    ctx.body = { path }
  }
}