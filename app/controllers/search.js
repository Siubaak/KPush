const render = require('../services/render')

module.exports = {
  async get(ctx) {
    const html = await render({
      title: 'KPush - 搜索结果',
      query: '三体'
    })
    ctx.body = html
  },
  async push(ctx) {
    const url = await model.getUrl(ctx.query.i)
    const err = await push(url)
    ctx.body = err
  }
}
