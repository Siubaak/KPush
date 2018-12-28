const model = require('../models')
const render = require('../services/render')

module.exports = {
  async get(ctx) {
    const list = await model.getList(ctx.query.query)
    const html = await render({ title: 'KPush - 搜索结果' })
    ctx.body = html
  },
  async push(ctx) {
    const url = await model.getUrl(ctx.query.i)
    const err = await push(url)
    ctx.body = err
  }
}
