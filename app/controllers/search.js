const model = require('../models')
const push = require('../services/push')
const cache = require('../services/cache')
const render = require('../services/render')

module.exports = {
  async get(ctx) {
    let html = cache.get(ctx.url)
    if (!html) {
      html = await render({
        title: 'KPush - 搜索结果',
        url: ctx.url
      })
      cache.set(ctx.url, html)
    }
    ctx.body = html
  },
  async search(ctx) {
    let data = cache.get(ctx.url)
    if (!data) {
      data = await model.getList(ctx.query.query)
      cache.set(ctx.url, data)
    }
    ctx.body = data
  },
  async push(ctx) {
    ctx.body = await push(ctx.request.body.url)
  }
}
