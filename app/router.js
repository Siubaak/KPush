const router = require('koa-router')()
const logMiddle = require('./middlewares/log')
const errorMiddle = require('./middlewares/error')
const homeCrtller = require('./controllers/home')
const searchCrtller = require('./controllers/search')

router.use(logMiddle)
router.use(errorMiddle)

router.get('/search', searchCrtller.get)

router.get('/api/push', searchCrtller.push)

router.get('*', homeCrtller.get)

module.exports = router.routes()