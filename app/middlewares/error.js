module.exports = async function error(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.log.e(err.toString())
  }
}
