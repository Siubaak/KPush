const router = require('koa-router')()
const controller = require('./controller')

router.use(controller.error)
router.get('/', controller.home)
router.get('/s', controller.search)
router.get('/p', controller.push)

module.exports = router.routes()