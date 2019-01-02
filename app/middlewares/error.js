module.exports = async function error(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = 500
    ctx.log.e(err.toString())
  }
}
