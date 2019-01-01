const cache = require('../services/cache')
const render = require('../services/render')

module.exports = {
  async get(ctx) {
    let html = cache.get(ctx.url)
    if (!html) {
      html = await render({
        title: 'KPush',
        url: ctx.url
      })
      cache.set(ctx.url, html)
    }
    ctx.body = html
  }
}
