const LRU = require('lru-cache')

module.exports = new LRU({
  max: 100,
  maxAge: 30 * 60 * 1000 // 半小时缓存
})