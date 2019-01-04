const router = require('koa-router')()
const logMiddle = require('./middlewares/log')
const errorMiddle = require('./middlewares/error')
const homeCrtller = require('./controllers/home')
const searchCrtller = require('./controllers/search')

router.use(logMiddle)
router.use(errorMiddle)

router.get('/', homeCrtller.get)
router.get('/search', searchCrtller.get)

router.get('/api/search', searchCrtller.search)
router.post('/api/push', searchCrtller.push)

module.exports = router.routes()