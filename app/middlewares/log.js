module.exports = async function error(ctx, next) {
  console.log('start')
  await next()
  console.log('end')
}
