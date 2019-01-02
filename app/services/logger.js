const LEVEL = {
  DBG: 0,
  INF: 1,
  WRN: 2,
  ERR: 3
}
const COLOR = {
  DBG: '\x1b[35m',
  INF: '\x1b[37m',
  WRN: '\x1b[33m',
  ERR: '\x1b[31m',
  RST: '\x1b[0m'
}

class Logger {
  constructor (level) {
    this.level = typeof level === 'number' ? level : 1
  }
  formatLog(type, msg) {
    if (this.level > LEVEL[type]) return
    const now = new Date()
    console.log(`${COLOR[type]}${now.toLocaleDateString()} ${now.toLocaleTimeString()} [${type}] ${msg}${COLOR.RST}`)
  }
  d(msg) { this.formatLog('DBG', msg) }
  i(msg) { this.formatLog('INF', msg) }
  w(msg) { this.formatLog('WRN', msg) }
  e(msg) { this.formatLog('ERR', msg) }
}

module.exports = Logger