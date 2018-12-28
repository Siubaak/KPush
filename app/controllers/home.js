const render = require('../services/render')

module.exports = {
  async get(ctx) {
    const html = await render({
      title: 'KPush',
      url: ctx.url
    })
    ctx.body = html
  }
}
