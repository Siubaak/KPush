const model = require('./model')
const mail = require('./mail')

module.exports = {
  async home (ctx) {
    ctx.body = 'hi'
  },
  async search (ctx) {
    const list = await model.list(ctx.query)
    ctx.body = 'application/json'
    ctx.body = list
  },
  async push (ctx) {
    const path = await model.path(ctx.query)
    const err = mail(path)
    if (err) {return ctx.body = err}
    ctx.body = path
  }
}