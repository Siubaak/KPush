module.exports = async function error(ctx, next) {
  try {
    await next()
  } catch (err) {
    console.log(err)
  }
}
