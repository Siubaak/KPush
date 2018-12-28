module.exports = async function log(ctx, next) {
  const start = Date.now()
  await next()
  ctx.log.i(`${ctx.request.method} ${ctx.url} ${Date.now() - start}ms`)
}
