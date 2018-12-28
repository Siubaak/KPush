const render = require('../services/render')

module.exports = {
  async get(ctx) {
    const html = await render({ title: 'KPush' })
    ctx.body = html
  }
}
