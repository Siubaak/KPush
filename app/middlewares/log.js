module.exports = async function log(ctx, next) {
  const start = Date.now()
  await next()
  const reqLog = `${ctx.method} ${ctx.status} ${ctx.url} ${Date.now() - start}ms`
  if (ctx.status < 300) {
    ctx.log.i(reqLog)
  } else if (ctx.status >= 300 && ctx.status < 400) {
    ctx.log.w(reqLog)
  } else {
    ctx.log.e(reqLog)
  }
}
