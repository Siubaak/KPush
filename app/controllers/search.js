const model = require('../models')
const render = require('../services/render')
const cache = require('../services/cache')

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
    ctx.body = await model.getList(ctx.query.query)
  },
  async urls(ctx) {
    ctx.body = await model.getUrls(ctx.query.id)
  },
  async push(ctx) {
    ctx.body = await push(ctx.query.url)
  }
}
